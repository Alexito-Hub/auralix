import { format } from "util";
import syntaxErr from "syntax-error";
import * as Baileys from "baileys"

export default {
    name: "Eval",
    description: "Evaluate command test code",
    command: /^[_]/i,
    exec: async (m: any, { sock, db, r }: { sock: any, db: any, r: any }) => {
        let _syntax = ""
        let _return;
        
        const context = {
            ...Baileys,
            proto: Baileys.proto,
            generateWAMessageFromContent: Baileys.generateWAMessageFromContent,
            generateWAMessage: Baileys.generateWAMessage,
            prepareWAMessageMedia: Baileys.prepareWAMessageMedia,
            uploadToWASignal: Baileys.uploadToWASignal,
            WAProto: Baileys.proto,
            
            sock,
            m,
            db,
            request: r,
            r,
            
            console,
            JSON,
            Math,
            Date,
            Object,
            Array,
            String,
            Number,
            Boolean,
            Promise,
            Error,
            RegExp,
            Map,
            Set,
            setTimeout,
            clearTimeout,
            setInterval,
            clearInterval,
            
            format,
            inspect: (obj: any) => require("util").inspect(obj, { depth: null, colors: true }),
            require
        }
        
        // Filter out reserved JS keywords that can't be used as parameter names in new Function()
        const reservedWords = new Set(['default'])
        
        const filteredContext = Object.fromEntries(
            Object.entries(context).filter(([key]) => !reservedWords.has(key))
        )

        const keys = Object.keys(filteredContext)
        const values = Object.values(filteredContext)

        const code = m.body.slice(1)

        // Check if code contains block syntax or is multi-line
        const isBlock = /await|return|=>|{|}|const |let |var |for |if |while |switch |try |catch |finally |import |export /i.test(code)
            || code.includes('\n')

        let _text = isBlock
            ? `(async () => { ${code} })()`
            : `return ${code}`

        try {
            const fn = new Function(...keys, _text)
            _return = fn(...values)

            if (_return instanceof Promise) {
                _return = await _return
            }
        } catch (e) {
            let err = await syntaxErr(_text, "Sistema De Ejecución")
            if (err) _syntax = err + "\n\n"
            _return = e instanceof Error ? e.message : e
        } finally {
            await sock.sendMessage(m.from, { text: _syntax + format(_return) })
        }
    }
}