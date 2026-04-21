import {
    AuthenticationCreds,
    BaileysEventMap,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} from "baileys";

import { Boom } from "@hapi/boom";
import pino from "pino";
import fs from "fs";

import plugins from "./Defaults/plugin";
import { Sms } from "./Defaults/normalize"
import { groupMetadata, Sock } from "./Defaults/core"
import { db } from "./Database/database"
import wconnect from "./Utils/auth";
import Request from "./Scraper/Request";
import sqlite from "./Defaults/sqlite";

const start = async (retries = 0): Promise<void> => {
    const DEFAULT_CACHE_NAME = "open"
    const session = new Map<string, ReturnType<typeof Sock>>()
    const logger = pino({ level: "silent" })
    const { state, saveCreds } = await sqlite.AuthState('socket', 'Auth/auth.db', logger)
    const { version } = await fetchLatestBaileysVersion()
    const auralix = Sock({
        logger,
        auth: {
            creds: state.creds as AuthenticationCreds,
            keys: makeCacheableSignalKeyStore(state.keys, logger)
        },
        cachedGroupMetadata: async (jid: string) => groupMetadata.get(jid),
        getMessage: async () => undefined,
        version
    })

    await plugins.load()
    db.read()

    auralix.ev.process(async (ev: Partial<BaileysEventMap>) => {
        if (!ev) return
        if (ev['creds.update']) await saveCreds()

        if (ev["connection.update"]) {
            const { qr, connection, lastDisconnect } = ev["connection.update"]

            if (qr && !auralix.authState.creds.registered) {
                await wconnect.ws(auralix, qr)
            }

            switch (connection) {
                case 'open':
                    retries = 0
                    console.log('[ + ] Conexión abierta')
                    return
                case 'close': {
                    const reason = new Boom(lastDisconnect?.error).output.statusCode
                    let text: string
                    switch (reason) {
                        case DisconnectReason.connectionLost:
                        case DisconnectReason.forbidden:
                        case DisconnectReason.badSession:
                        case DisconnectReason.timedOut:
                        case DisconnectReason.unavailableService:
                        case DisconnectReason.connectionClosed:
                        case DisconnectReason.connectionReplaced:
                            if (retries <= 5) {
                                retries++
                                const delay = Math.min(retries * 3000, 15000)
                                console.log(`[ ~ ] Reconectando en ${delay / 1000}s... (intento ${retries}/5, razón: ${reason})`)
                                await new Promise(resolve => setTimeout(resolve, delay))
                                await start(retries)
                            } else {
                                text = `[ ! ] Máximo de reintentos alcanzado: ${reason}`
                                console.log(text)
                                session.delete(DEFAULT_CACHE_NAME)
                                process.exit(1)
                            }
                            break
                        case DisconnectReason.restartRequired:
                            console.log('[ ~ ] Reinicio requerido, reconectando...')
                            await start(0)
                            break
                        case DisconnectReason.loggedOut:
                            fs.rmSync('Auth', { recursive: true, force: true })
                            text = `[ ! ] Sesión cerrada (${reason}). Auth limpiado, vuelve a vincular.`
                            console.log(text)
                            session.delete(DEFAULT_CACHE_NAME)
                            process.exit(1)
                            break
                        default:
                            if (retries <= 5) {
                                retries++
                                console.log(`[ ~ ] Desconexión inesperada (${reason}), reconectando... (${retries}/5)`)
                                await new Promise(resolve => setTimeout(resolve, 5000))
                                await start(retries)
                            } else {
                                text = `[ ! ] connection closed: ${reason}`
                                console.log(text)
                                session.delete(DEFAULT_CACHE_NAME)
                                process.exit(1)
                            }
                            break
                    }
                    break
                }
            }
        }

        if (ev["messages.upsert"]) {
            for (const message of ev["messages.upsert"].messages) {
                if (ev["messages.upsert"].type !== "notify" || !message.message) continue
                db.saveMessage(message)

                const m = await Sms(auralix, message)
                if (!m) continue

                const args = {
                    sock: auralix,
                    db,
                    r: Request
                }

                for (const plugin of plugins.plugins) {
                    if (plugin.disable) continue

                    let valid = false
                    if (plugin.command) {
                        if (Array.isArray(plugin.command)) {
                            valid = typeof m.command === "string" && plugin.command.includes(m.command)
                        } else {
                            plugin.command.lastIndex = 0
                            valid = plugin.command.test(m.body || "")
                        }
                    }

                    if (valid && typeof plugin.exec === 'function') {
                        await plugin.exec(m, args).catch(async (err: Error) => {
                            console.error(`Error al ejecutar plugin ${plugin.name}:`, err);
                            await m.reply(`Error en el comando: ${err.message || 'Error desconocido'}`);
                        })
                    }

                    if (plugin.start && typeof plugin.start === 'function' && !valid) {
                        if (m.isGroup) continue
                        await plugin.start(m, args).catch((err: Error) => {
                            console.error(`Error en start del plugin ${plugin.name}:`, err)
                        })
                    }
                }
            }
        }
    })
}
start().catch(console.error)