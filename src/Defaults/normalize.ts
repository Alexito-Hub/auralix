import { jidNormalizedUser, proto, getContentType, extractMessageContent, normalizeMessageContent } from "@whiskeysockets/baileys";
import { AuralixSocket } from "./core";
import config from "../config"
import { db } from "../Database/database"

export async function Sms(sock: AuralixSocket, m: any): Promise<any> {
    if (!m) return

    const message = m as proto.IWebMessageInfo & { id?: string; from?: string; body?: string }

    if (m.key.remoteJid == "status@broadcast" || m.broadcast || !m.message) return
    if (m.key.id.startsWith("NZT")) return

    m.message = normalizeMessageContent(m.message)

    if (m.message?.senderKeyDistributionMessage) delete m.message.senderKeyDistributionMessage
    if (m.message?.messageContextInfo) delete m.message.messageContextInfo

    if (m.key) {
        m.id = m.key.id
        m.device = m.id.length > 28 ? 'android' : m.id.substring(0, 2) === '3A' ? 'ios' : m.id.startsWith("BAE5") ? 'baileys' : m.id.startsWith("3EB0") ? 'web' : 'desconocido';
        m.isBot = (m.id.startsWith("3EB0") && m.id.length == 12) || (m.id.startsWith("BAE5") && m.id.length == 16)
        m.from = m.key.remoteJid
        m.isMe = m.key.fromMe
        m.isGroup = m.from.endsWith("@g.us")
        m.isChat = m.from.endsWith("@s.whatsapp.net")
        m.sender = jidNormalizedUser(m.key.participant || m.key.remoteJid)
        m.number = m.sender.replace("@s.whatsapp.net", "")

        m.user = db.user(m.sender, m.pushName)
        if (m.isGroup) m.group = db.group(m.from)
    }

    if (m.message) {
        m.type = getContentType(m.message)
        m.msg = extractMessageContent(m.message)
        m.isViewOnce = m?.msg?.viewOnce ? m?.msg?.viewOnce : false
        m.isMedia = ["image", "sticker", "video", "audio"].some(i => m.type && i == m.type.replace("Message", ""))  
        m.prefix = m.group?.prefix || config.prefix[0]

        m.body = m.type === 'conversation' ? m.message.conversation : m.type === 'extendedTextMessage' ? m.message.extendedTextMessage?.text : m.type === 'imageMessage' ? m.message.imageMessage?.caption : m.type === 'videoMessage' ? m.message.videoMessage?.caption : m.type === 'documentMessage' ? m.message.documentMessage?.caption : m.type === 'templateButtonReplyMessage' ? m.message.templateButtonReplyMessage?.selectedId : m.type === 'buttonsResponseMessage' ? m.message.buttonsResponseMessage?.selectedButtonId : m.type === 'listResponseMessage' ? m.message.listResponseMessage?.singleSelectReply?.selectedRowId : ''

        m.cmd = typeof m.body === 'string' && (m.body.toLowerCase().startsWith(m.prefix.toLowerCase()) || config.prefix.some((i: string) => m.body.toLowerCase().startsWith(i.toLowerCase())))
        m.command = m.cmd ? m.body.slice(m.body.toLowerCase().startsWith(m.prefix.toLowerCase()) ? m.prefix.length : 1).trim().split(/\s+/).shift().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : false
        m.args = typeof m.body === 'string' ? m.body.trim().split(/\s+/).slice(m.cmd ? 1 : 0) : []
        m.text = Array.isArray(m.args) ? m.args.join(" ") : ""

        m.delete = () => sock.sendMessage(m.from, { delete: m.key })
        m.react = (emoji: string) => sock.sendMessage(m.from, { react: { text: emoji, key: m.key } })
        m.download = () => undefined

        m.quoted = false
    }

    m.reply = async (text: string, options: any = {}, quoted = m) => {
        const p = Math.random() > 0.5 ? 1 : 0

        return await sock.sendMessage(options.id ? options.id : m.from, {
            text: text,
            contextInfo: {
                mentionedJid: options.mentions ? options.mentions : [],
                externalAdReply: {
                    renderLargerThumbnail: options.render ? options.render : false,
                    showAdAttribution: options.adAttrib ? options.adAttrib : false,
                    body: options.body ? options.body : (config.bot.name + (typeof config.bot.version === "string" ? " - " + config.bot.version : "")),
                    mediaType: 1,
                    thumbnailUrl: options.img ? options.img : "https://files.catbox.moe/o1y3t5.png",
                    sourceUrl: (p == 1) ? "https://instagram.com/al.e.dev" : "https://www.github.com/al-e-dev"
                }
            }
        }, {
            quoted: options.quoted ? options.quoted : null,
            ephemeralExpiration: 20 * 60 * 100
        })
    }

    return message
}
