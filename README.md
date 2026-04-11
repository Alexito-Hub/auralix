# Auralix Bot

Bot de WhatsApp construido con Baileys, TypeScript y SQLite.

## Características

- Autenticación por QR o código de emparejamiento
- Sistema de plugins para comandos
- Base de datos SQLite con Protocol Buffers
- Anti-eliminación de mensajes
- Sistema de niveles/XP
- Rate limiting integrado
- Gestión de grupos

## Instalación

```bash
npm install
cp .env.example .env
# Edita .env con tus valores
```

## Uso

```bash
npm run dev      # Desarrollo
npm run build    # Compilar
npm start        # Producción
```

## Configurar (.env)

```env
OWNER_NUMBER=51945879945
BOT_NAME=Auralix
PREFIX=@
LOG_LEVEL=warn
```

## Crear Plugins

```typescript
// src/Plugins/miPlugin.ts
export default {
    name: "MiPlugin",
    description: "Descripción",
    command: ["cmd"],
    exec: async (m, { sock, db, r }) => {
        await m.reply("Hola!")
    }
}
```

## Estructura

```
src/
├── Config.ts          # Configuración
├── index.ts           # Entry point
├── Database/          # SQLite + Proto
├── Defaults/          # Core, plugins, normalize
├── Plugins/           # Comandos
├── Scraper/           # HTTP requests
├── Types/             # Tipos TS
└── Utils/             # Auth, logger, rate limiter
```

## Mejoras incluidas

- Variables de entorno para configuración sensible
- Manejo de errores en operaciones críticas
- Types para reducir `any`
- Cleanup automático de caché de grupos
- Rate limiting (5 cmds/10s por usuario)
- Logger configurables
