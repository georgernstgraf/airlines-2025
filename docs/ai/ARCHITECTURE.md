# Architecture

Living structural map of the system as of 2026-04-08.
Overwritten when structural changes occur during a session.

## Overview

Airlines 2025 is a full-stack web application for searching and booking flights. The backend is a Deno/Hono REST API with a Prisma/SQLite data layer using a three-layer architecture (routes → services → repositories). The frontend is a Vue 3 SPA with Vite that proxies API requests through `/api`. Static HTML marketing pages are served directly by Hono from the `static/` directory.

## Backend Layers

```
main.ts (Routes / HTTP)
  ├── service/ (Business Logic / Validation)
  │     ├── passenger.ts
  │     ├── plane.ts
  │     ├── airport.ts
  │     └── flight.ts
  └── Repository/ (Data Access / Prisma)
        ├── db.ts (PrismaClient singleton)
        ├── passenger.ts
        ├── plane.ts
        ├── airport.ts
        └── flight.ts
```

## API Endpoints

| Method | Path | Handler | Notes |
|--------|------|---------|-------|
| GET | `/` | Health check | Returns `{ message, version }` |
| GET | `/passengers` | `passengerService.findMany()` | |
| POST | `/passengers` | `passengerService.createPassenger()` | 201/400 |
| GET | `/planes` | `planeService.getAll()` | |
| POST | `/planes` | `planeService.createPlane()` | 201/400 |
| GET | `/airports` | `airportService.getAllAirports()` | |
| POST | `/airports` | `airportService.createAirport()` | 201/400 |
| GET | `/flights` | `flightService.findMany[WithRelations]()` | `?include=relations` for full data |
| GET | `/flights/:id` | `flightService.findById()` | 200/404 |
| POST | `/flights` | `flightService.createFlight()` | 201/400 |
| POST | `/flights/:id/passengers` | `flightService.bookPassengersToFlight()` | 200/400 |

## Frontend Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `src/pages/Home.vue` | Landing page with hero and 3-step guide |
| `/search` | `src/pages/FlightSearch.vue` | Search flights by origin/destination/date, view results |
| `/book` | `src/pages/BookFlight.vue` | Book a selected flight with passenger details |

State is passed between pages via `sessionStorage` (no Vuex/Pinia).

## Data Model

```
Airport ──1:N──> Flight (origin)
Airport ──1:N──> Flight (destination)
Plane ──1:N──> Flight
Passenger ──M:N──> Flight (implicit join table _FlightToPassenger)
```

All IDs are UUIDs. SQLite database file: `raphael.db` at project root.

## Vite Proxy

Frontend requests to `/api/*` are proxied to `http://localhost:3000/*` with the `/api` prefix stripped.

## Knowledge Files (`docs/ai/`)

| File | Purpose | Update mode |
|------|---------|------------|
| HANDOFF.md | Open tasks for next session | Overwrite |
| DECISIONS.md | Chronological record of choices | Append |
| ARCHITECTURE.md | Living structural map | Overwrite |
| CONVENTIONS.md | Ongoing rules to follow | Append |
| PITFALLS.md | Hard-won failure knowledge | Append |
| DOMAIN.md | Business/domain rules | Append |
| STATE.md | Current project status | Overwrite |

## Key Dependencies

| Package | Version | Source | Purpose |
|---------|---------|--------|---------|
| Hono | ^4.6.16 | JSR | Web framework |
| Prisma | ^6.18.0 | NPM | ORM + CLI |
| @faker-js/faker | ^10.1.0 | NPM | Seed data generation |
| Vue | ^3.5.27 | NPM | Frontend framework |
| Vue Router | ^4.6.4 | NPM | SPA routing |
| Vite | ^7.3.1 | NPM | Build tool |
