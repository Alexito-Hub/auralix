import { format } from "util";
import syntaxErr from "syntax-error";

export default {
    name: "Eval",
    description: "Evaluate command test code",
    command: /^[_]/i,
    exec: async (m: any, { sock, db, r }: { sock: any, db: any, r: Request }) => {
        let _syntax = ""
        let _return;
        let _text = /await|return/gi.test(m.body) ? `(async () => { ${m.body.slice(1)} })()` : `${m.body.slice(1)}`
        try {
            _return = await eval(_text)
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