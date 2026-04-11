const config = {
    owner: {
        number: process.env.OWNER_NUMBER || "51945879945"
    },
    bot: {
        name: process.env.BOT_NAME || "Auralix",
        author: process.env.BOT_AUTHOR || "Alexito",
        version: process.env.BOT_VERSION || "1.0.0-preview"
    },
    mods: (process.env.MODS || "").split(",").filter(Boolean),
    prefix: (process.env.PREFIX || "@").split(","),
    log: {
        level: process.env.LOG_LEVEL || "warn"
    }
}

export default config