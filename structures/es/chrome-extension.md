# Extensión de Chrome — Estructura del proyecto

> Para desarrolladores de extensiones de navegador que crean extensiones Chrome Manifest v3 con Plasmo + TypeScript + React, optimizando el ciclo completo desde la creación de scripts de contenido hasta la publicación en Chrome Web Store.

## Stack

- **Framework:** Plasmo 0.90+ (herramientas de build, recarga en caliente, generación del manifiesto MV3)
- **Lenguaje:** TypeScript 5.4+
- **UI:** React 18 (páginas popup, options, newtab)
- **Estilos:** Tailwind CSS 3.4+ con la biblioteca de componentes `@plasmohq/ui`
- **Fondo:** Service Worker via `background.ts` (conforme con Manifest v3)
- **Scripts de contenido:** directorio `contents/` con registro automático basado en patrones de URL
- **Almacenamiento:** `@plasmohq/storage` (wrapper tipado sobre `chrome.storage.sync/local`)
- **Mensajería:** `@plasmohq/messaging` (RPC con seguridad de tipos popup ↔ background ↔ content)
- **Pruebas:** Vitest 1.6+ con `@vitest/browser` para pruebas DOM
- **Linting:** ESLint 9 + `@typescript-eslint` + Prettier 3
- **CI:** GitHub Actions (build, pruebas, publicación en Chrome Web Store via `tldraw/chrome-webstore-upload`)
- **Build alternativo:** WXT 0.19+ (alternativa a Plasmo con mejor HMR)

## Árbol de directorios

```
my-extension/
├── .claude/
│   ├── CLAUDE.md                             # Instrucciones del proyecto para Claude Code
│   └── settings.json                         # Hooks, servidores MCP, permisos
├── .github/
│   └── workflows/
│       ├── ci.yml                            # Build + pruebas en cada PR
│       └── publish.yml                       # Publicación automática en Chrome Web Store al crear tag de release
├── assets/
│   ├── icon.png                              # Icono fuente 512x512 (Plasmo redimensiona automáticamente)
│   ├── icon16.png                            # Icono de barra de herramientas 16x16
│   ├── icon32.png                            # Icono de barra de herramientas 32x32
│   ├── icon48.png                            # Icono de página de extensiones 48x48
│   └── icon128.png                           # Icono de Chrome Web Store 128x128
├── components/
│   ├── Button.tsx                            # Botón UI compartido con variantes Tailwind
│   ├── Toggle.tsx                            # Interruptor activar/desactivar para configuraciones
│   ├── StatusBadge.tsx                       # Indicador de estado activo/inactivo de la extensión
│   └── index.ts                              # Export barrel para todos los componentes
├── contents/
│   ├── github-enhancer.tsx                   # Script de contenido: se ejecuta solo en github.com/*
│   ├── youtube-overlay.tsx                   # Script de contenido: se ejecuta en youtube.com/watch
│   ├── all-pages.ts                          # Script de contenido: se ejecuta en <all_urls>
│   └── inline/
│       └── github-inline.ts                  # Script de contenido inline world (sin shadow DOM)
├── lib/
│   ├── storage.ts                            # Helpers tipados de chrome.storage via @plasmohq/storage
│   ├── messaging.ts                          # Definiciones de tipos de mensajes para todos los canales RPC
│   ├── constants.ts                          # Constantes globales de la extensión (claves, URLs, valores por defecto)
│   ├── permissions.ts                        # Helpers para solicitudes de permisos en tiempo de ejecución
│   └── utils.ts                              # Funciones utilitarias puras (análisis de URL, throttle, etc.)
├── messages/
│   ├── getActiveTab.ts                       # Manejador de mensajes background: devuelve info de la pestaña activa
│   ├── toggleFeature.ts                      # Manejador de mensajes background: activa/desactiva una función
│   └── fetchData.ts                          # Manejador de mensajes background: fetch autenticado
├── tabs/
│   └── settings.tsx                          # Pestaña de configuración a pantalla completa (abierta via options_ui)
├── background.ts                             # Entrada del service worker — registra listeners, alarmas
├── popup.tsx                                 # Popup de acción del navegador (UI 320x480)
├── options.tsx                               # Página de opciones de la extensión
├── newtab.tsx                                # Página de reemplazo de nueva pestaña (opcional)
├── package.json                              # Dependencias, scripts (dev/build/package)
├── tsconfig.json                             # Configuración TypeScript que extiende los valores por defecto de Plasmo
├── tailwind.config.ts                        # Configuración Tailwind con rutas de contenido para todos los .tsx
├── postcss.config.js                         # PostCSS para el procesamiento de Tailwind
├── .env.example                              # Plantilla de claves API (nunca commitear .env)
├── .env.development                          # Variables de entorno solo para desarrollo (URL base de API, flags de debug)
├── .eslintrc.cjs                             # Configuración ESLint con reglas TypeScript y React
├── .prettierrc                               # Configuración Prettier (comillas simples, sangría de 2 espacios)
├── vitest.config.ts                          # Configuración Vitest con mocks de la API de Chrome
├── vitest.setup.ts                           # Mocks globales: chrome.storage, chrome.runtime
└── __tests__/
    ├── lib/
    │   ├── storage.test.ts                   # Pruebas unitarias para helpers de almacenamiento
    │   ├── messaging.test.ts                 # Pruebas unitarias para guards de tipos de mensajes
    │   └── utils.test.ts                     # Pruebas unitarias para utilidades puras
    ├── components/
    │   └── Toggle.test.tsx                   # Pruebas de componentes con @testing-library/react
    └── background.test.ts                    # Pruebas de lógica del service worker con APIs de Chrome mockeadas
```

## Explicación de archivos clave

| Ruta | Propósito |
|---|---|
| `background.ts` | Service worker: registra listeners `chrome.runtime.onMessage`, `chrome.alarms` y eventos `chrome.tabs`. Debe ser sin estado entre activaciones — sin globals en memoria. |
| `popup.tsx` | Raíz React para el popup de acción del navegador. Usa `sendToBackground` de `@plasmohq/messaging` para llamar a los manejadores background. El punto de montaje es auto-generado por Plasmo. |
| `contents/github-enhancer.tsx` | Script de contenido limitado a `github.com/*` via el export `PlasmoCSConfig` de Plasmo. Inyecta UI React en el DOM usando `getInlineAnchor` o `getShadowHostId`. |
| `lib/storage.ts` | Capa de almacenamiento tipada usando `Storage` de `@plasmohq/storage`. Exporta getters/setters tipados para cada clave persistida — nunca llamar a `chrome.storage` directamente. |
| `lib/messaging.ts` | Definiciones compartidas de tipos de mensajes. Tanto el emisor (`sendToBackground`) como el manejador (`onMessage`) importan desde aquí para garantizar la seguridad de tipos entre contextos. |
| `messages/fetchData.ts` | Manejador del lado background para llamadas API autenticadas. El background no tiene restricciones CORS — todos los fetches externos pasan por aquí, nunca desde scripts de contenido. |
| `.github/workflows/publish.yml` | Comprime el artefacto `build/chrome-mv3-prod/` y lo sube a Chrome Web Store via `chrome-webstore-upload-cli` usando los secrets `CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN`. |
| `vitest.setup.ts` | Mockea todo el namespace `chrome.*` usando `vitest-chrome` para que las pruebas unitarias se ejecuten en Node sin un navegador real. |

## Scaffold rápido

```bash
# 1. Bootstrap con Plasmo
pnpm create plasmo my-extension --with-src
cd my-extension

# 2. Agregar paquetes principales de Plasmo
pnpm add @plasmohq/storage @plasmohq/messaging @plasmohq/ui

# 3. Agregar Tailwind CSS
pnpm add -D tailwindcss postcss autoprefixer
pnpx tailwindcss init -p

# 4. Agregar stack de pruebas
pnpm add -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/user-event jsdom vitest-chrome

# 5. Crear estructura de directorios
mkdir -p contents lib messages components assets tabs __tests__/{lib,components} .github/workflows .claude

# 6. Crear archivos lib esenciales
touch lib/storage.ts lib/messaging.ts lib/constants.ts lib/permissions.ts lib/utils.ts

# 7. Crear manejadores de mensajes
touch messages/getActiveTab.ts messages/toggleFeature.ts messages/fetchData.ts

# 8. Crear workflows de GitHub Actions
touch .github/workflows/ci.yml .github/workflows/publish.yml

# 9. Crear archivos de entorno
touch .env.example .env.development
echo "PLASMO_PUBLIC_API_URL=https://api.example.com" >> .env.example

# 10. Crear configuración y setup de Vitest
cat > vitest.config.ts << 'EOF'
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
})
EOF

cat > vitest.setup.ts << 'EOF'
import { vi } from "vitest"
import "vitest-chrome"
EOF

# 11. Agregar scripts a package.json (Plasmo configura dev/build, agregar estos)
# "test": "vitest run"
# "test:watch": "vitest"
# "test:coverage": "vitest run --coverage"
# "lint": "eslint . --ext .ts,.tsx"
# "typecheck": "tsc --noEmit"

# 12. Inicializar CLAUDE.md
touch .claude/CLAUDE.md
```

## Plantilla CLAUDE.md

```markdown
# Extensión de Chrome — CLAUDE.md

## Descripción

Una extensión Chrome Manifest v3 construida con Plasmo, TypeScript, React y Tailwind CSS.
La extensión mejora [describir sitios web objetivo/caso de uso aquí].

## Stack

- Plasmo 0.90+ (build, generación de manifiesto, recarga en caliente)
- TypeScript 5.4 + React 18 + Tailwind CSS 3.4
- @plasmohq/storage (wrapper tipado de Chrome Storage)
- @plasmohq/messaging (RPC con seguridad de tipos entre contextos)
- Vitest 1.6 + vitest-chrome (pruebas unitarias)
- GitHub Actions (CI + publicación en Chrome Web Store)

## Ejecución local

```bash
pnpm dev              # Iniciar servidor de desarrollo Plasmo con recarga en caliente
# Cargar sin empaquetar: chrome://extensions → Modo desarrollador → Cargar extensión sin empaquetar → build/chrome-mv3-dev/
pnpm build            # Build de producción → build/chrome-mv3-prod/
pnpm package          # Comprimir build/chrome-mv3-prod/ para subir a Web Store
pnpm test             # Ejecutar pruebas unitarias de Vitest
pnpm typecheck        # tsc --noEmit (sin salida, solo verifica tipos)
pnpm lint             # ESLint en todos los archivos .ts/.tsx
```

## Agregar un nuevo script de contenido

1. Crear `contents/mi-script.tsx` (React) o `contents/mi-script.ts` (vanilla).
2. Exportar `PlasmoCSConfig` para declarar patrones de coincidencia de URL:
   ```ts
   export const config: PlasmoCSConfig = {
     matches: ["https://example.com/*"],
     all_frames: false,
   }
   ```
3. Exportar por defecto tu componente (React) o ejecutar lógica inline (vanilla).
4. Plasmo registra el script automáticamente — no se requiere edición manual del manifiesto.
5. Para scripts inline world (acceso a globals JS de la página): establecer `world: "MAIN"` en la configuración.

## Mensajería entre contextos

Toda la comunicación entre contextos usa @plasmohq/messaging. Los tipos viven en `lib/messaging.ts`.

Popup → Background (petición/respuesta):
```ts
// popup.tsx
import { sendToBackground } from "@plasmohq/messaging"
const result = await sendToBackground({ name: "fetchData", body: { url } })
```

Manejador background (`messages/fetchData.ts`):
```ts
import type { PlasmoMessaging } from "@plasmohq/messaging"
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const data = await fetch(req.body.url).then(r => r.json())
  res.send({ data })
}
export default handler
```

Content → Background: usar `sendToBackground` desde `@plasmohq/messaging/background`.
Background → Content: usar `chrome.tabs.sendMessage(tabId, payload)` — no RPC de Plasmo.

## Patrones de almacenamiento Chrome

Nunca llamar a `chrome.storage` directamente. Usar `lib/storage.ts`:
```ts
import { Storage } from "@plasmohq/storage"
const storage = new Storage({ area: "sync" }) // o "local"
await storage.set("featureEnabled", true)
const val = await storage.get<boolean>("featureEnabled")
```

Usar `sync` para preferencias de usuario (cuota de 5 MB, sincronización entre dispositivos).
Usar `local` para datos en caché voluminosos (cuota ilimitada, solo en el dispositivo).

## Proceso de declaración de permisos

1. Agregar la cadena de permiso a la clave `manifest` en `package.json`:
   ```json
   "manifest": {
     "permissions": ["tabs", "storage", "scripting"],
     "host_permissions": ["https://example.com/*"]
   }
   ```
2. Para permisos opcionales, usar `chrome.permissions.request()` en tiempo de ejecución via `lib/permissions.ts`.
3. Ejecutar `pnpm build` y verificar el `build/chrome-mv3-prod/manifest.json` generado.
4. Documentar por qué se necesita el permiso en un comentario — la revisión de Chrome Web Store exige justificación.
5. Minimizar permisos — solicitar solo lo que la función actual necesita, no las futuras.

## Convenciones

- Todas las claves de almacenamiento son constantes de tipo string en `lib/constants.ts` — nunca usar cadenas de claves inline.
- Todos los fetches externos (a APIs de terceros) pasan por un manejador de mensajes background, no scripts de contenido.
- Los scripts de contenido no pueden importar módulos de Node.js — solo código compatible con el navegador.
- Los archivos de manejadores de mensajes en `messages/` deben exportar un único manejador por defecto — sin exports nombrados.
- Las clases de Tailwind van directamente en JSX — sin módulos CSS, sin estilos inline.
- Todas las nuevas funciones deben tener pruebas unitarias de Vitest antes de la fusión.

## Lista de verificación para publicación

- [ ] Incrementar `version` en `package.json` (sigue semver)
- [ ] Actualizar la descripción del listado en la tienda en `.github/store-listing.md`
- [ ] Ejecutar `pnpm build` y probar manualmente la extensión empaquetada localmente
- [ ] Ejecutar `pnpm test` — todas las pruebas en verde
- [ ] Ejecutar `pnpm typecheck` — sin errores de tipos
- [ ] Etiquetar el release: `git tag v1.x.x && git push --tags`
- [ ] GitHub Actions `publish.yml` se activa automáticamente y sube al Web Store
- [ ] Enviar para revisión en Chrome Developer Dashboard si los permisos cambiaron
```

## Servidores MCP

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-filesystem", "/Users/you/my-extension"],
      "description": "Leer/escribir archivos fuente de la extensión"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      },
      "description": "Abrir PRs, leer logs de CI, gestionar releases"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"],
      "description": "Controlar Chrome con la extensión cargada para verificación end-to-end"
    }
  }
}
```

## Hooks recomendados

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "cd /Users/you/my-extension && pnpm lint --fix --quiet 2>&1 | tail -5",
            "description": "Corregir automáticamente errores de lint después de cada escritura de archivo"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "cd /Users/you/my-extension && pnpm typecheck 2>&1 | grep -E 'error TS' | head -10",
            "description": "Mostrar errores de TypeScript inmediatamente después de escrituras de archivos"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Reminder: never call chrome.storage directly — use lib/storage.ts'",
            "description": "Recordar a Claude usar el wrapper de almacenamiento tipado antes de cualquier ejecución bash"
          }
        ]
      }
    ]
  }
}
```

## Skills a instalar

```bash
npx uitkit add skill devops-infra/github-actions-ci
npx uitkit add skill frontend/react-component
npx uitkit add skill frontend/tailwind-ui
npx uitkit add skill devops-infra/release-management
npx uitkit add workflow chrome-extension-publish
```

## Recursos relacionados

- [../guides/chrome-extension-messaging.md](../guides/chrome-extension-messaging.md)
- [../guides/plasmo-getting-started.md](../guides/plasmo-getting-started.md)
- [../workflows/chrome-extension-publish.md](../workflows/chrome-extension-publish.md)
- [../workflows/content-script-rollout.md](../workflows/content-script-rollout.md)
