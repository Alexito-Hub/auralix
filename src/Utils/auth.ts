import inquirer from "inquirer"
import chalk from "chalk"
import QRCode from "qrcode"
import fs from "fs"
import path from "path"
import type { WASocket } from "@whiskeysockets/baileys"

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

export default new class {
    private timer: NodeJS.Timeout | null = null

    private clearAuth = () => {
        try {
            fs.writeFileSync(AUTH_PATH, "");
            ["", "-shm", "-wal"].forEach(s => fs.unlinkSync(AUTH_PATH + s))
        } catch {
            console.log(chalk.yellow("Archivos de sesión ya eliminados."))
        }
    }

    private timeout = () => {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            console.log(chalk.red("Tiempo de autenticación expirado (2 min)"));
            this.clearAuth(); process.exit(1);
        }, AUTH_TIMEOUT)
    }

    async ws(sock: WASocket, qr: string) {
        this.timeout();
        try {
            const { country } = await inquirer.prompt([{
                type: "list", name: "country", message: chalk.cyan("Selecciona tu país:"),
                choices: countries.map(c => ({ name: `${c.name} (+${c.prefix})`, value: c }))
            }])

            const { method } = await inquirer.prompt([{
                type: "list", name: "method", message: chalk.cyan("Método de autenticación:"),
                choices: [{ name: "Código QR", value: "qr" }, { name: "Emparejamiento", value: "pairing" }]
            }])

            if (method === "pairing") {
                const { num } = await inquirer.prompt([{
                    type: "input", name: "num",
                    message: chalk.cyan(`Ingresa tu número (${country.digits} dígitos sin +${country.prefix}):`),
                    validate: (n: string) => /^\d+$/.test(n) && n.length === country.digits || `Debe tener ${country.digits} dígitos`
                }])
                
                const code = await sock.requestPairingCode(country.prefix + num)
                this.timer && clearTimeout(this.timer)
                console.log(chalk.green.bold(`Código de emparejamiento: ${code}`))
            } else {
                console.log(chalk.blue("Escanea este código QR:"))
                console.log(await QRCode.toString(qr, { type: "terminal", errorCorrectionLevel: "L" }))
            }
        } catch (e) {
            this.clearAuth()
            console.error(chalk.red("Error en autenticación:"), e)
            process.exit(1)
        }
    }
}()