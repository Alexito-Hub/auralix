import { hardClean, softClean } from "../../Utils/sessionCleaner";
import { pino } from "pino";

const logger = pino({ level: 'info' });

export default {
    name: "Clean Session",
    description: "Limpia la sesion de forma segura (soft o hard)",
    command: /^(cleansession|clean)$/i,
    exec: async (m: any, { sock, db, r }: { sock: any, db: any, r: any, args: string[] }) => {
        const mode = m.args[0]?.toLowerCase();

        if (!mode || !['soft', 'hard'].includes(mode)) {
            return m.reply(
                `*Uso:* _clean <soft|hard>\n\n` +
                `*soft* - Elimina keys expiradas (errores de sync)\n` +
                `*hard* - Limpieza completa (requiere reconectar)`
            );
        }

        await m.reply(`Limpiando sesion (${mode} mode)...`);

        if (mode === 'soft') {
            await softClean(logger);
            await m.reply('*Soft clean* completada. Si persiste el error, usa *hard* mode.');
        } else {
            await hardClean(logger);
            await m.reply('*Hard clean* completada. Reinicia el bot para reconectar.');
            process.exit(0);
        }
    }
}
