import Database from 'better-sqlite3';
import * as Proto from '../../proto/database';
import fs from 'fs';
import path from 'path';

export class Db {
    public data: Proto.database.ICollection;
    private db: Database.Database;
    private q: Record<string, Database.Statement> = {};
    private c = 0;
    constructor(p: string) {
        const d = path.dirname(p);
        if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });

        this.db = new Database(p);
        this.db.exec(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS store (id INTEGER PRIMARY KEY, data BLOB);
            CREATE TABLE IF NOT EXISTS msgs (id TEXT PRIMARY KEY, jid TEXT, me INTEGER, part TEXT, json TEXT, ts INTEGER);
            CREATE INDEX IF NOT EXISTS idx_ts ON msgs (ts);
        `);

        this.q.s = this.db.prepare('INSERT OR REPLACE INTO msgs VALUES (?, ?, ?, ?, ?, ?)'); // s = save
        this.q.m = this.db.prepare('SELECT json FROM msgs WHERE id = ?'); // m = get msg
        this.q.p = this.db.prepare('DELETE FROM msgs WHERE id IN (SELECT id FROM msgs ORDER BY ts ASC LIMIT 100)'); // p = prune
        this.q.c = this.db.prepare('SELECT COUNT(*) as c FROM msgs'); // c = count
        this.q.w = this.db.prepare('INSERT OR REPLACE INTO store (id, data) VALUES (1, ?)'); // w = write storage
        this.q.r = this.db.prepare('SELECT data FROM store WHERE id = 1'); // r = read storage

        this.data = Proto.database.Collection.create({ users: {}, groups: {} });
        this.read();
    }

    public read() {
        const row = this.q.r.get() as { data: Buffer } | undefined;
        if (row) this.data = Proto.database.Collection.decode(row.data);
    }

    public write() {
        const buf = Proto.database.Collection.encode(this.data).finish();
        this.q.w.run(Buffer.from(buf));
    }

    public saveMessage(m: any) {
        try {
            this.q.s.run(m.key.id, m.key.remoteJid, m.key.fromMe ? 1 : 0, m.key.participant || '', JSON.stringify(m.message), m.messageTimestamp || Math.floor(Date.now() / 1000));
            if (++this.c >= 50) {
                this.c = 0;
                if ((this.q.c.get() as any).c > 1000) this.q.p.run();
            }
        } catch {}
    }

    public getMessage(id: string) {
        const row = this.q.m.get(id) as { json: string } | undefined;
        return row ? JSON.parse(row.json) : null;
    }

    public user(id: string, name = 'User') {
        if (!this.data.users) this.data.users = {};
        if (!this.data.users[id]) this.data.users[id] = { name, coins: 0, xp: 0, level: 1, warns: 0, createdAt: Date.now(), updatedAt: Date.now() };
        return this.data.users[id];
    }

    public group(id: string) {
        if (!this.data.groups) this.data.groups = {};
        if (!this.data.groups[id]) this.data.groups[id] = { prefix: '@', welcome: '', bye: '', mute: false, antilink: false, welcomeEnabled: false };
        return this.data.groups[id];
    }
}

export const db = new Db('./src/Database/database.db');
