import bcrypt from "bcryptjs";
import BlackServerX from "../../Scraper/BlackServerX";

export default {
    name: "Login",
    description: "Login to the system",
    start: async (m: any, { sock, db }: { sock: any, db: any }) => {
        const text = m.text.trim()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (db.data.users?.[m.sender]?.email && db.data.users?.[m.sender]?.passwordHash) return

        if (emailRegex.test(text)) {
            db.temp = db.temp || {}
            db.temp[m.sender] = {
                email: text,
                attempts: 3,
                timestamp: Date.now()
            };
            await sock.sendMessage(m.from, { text: "email recibido. ahora envía tu contraseña." });
            return
        }

        if (db.temp?.[m.sender]?.email) {
            if (db.data.users?.[m.sender]?.email && db.data.users?.[m.sender]?.passwordHash) {
                delete db.temp[m.sender]
                await sock.sendMessage(m.from, { text: "Ya tienes una cuenta." })
                return
            }

            const { email, attempts } = db.temp[m.sender]
            const password = text

            if (Date.now() - db.temp[m.sender].timestamp > 300000) {
                delete db.temp[m.sender]
                await sock.sendMessage(m.from, { text: "Sesión expirada." })
                return
            }

            try {
                BlackServerX["email"] = email
                BlackServerX["password"] = password

                await BlackServerX.initialize();
                const { login } = await BlackServerX.login();

                if (!login) {
                    db.temp[m.sender].attempts--;

                    if (db.temp[m.sender].attempts > 0) {
                        await sock.sendMessage(m.from, {
                            text: `te quedan ${db.temp[m.sender].attempts} intentos.`
                        })
                        return
                    }

                    delete db.temp[m.sender];
                    await sock.sendMessage(m.from, { text: "maximo de intentos alcanzado." })
                    return
                }

                const passwordHash = await bcrypt.hash(password, 10)
                db.data.users[m.sender] = {
                    email,
                    passwordHash,
                    banned: false,
                    name: m.pushName,
                    age: 0,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                }
                await db.write()

                await sock.sendMessage(m.from, { text: `Bienvenido.` })

            } catch (error) {
                console.error("Login error:", error)
                db.temp[m.sender].attempts--

                if (db.temp[m.sender].attempts > 0) {
                    await sock.sendMessage(m.from, {
                        text: `te quedan ${db.temp[m.sender].attempts} intentos.`
                    })
                } else {
                    delete db.temp[m.sender];
                    await sock.sendMessage(m.from, { text: "inicia nuevamente." })
                }
                return
            }

            delete db.temp[m.sender]
            return
        }

        await sock.sendMessage(m.from, { text: "envía tu email primero." })
    }
}