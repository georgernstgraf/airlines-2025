# Quick Start Guide

## Empfohlener Entwicklungsmodus (mit HMR)

Vite laeuft nur fuer HMR und Frontend-Entwicklung. Hono bleibt der API-Server.

1. Terminal 1 - API (Hono):

```bash
deno task dev
```

API laeuft auf http://localhost:3000

2. Terminal 2 - UI (Vite HMR):

```bash
deno task ui:dev
```

UI laeuft auf http://localhost:5173 und nutzt den Proxy fuer /api.

## Produktionsmodus

In Produktion laeuft nur Hono. Vite ist kein Server mehr.

1. Build erzeugen:

```bash
deno task ui:build
```

2. Nur Hono starten:

```bash
deno task server
```

Hono serviert die gebaute SPA aus dist/client inklusive /assets/* und SPA-Fallback auf index.html.

## Optional: Ein Server auch in Entwicklung (ohne HMR)

Wenn du auch in Entwicklung keinen Bundler-Server willst:

1. Terminal 1 - Build Watch:

```bash
deno task ui:build:watch
```

2. Terminal 2 - Hono:

```bash
deno task dev
```

Damit gibt es nur einen Runtime-Server (Hono auf :3000), aber kein HMR. Iteration ist merkbar langsamer.

## Einmalig vor dem Start

```bash
deno run -A --env-file prisma migrate dev
deno task seed
```
