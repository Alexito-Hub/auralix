import {
    AuthenticationCreds,
    BaileysEventMap,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} from "baileys";

import { Boom } from "@hapi/boom";
import pino, { Logger } from "pino";

import plugins from "./Defaults/plugin";
import { Sms } from "./Defaults/normalize"
import { groups, Sock } from "./Defaults/core"
import SQLite from "./Defaults/sqlite"
import { db } from "./Database/database"
import wconnect from "./Utils/auth";
import Request from "./Scraper/Request";
import config from "./config";
import { checkLimit } from "./Utils/rateLimiter";
import { hardClean, softClean } from "./Utils/sessionCleaner";

const start = async (): Promise<void> => {
    const DEFAULT_CACHE_NAME = "open"
    let retries = 0
    const session = new Map<string, ReturnType<typeof Sock>>()
    const logger: Logger = pino({ level: config.log.level || "warn" })
    let { state, saveCreds } = await SQLite.AuthState('socket', 'Auth/auth.db', logger)

    let { version } = await fetchLatestBaileysVersion()
    let auralix = Sock({
        auth: { creds: state.creds as AuthenticationCreds, keys: makeCacheableSignalKeyStore(state.keys, logger) },
        cachedGroupMetadata: async (jid: string) => groups.get(jid),
        logger: logger,
        version: version
    })
    await plugins.load()
    db.read()

    setInterval(() => {
        try {
            db.write()
        } catch (e) {
            logger.error(e, 'Error writing to database')
        }
    }, 30000)

    auralix?.ev.process(async (ev: Partial<BaileysEventMap>) => {
        if (!ev) return
        if (ev['creds.update']) await saveCreds()
        if (ev["connection.update"]) {
            const up = ev["connection.update"];
            const { qr, connection, lastDisconnect } = up

            if (qr && !auralix.authState.creds.registered) {
                try {
                    await wconnect.ws(auralix, qr)
                } catch (e) {
                    logger.error(e, 'Error during QR/pairing authentication')
                }
            }

            switch (connection) {
                case 'open':
                    logger.info('[ + ] Conexión abierta')
                    retries = 0
                    return
                case 'close': {
                    const reason = new Boom(lastDisconnect?.error).output.statusCode
                    const shouldReconnect = [
                        DisconnectReason.connectionLost,
                        DisconnectReason.forbidden,
                        DisconnectReason.badSession,
                        DisconnectReason.timedOut,
                        DisconnectReason.unavailableService,
                        DisconnectReason.connectionClosed
                    ].includes(reason)

                    if (shouldReconnect && retries < 3) {
                        retries++
                        logger.warn(`[ ! ] Reconectando (${retries}/3)... Código: ${reason}`)
                        // Prune session corrupt keys before reconnect
                        if (reason === DisconnectReason.badSession || reason === DisconnectReason.timedOut) {
                            await softClean(logger)
                        }
                        await new Promise(resolve => setTimeout(resolve, 5000))
                        await start()
                    } else if (reason === DisconnectReason.restartRequired) {
                        logger.info('[ ! ] Reinicio requerido')
                        await start()
                    } else {
                        logger.error(`[ ! ] Conexión cerrada: ${reason}`)
                        session.delete(DEFAULT_CACHE_NAME)
                        if (!shouldReconnect) process.exit(1)
                    }
                    break
                }
            }
        }
        if (ev["messages.upsert"]) {
            for (const message of ev["messages.upsert"].messages) {
                if (ev["messages.upsert"].type === "notify" && message.message) {
                    try {
                        db.saveMessage(message)
                    } catch (e) {
                        logger.error(e, 'Error saving message')
                    }

                    const m = await Sms(auralix, message)

                    if (m.type === 'protocolMessage' && m.msg.type === 0) {
                        try {
                            const key = m.msg.key
                            const oldMsg = db.getMessage(key.id)
                            if (oldMsg) {
                                await auralix.sendMessage(m.from, { text: `[ ANTI-DELETE ]\nDe: @${key.participant.split('@')[0]}\n\nMensaje borrado:\n${JSON.stringify(oldMsg, null, 2)}`, mentions: [key.participant] })
                            }
                        } catch (e) {
                            logger.error(e, 'Error handling anti-delete')
                        }
                    }

                    if (m.user && !m.isBot) {
                        try {
                            m.user.xp += Math.floor(Math.random() * 10)
                            m.user.coins += 5
                            if (m.user.xp >= m.user.level * 100) {
                                m.user.level += 1
                                m.user.xp = 0
                                await m.reply(`¡Felicidades @${m.sender.split('@')[0]}! Has subido al nivel ${m.user.level}`, { mentions: [m.sender] })
                            }
                        } catch (e) {
                            logger.error(e, 'Error updating user XP')
                        }
                    }

                    let args = {
                        sock: auralix,
                        db,
                        r: Request
                    }

                    // Rate limiting: max 5 cmds por 10s
                    if (m.command && !checkLimit(m.sender, 5, 10000)) {
                        logger.warn(`[RATE LIMIT] ${m.sender} excedió límite`)
                        continue
                    }

                    for (const plugin of plugins.plugins) {
                        if (plugin.disable) continue

                        const valid = plugin.command && (Array.isArray(plugin.command) ? plugin.command.includes(m.command) : plugin.command instanceof RegExp ? plugin.command.test(m.body || '') : false)

                        if (valid && typeof plugin.exec === 'function') {
                            await plugin.exec(m, args).catch(async (err: Error) => {
                                logger.error(`Error al ejecutar plugin ${plugin.name}:`, err)
                                await m.reply(`Error en el comando: ${err.message || 'Error desconocido'}`).catch(() => {})
                            })
                        }
                        if (plugin.start && typeof plugin.start === 'function' && !valid) {
                            if (m.isGroup) continue
                            await plugin.start(m, args).catch(async (err: Error) => {
                                logger.error(`Error en plugin.start ${plugin.name}:`, err)
                            })
                        }
                    }
                }
            }
        }
    })
}
start().catch(console.error)