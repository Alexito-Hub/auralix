import {
    AuthenticationCreds,
    BaileysEventMap,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} from "@whiskeysockets/baileys";

import { Boom } from "@hapi/boom";
import pino, { Logger } from "pino";

import plugins from "./Defaults/plugin";
import { Sms } from "./Defaults/normalize"
import { groupMetadata, WASocket } from "./Defaults/core"
import SQLite from "./Defaults/sqlite"
import { db } from "./Database/database"
import wconnect from "./Utils/auth";
import Request from "./Scraper/Request";

const start = async (): Promise<void> => {
    const DEFAULT_CACHE_NAME = "open"
    let retries = 0
    const session = new Map<string, ReturnType<typeof WASocket>>()
    const logger: Logger = pino({ level: "silent" })
    let { state, saveCreds } = await SQLite.AuthState('socket', 'Auth/auth.db', logger)

    let { version } = await fetchLatestBaileysVersion()
    let auralix = WASocket({
        auth: { creds: state.creds as AuthenticationCreds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'debug' })) },
        cachedGroupMetadata: async (jid: string) => groupMetadata.get(jid),
        logger: logger,
        version: version
    })

    await plugins.load()
    await db.read()
    auralix?.ev.process(async (ev: Partial<BaileysEventMap>) => {
        if (!ev) return
        if (ev['creds.update']) await saveCreds()
        if (ev["connection.update"]) {
            const up = ev["connection.update"];
            const { qr, connection, lastDisconnect } = up

            if (qr && !auralix.authState.creds.registered) {
                await wconnect.ws(auralix, qr)
            }

            switch (connection) {
                case 'open':
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
                            if (retries <= 3) {
                                retries++
                                await new Promise(resolve => setTimeout(resolve, 5000))
                                await start()
                            } else {
                                text = `[ ! ] connection closed: ${reason}`
                                console.log(text)
                                session.delete(DEFAULT_CACHE_NAME)
                                process.exit(1)
                            }
                            break
                        case DisconnectReason.connectionClosed:
                        case DisconnectReason.connectionReplaced:
                            text = `[ ! ] connection closed: ${reason}`
                            console.log(text)
                            session.delete(DEFAULT_CACHE_NAME)
                            break
                        case DisconnectReason.restartRequired:
                            await start()
                            break
                        default:
                            text = `[ ! ] connection closed: ${reason}`
                            console.log(text)
                            session.delete(DEFAULT_CACHE_NAME)
                            break
                    }
                    break
                }
            }
        }
        if (ev["messages.upsert"]) {
            for (const message of ev["messages.upsert"].messages) {
                if (ev["messages.upsert"].type === "notify" && message.message) {
                    const m = await Sms(auralix, message)

                    let args = {
                        sock: auralix,
                        db,
                        r: Request
                    }

                    for (const plugin of plugins.plugins) {
                        if (plugin.disable) continue
                        
                        const valid = plugin.command && (Array.isArray(plugin.command) ? plugin.command.includes(m.command) : plugin.command instanceof RegExp ? plugin.command.test(m.body || '') : false)
                        
                        if (valid && typeof plugin.exec === 'function') {
                            await plugin.exec(m, args).catch(async (err: Error) => {
                                console.error(`Error al ejecutar plugin ${plugin.name}:`, err);
                                await m.reply(`Error en el comando: ${err.message || 'Error desconocido'}`);
                            })
                        }
                        if (plugin.start && typeof plugin.start === 'function' && !valid) {
                            if (m.isGroup) continue
                            await plugin.start(m, args)
                        }
                    }
                }
            }
        }
    })
}
start().catch(console.error)