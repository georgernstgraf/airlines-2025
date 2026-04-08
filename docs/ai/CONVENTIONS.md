# Conventions

Coding patterns, naming rules, and style agreements for this project.
Follow these without question. Do not deviate unless explicitly told.

## Naming

- Files: `camelCase.ts` (e.g., `flightService.ts`, `db.ts`).
- Functions/variables: `camelCase`.
- Prisma models: `PascalCase` (e.g., `Flight`, `Passenger`).
- Interfaces/Types: `PascalCase`.
- Delete functions: `delete_` (trailing underscore to avoid JS reserved word conflict).
- Frontend pages: `PascalCase.vue` (e.g., `FlightSearch.vue`, `BookFlight.vue`).

## Formatting

- Indentation: 4 spaces (enforced by `deno.json`).
- Line width: 130 characters.
- Quotes: Double quotes for strings.
- Run `deno fmt` before committing.

## File Layout

- `main.ts`: Backend entry point and all API route definitions.
- `service/`: Business logic layer. Validation, orchestration, error throwing.
- `Repository/`: Data access layer. Pure Prisma queries, no business logic.
- `prisma/`: Schema, migrations, generated client.
- `src/`: Vue 3 frontend application (NOT `AirlinesLioJakob/` — that directory does not exist despite stale docs).
- `src/pages/`: Vue page components.
- `static/`: Static HTML pages served directly by Hono.
- `scripts/`: Utility scripts (endpoint tests, DB checks).
- `docs/ai/`: Agent knowledge persistence files.

## Imports

- External dependencies: Use JSR or NPM specifiers as defined in `deno.json` imports.
- Local imports: Must include the `.ts` extension.
- Services/repositories: Import as namespaces: `import * as flightService from "./service/flight.ts";`.
- Prisma types: Import from `../prisma/client/browser.ts` (e.g., `import { Prisma } from "../prisma/client/browser.ts"`).
- PrismaClient: Import from `./db.ts` singleton, which uses `../prisma/client/client.ts`.

## API Patterns

- All routes return JSON.
- POST endpoints: return 201 on success, 400 with `{ "error": "message" }` on validation failure.
- GET endpoints: return 200 with data, 404 with `{ "error": "Not found" }` when resource missing.
- Query parameter `?include=relations` on `/flights` triggers full relational data load.
- Frontend accesses API via `/api/` prefix (stripped by Vite proxy to `localhost:3000`).

## Error Handling

- Services throw `Error` objects with descriptive messages for validation/business rule violations.
- `main.ts` catches errors in try/catch blocks and returns `{ error: message }` with appropriate HTTP status.
- Never return raw error objects; always wrap in `{ error: "..." }` JSON.

## Database

- Always run `deno task pmd` after modifying `prisma/schema.prisma` to create a migration.
- Always run `deno task pg` after schema changes to regenerate the Prisma client.
- The `model` import alias in `deno.json` maps to `./prisma/client/client.ts` but is currently unused in the codebase.
- Connection string in `.env`: `DATABASE_URL=file:../raphael.db` (relative to `prisma/` directory).

## Frontend (Vue)

- Use `<script setup>`, `<template>`, and `<style scoped>` SFC structure.
- Routing: defined in `src/router.js`.
- State management: simple `sessionStorage` for cross-page data (e.g., selected flight). No Vuex/Pinia.
- Path alias: `@` maps to `./src` (configured in `vite.config.js` and `jsconfig.json`).

## Testing

- Backend tests: `deno task test` runs `scripts/test_endpoints.ts` (integration tests against live server).
- File naming: `*.test.ts` for unit tests (none currently exist).
- Run all tests: `deno test -A`.

## Commands

- Type check: `deno task check`
- Format: `deno fmt`
- Dev server (backend): `deno task dev`
- Dev server (frontend): `npm run dev`
- Build frontend: `npm run build`
