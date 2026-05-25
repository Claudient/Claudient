---
name: deno
description: "Deno 2 Runtime: Built-in TypeScript, Permission-Modell, deno.json Config, npm Kompatibilität, Standard Library, Deno KV, Deno Deploy Edge-Runtime, Fresh Framework Islands-Architektur und Testing mit Deno.test"
---

# Deno 2 Skill

## Wann zu Aktivieren
- Starten eines neuen TypeScript Projekts und Evaluieren von Runtimes
- Bau eines Security-Sensitiven Service, wo Granular Permissions wichtig ist
- Deployment zu Deno Deploy (Edge, Global Distribution)
- Nutzen des Fresh Frameworks (Deno's Web Framework)
- Arbeiten mit Deno KV (Built-in Key-Value Store, keine externe Abhängigkeit)
- Migration eines kleinen Node.js Scripts zu Deno
- Das Projekt nutzt `deno.json` oder `import_map.json` statt `package.json`
- Nutzer mention `deno run`, `deno task`, `deno deploy` oder `@std/` Imports

## Wann NICHT zu Nutzen
- Projekte bereits auf Node.js mit tiefen Native-Addon-Abhängigkeiten — Migrations-Kosten sind hoch
- Bun Projekte — unterschiedliche Runtime, nutze Bun Skill
- Cloudflare Workers — nutze Hono Skill (Workers hat eigene Runtime)
- Projekte, die npm Packages mit Native-Bindings erfordern, noch nicht zu Deno geportet
- Team hat kein Deno-Familiarity und eine Deadline ist Tight — Node.js Ökosystem ist größer

## Instruktionen

### Projekt-Setup

```bash
# Installiere Deno
curl -fsSL https://deno.land/install.sh | sh    # macOS/Linux
# oder: brew install deno

# Verifiziere
deno --version

# Erstelle ein Projekt
mkdir my-api && cd my-api

# deno.json ersetzt package.json
# Erstelle manuell oder lass ersten deno Task es erstellen
```

```jsonc
// deno.json — Central Config, ersetzt package.json + tsconfig.json
{
  "tasks": {
    "dev": "deno run --watch --allow-net --allow-env --allow-read src/main.ts",
    "start": "deno run --allow-net --allow-env --allow-read src/main.ts",
    "test": "deno test --allow-net --allow-env",
    "check": "deno check src/main.ts"
  },
  "imports": {
    // Import Map — Aliases für sauberer Imports
    "@std/http": "jsr:@std/http@^1.0.0",
    "@std/path": "jsr:@std/path@^1.0.0",
    "@std/testing": "jsr:@std/testing@^1.0.0",
    "hono": "jsr:@hono/hono@^4.0.0",
    "zod": "npm:zod@^3.22.0"
  },
  "compilerOptions": {
    // TypeScript ist Built-in — keine separate tsconfig.json erforderlich
    "strict": true,
    "lib": ["deno.window"]
  }
}
```

Keine `node_modules`. Keine `tsconfig.json`. Keine `babel.config.js`. TypeScript läuft direkt.

### Permission-Modell

Deno ist Deny-by-Default. Jede Capability muss explizit bei Startup gewährt werden.

```bash
# Häufige Permission-Flags
deno run --allow-net src/main.ts          # All Network-Zugriff
deno run --allow-net=api.example.com src/main.ts  # Spezifisches Host nur
deno run --allow-read src/main.ts         # Alle Datei-Reads
deno run --allow-env=PORT,DATABASE_URL src/main.ts  # Spezifische Vars nur
deno run -A src/main.ts                   # Alle Permissions (Dev nur)

# Permissions sind explizit in deno.json Tasks
# Nutze -A nie in Production — sei spezifisch über was das Programm braucht
```

### Nutzen von npm Packages und JSR

```typescript
// Nutze npm: Prefix — Deno downloaded und cached automatisch
import { z } from 'npm:zod'
import express from 'npm:express@4'

// Oder erkläre in deno.json Import Map (bevorzugt):
// "zod": "npm:zod@^3.22.0"
import { z } from 'zod'  // Resolved via Import Map

// JSR (JavaScript Registry) — modern, Deno-Native Registry
import { Hono } from 'jsr:@hono/hono'
import { assertEquals } from 'jsr:@std/assert'
```

```bash
# Cache Dependencies ohne Laufen (wie npm install für CI)
deno cache src/main.ts

# Überprüfe für veraltete Dependencies
deno outdated
```

### Standard Library (@std/)

```typescript
// HTTP Server — @std/http
import { serve } from '@std/http'

await serve((req) => {
  const url = new URL(req.url)
  if (url.pathname === '/health') {
    return Response.json({ status: 'ok' })
  }
  return new Response('Nicht gefunden', { status: 404 })
}, { port: 8000 })

// Path Utilities — @std/path
import { join, dirname, basename, extname } from '@std/path'
const configPath = join(Deno.cwd(), 'config', 'settings.json')

// Datei I/O (erfordert --allow-read / --allow-write)
const text = await Deno.readTextFile(configPath)
const config = JSON.parse(text)
await Deno.writeTextFile('/tmp/output.json', JSON.stringify(config, null, 2))

// Environment-Variablen
const port = parseInt(Deno.env.get('PORT') ?? '8000')
const dbUrl = Deno.env.get('DATABASE_URL')
if (!dbUrl) throw new Error('DATABASE_URL ist erforderlich')
```

### Deno KV

Built-in Key-Value Store. Null Config. Funktioniert lokal und auf Deno Deploy.

```typescript
// Keine Install, kein Connection String erforderlich — Built in den Runtime
const kv = await Deno.openKv()   // Local SQLite bei Dev, Managed auf Deno Deploy

// Schlüssel sind Arrays von Parts — erlaubt Hierarchische Namespacing
await kv.set(['users', 'alice@example.com'], {
  id: 'u_01',
  name: 'Alice',
  email: 'alice@example.com',
  createdAt: new Date().toISOString(),
})

// Holen
const result = await kv.get<{ name: string }>(['users', 'alice@example.com'])
console.log(result.value?.name)     // 'Alice'

// Liste mit Prefix — Effiziente Range-Scan
const iter = kv.list<User>({ prefix: ['users'] })
const users: User[] = []
for await (const entry of iter) {
  users.push(entry.value)
}

// Atomare Transaktionen
const res = await kv.atomic()
  .check({ key: ['sessions', token], versionstamp: null })  // Muss nicht existieren
  .set(['sessions', token], { userId: 'u_01', expiresAt: Date.now() + 86400_000 })
  .commit()

if (!res.ok) throw new Error('Session Token Collision — Versuch erneut')

// Beobachte Änderungen (Real-Time, funktioniert auf Deno Deploy)
const watcher = kv.watch([['users', 'alice@example.com']])
for await (const [entry] of watcher) {
  console.log('Nutzer aktualisiert:', entry.value)
}
```

### Testen

```typescript
// Keine Test-Framework-Installation erforderlich — Deno.test ist Built-in
// Laufe: deno test

import { assertEquals, assertRejects } from '@std/assert'

Deno.test('addiert zwei Nummern', () => {
  assertEquals(1 + 2, 3)
})

Deno.test('fetcht Nutzer von KV', async () => {
  const kv = await Deno.openKv(':memory:')
  await kv.set(['users', '1'], { name: 'Alice' })

  const result = await kv.get(['users', '1'])
  assertEquals((result.value as { name: string }).name, 'Alice')

  kv.close()
})
```

```bash
deno test                          # Alle Tests laufen
deno test --watch                  # Watch Modus
deno test --filter "UserService"   # Matching Tests
deno test --coverage=./cov         # Erzeuge Coverage Daten
```

### Fresh Framework (Islands Architecture)

```bash
deno run -A -r jsr:@fresh/init my-app
cd my-app && deno task start
```

```tsx
// routes/index.tsx — Server-Rendered standardmäßig (Null Client JS)
import type { PageProps } from '$fresh/server.ts'
import Counter from '../islands/Counter.tsx'   // Nur dies wird ein JS Bundle

export default function Home({ data }: PageProps) {
  return (
    <main>
      <h1>Hallo von Fresh</h1>
      {/* Counter ist eine "Island" — nur diese Komponente sendet JS zum Browser */}
      <Counter initialCount={0} />
    </main>
  )
}
```

```tsx
// islands/Counter.tsx — Interaktive Island (sendet JS zum Browser)
import { useSignal } from '@preact/signals'

export default function Counter({ initialCount }: { initialCount: number }) {
  const count = useSignal(initialCount)
  return (
    <button onClick={() => count.value++}>
      Count: {count}
    </button>
  )
}
```

### Deno Deploy

```bash
# Installiere deployctl
deno install -A jsr:@deno/deployctl

# Deploy von Lokal
deployctl deploy --project=my-api src/main.ts

# Oder Link zu GitHub — Deno Deploy Auto-Deploys bei Push
# Keine Docker, keine Container — Gib einfach deinen TypeScript hin
```

```typescript
// main.ts — funktioniert Identisch lokal und auf Deno Deploy
// Deno KV, Fetch und Deno.env funktionieren alle auf Deploy ohne Änderungen
const kv = await Deno.openKv()

Deno.serve({ port: 8000 }, async (req) => {
  const url = new URL(req.url)

  if (url.pathname === '/') {
    const visits = await kv.get<number>(['visits'])
    const count = (visits.value ?? 0) + 1
    await kv.set(['visits'], count)
    return Response.json({ visits: count })
  }

  return new Response('Nicht gefunden', { status: 404 })
})
```

### Deno vs Node.js — Wann Deno Wählen

Wähle Deno, wenn:
- **Greenfield TypeScript Projekt** — keine tsconfig, kein Build-Schritt, TypeScript funktioniert out-of-the-box
- **Security wichtig ist** — Explizite Permissions machen Attack-Surface auditable
- **Edge Deployment** — Deno Deploy ist Purpose-Built; ~300 PoPs, Cold-Start in Microsekunden
- **Einfache Scripts** — `deno run https://example.com/script.ts` funktioniert ohne irgendetwas zu installieren
- **Deno KV** — Brauchst persistenten Store ohne Redis oder Postgres für einen kleinen Service

Bleib bei Node.js, wenn:
- Großer Codebase mit Native-Addons existiert
- Team ist tief im Node.js-Ökosystem-Tooling (Jest, Webpack, etc.)
- Packages genutzt haben kein Deno/npm-compatible Builds
- Monorepo Tooling (Turborepo, Nx) das Node.js annimmt

## Beispiel

Build REST API mit Hono auf Deno, das Items in Deno KV speichert. Benötigt CRUD Endpoints und einen Test.

Erwartet Output: deno.json, src/main.ts mit Hono App, CRUD Endpoints, Deno KV Nutzung, Tests mit Deno.test.
