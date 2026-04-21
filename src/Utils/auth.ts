import chalk from "chalk"
import QRCode from "qrcode"
import fs from "fs"
import path from "path"
import readline from "readline"
import type { WASocket } from "baileys"

const AUTH_TIMEOUT = 180000
const AUTH_PATH = path.join(process.cwd(), "Auth/auth.db")

const countries = [
    { code: "PE", name: "Perú", prefix: "51", digits: 9 },
    { code: "MX", name: "México", prefix: "52", digits: 10 },
    { code: "AR", name: "Argentina", prefix: "54", digits: 10 },
    { code: "CO", name: "Colombia", prefix: "57", digits: 10 },
    { code: "CL", name: "Chile", prefix: "56", digits: 9 },
    { code: "EC", name: "Ecuador", prefix: "593", digits: 9 },
    { code: "US", name: "EE.UU", prefix: "1", digits: 10 },
    { code: "ES", name: "España", prefix: "34", digits: 9 }
]

function ask(rl: readline.Interface, question: string): Promise<string> {
    return new Promise(resolve => rl.question(question, resolve))
}

export default new class {
    private timer: NodeJS.Timeout | null = null

    public clear = () => {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }

    private clearAuth = () => {
        const files = ["", "-shm", "-wal"].map((s) => AUTH_PATH + s)

        for (const file of files) {
            try {
                if (fs.existsSync(file)) fs.rmSync(file, { force: true })
            } catch {
                console.log(chalk.yellow(`No se pudo eliminar: ${file}`))
            }
        }
    }

    private timeout = () => {
        this.clear();
        this.timer = setTimeout(() => {
            console.log(chalk.red(`Tiempo de autenticación expirado (${Math.floor(AUTH_TIMEOUT / 60000)} min)`));
            this.clearAuth(); process.exit(1);
        }, AUTH_TIMEOUT)
    }

    async ws(sock: WASocket, qr: string) {
        this.timeout();

        const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

        try {
            console.log(chalk.cyan("\nSelecciona tu país:"))
            countries.forEach((c, i) => {
                console.log(chalk.white(`  ${i + 1}. ${c.name} (+${c.prefix})`))
            })

            let country = countries[0]
            while (true) {
                const pick = await ask(rl, chalk.cyan(`\nOpción [1-${countries.length}]: `))
                const idx = parseInt(pick) - 1
                if (idx >= 0 && idx < countries.length) {
                    country = countries[idx]
                    break
                }
                console.log(chalk.red("Opción inválida, intenta de nuevo."))
            }

            console.log(chalk.cyan("\nMétodo de autenticación:"))
            console.log(chalk.white("  1. Código QR"))
            console.log(chalk.white("  2. Emparejamiento"))

            const methodPick = await ask(rl, chalk.cyan("\nOpción [1-2]: "))
            const method = methodPick.trim() === "2" ? "pairing" : "qr"

            if (method === "pairing") {
                let num = ""
                while (true) {
                    num = await ask(rl, chalk.cyan(`Ingresa tu número (${country.digits} dígitos sin +${country.prefix}): `))
                    num = num.trim()
                    if (/^\d+$/.test(num) && num.length === country.digits) break
                    console.log(chalk.red(`Debe tener ${country.digits} dígitos numéricos.`))
                }

                const code = await sock.requestPairingCode(country.prefix + num)
                this.clear()
                console.log(chalk.green.bold(`\nCódigo de emparejamiento: ${code}`))
            } else {
                console.log(chalk.blue("\nEscanea este código QR:"))
                console.log(await QRCode.toString(qr, { type: "terminal", errorCorrectionLevel: "L" }))
            }
        } catch (e) {
            this.clearAuth()
            console.error(chalk.red("Error en autenticación:"), e)
            process.exit(1)
        } finally {
            rl.close()
        }
    }
}()