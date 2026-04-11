// Rate limiter simple
const hits = new Map<string, number[]>()

export function checkLimit(id: string, max = 5, window = 10000): boolean {
    const now = Date.now()
    const userHits = hits.get(id) || []
    const valid = userHits.filter(t => now - t < window)

    if (valid.length >= max) return false

    valid.push(now)
    hits.set(id, valid)
    return true
}

// Limpiar old entries cada minuto
setInterval(() => {
    const now = Date.now()
    for (const [id, timestamps] of hits.entries()) {
        const valid = timestamps.filter(t => now - t < 60000)
        if (valid.length === 0) hits.delete(id)
        else hits.set(id, valid)
    }
}, 60000)
