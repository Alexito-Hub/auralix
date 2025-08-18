import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

interface Plugin {
    name: string;
    description: string;
    disable?: boolean;
    command?: string[] | RegExp;
    exec?: (m: any, ctx: { sock: any; db: any }) => Promise<any>
    start?: (m: any, ctx: { sock: any; db: any }) => Promise<any>
    path?: string;
}

export default new class Plugins {
    public plugins: Plugin[] = [];

    constructor(
        private folder = path.join(process.cwd(), 'src/Plugins'),
        private filter = (f: string) => /\.(js|ts)$/.test(f)
    ) { }

    async load(): Promise<void> {
        if (!fs.existsSync(this.folder)) fs.mkdirSync(this.folder, { recursive: true });
        await this.loadFromDir(this.folder);
    }

    private async loadFromDir(dir: string): Promise<void> {
        for (const file of fs.readdirSync(dir, { withFileTypes: true })) {
            const fullPath = path.join(dir, file.name);

            if (file.isDirectory()) await this.loadFromDir(fullPath);
            else if (file.isFile() && this.filter(file.name)) {
                try {
                    const { default: p } = await import(pathToFileURL(fullPath).href);
                    if (p?.name && (p?.exec || p?.start)) {
                        this.plugins.push({ disable: false, path: fullPath, ...p });
                    }
                } catch (e) {
                    console.error(`Error loading plugin ${file.name}:`, e);
                }
            }
        }
    }
}