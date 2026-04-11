import makeWASocket, { GroupMetadata, UserFacingSocketConfig } from "baileys"

export const groups = new Map<string, GroupMetadata>()

// Limpiar grupos antiguos cada 5 min (evita memory leaks)
setInterval(() => {
    if (groups.size > 100) {
        const toDelete = Array.from(groups.keys()).slice(0, Math.floor(groups.size * 0.3))
        toDelete.forEach(jid => groups.delete(jid))
    }
}, 5 * 60 * 1000)

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
