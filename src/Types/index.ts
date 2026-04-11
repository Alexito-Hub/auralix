import type { proto, WASocket } from "baileys"
import type { Db } from "../Database/database"
import type { AuralixSocket } from "../Defaults/core"
import type Request from "../Scraper/Request"

export interface User {
    name: string
    coins: number
    xp: number
    level: number
    warns: number
    createdAt: number
    updatedAt: number
}

export interface Group {
    prefix: string
    welcome: string
    bye: string
    mute: boolean
    antilink: boolean
    welcomeEnabled: boolean
}

export interface MsgCtx {
    id: string
    device: string
    isBot: boolean
    from: string
    isMe: boolean
    isGroup: boolean
    isChat: boolean
    sender: string
    number: string
    user: User
    group?: Group
    type: string
    msg: any
    isViewOnce: boolean
    isMedia: boolean
    prefix: string
    body: string
    cmd: boolean
    command: string | false
    args: string[]
    text: string
    key: proto.IMessageKey
    delete: () => Promise<void>
    react: (emoji: string) => Promise<void>
    download: () => Promise<any>
    quoted: false
    reply: (text: string, options?: any, quoted?: any) => Promise<any>
}

export interface PluginArgs {
    sock: AuralixSocket
    db: Db
    r: typeof Request
}

export interface Plugin {
    name: string
    description: string
    disable?: boolean
    command?: string[] | RegExp
    exec?: (m: MsgCtx, ctx: PluginArgs) => Promise<any>
    start?: (m: MsgCtx, ctx: PluginArgs) => Promise<any>
    path?: string
}
