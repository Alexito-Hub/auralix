import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { Logger } from 'pino';

const AUTH_DB = path.join(process.cwd(), 'Auth/auth.db');
const SESSION_ID = 'socket';

const DB_SCHEMA = `
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA temp_store = MEMORY;
    PRAGMA mmap_size = 268435456;
    PRAGMA cache_size = -64000;
    CREATE TABLE IF NOT EXISTS auth_state (
        session_id TEXT,
        data_key TEXT,
        data_value TEXT,
        PRIMARY KEY (session_id, data_key)
    ) WITHOUT ROWID;
    CREATE INDEX IF NOT EXISTS idx_session_key ON auth_state (session_id, data_key);
`;

/** Hard: elimina y recrea la DB */
export async function hardClean(logger: Logger): Promise<void> {
    logger.info('[SESSION] Hard clean iniciada...');

    try {
        try { new Database(AUTH_DB, { readonly: true }).close(); } catch {}

        ['', '-shm', '-wal'].forEach(ext => {
            const f = AUTH_DB + ext;
            if (fs.existsSync(f)) fs.unlinkSync(f);
        });

        const db = new Database(AUTH_DB);
        db.exec(DB_SCHEMA);
        db.close();

        if (global.gc) global.gc();

        logger.info('[SESSION] Hard clean completada. Reinicia el bot.');
    } catch (e) {
        logger.error(`[SESSION] Hard clean error: ${e}`);
    }
}

/** Soft: elimina keys de app-state-sync expiradas */
export async function softClean(logger: Logger): Promise<void> {
    try {
        const db = new Database(AUTH_DB);
        const { changes } = db.prepare(
            'DELETE FROM auth_state WHERE session_id = ? AND data_key LIKE ?'
        ).run(SESSION_ID, 'app-state-sync-%');
        db.close();
        
        if (changes > 0) logger.info(`[SESSION] ${changes} keys expiradas eliminadas`);
    } catch (e) {
        logger.error(`[SESSION] Soft clean error: ${e}`);
    }
}

