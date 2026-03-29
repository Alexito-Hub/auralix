import makeWASocket, { GroupMetadata, UserFacingSocketConfig } from "@whiskeysockets/baileys"

export const groups = new Map<string, GroupMetadata>()

export function Sock(config: UserFacingSocketConfig) {
    const sock = makeWASocket(config)

    return Object.assign(sock, {
        async fetchGroup(jid: string) {
            let m = groups.get(jid)
            if (!m) {
                m = await sock.groupMetadata(jid).catch(() => undefined)
                if (m) groups.set(jid, m)
            } else {
                sock.groupMetadata(jid).then(res => groups.set(jid, res)).catch(() => null)
            }
            return m
        },
    })
}

export type AuralixSocket = ReturnType<typeof Sock>
