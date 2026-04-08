# Decisions

Architectural and technical decisions made in this project.
Each entry documents WHAT was decided and WHY.

## 2025-10-22: Deno + Hono Backend

- **Choice**: Deno runtime with Hono web framework for the backend API.
- **Reason**: Deno provides native TypeScript support, secure-by-default permissions, and a single-binary toolchain. Hono is lightweight, has built-in CORS/middleware, and works well with Deno.
- **Considered**: Express (Node.js), Fastify, Oak (Deno).
- **Tradeoff**: Smaller ecosystem than Node.js/Express; dependency management uses URL imports and JSR rather than npm natively.

## 2025-10-22: Prisma + SQLite Database

- **Choice**: Prisma ORM with SQLite as the database engine.
- **Reason**: Zero-config embedded database ideal for a teaching project. Prisma provides type-safe queries, migrations, and a visual studio for data inspection.
- **Considered**: Drizzle, raw SQL, MongoDB.
- **Tradeoff**: SQLite does not support concurrent writes well; Prisma's Deno runtime support requires specific generator configuration.

## 2025-10-22: Vue 3 + Vite Frontend

- **Choice**: Vue 3 (Composition API with `<script setup>`) and Vite for the frontend.
- **Reason**: Vue 3's Composition API is concise for teaching. Vite provides fast HMR and simple proxy configuration for API requests.
- **Considered**: React, Svelte, plain HTML.
- **Tradeoff**: No component library; all UI components must be built from scratch.

## 2025-10-22: API Proxy via Vite Dev Server

- **Choice**: Frontend proxies `/api` requests to `localhost:3000` via Vite's dev server config, stripping the `/api` prefix.
- **Reason**: Avoids CORS issues during development and provides a clean separation between frontend and backend origins.
- **Considered**: Direct CORS headers on backend (also implemented as fallback).
- **Tradeoff**: The `/api` prefix convention must be remembered by all frontend developers; it is stripped before reaching Hono.

## 2025-10-22: Three-Layer Backend Architecture

- **Choice**: Routes (main.ts) → Services (service/) → Repositories (Repository/).
- **Reason**: Clear separation of concerns: HTTP handling, business logic/validation, and data access. Each layer can be tested independently.
- **Considered**: Flat controller pattern, single-layer approach.
- **Tradeoff**: More files to maintain for simple CRUD operations; some services just delegate to repositories.

## 2025-10-22: Auto-Port Selection

- **Choice**: Server tries ports 3000-3010 sequentially, picking the first available.
- **Reason**: Prevents "port already in use" errors during development, especially when the server is restarted frequently with `--watch`.
- **Considered**: Hardcoded port, random port.
- **Tradeoff**: If the server ends up on a non-3000 port, the Vite proxy will not work unless manually reconfigured.
