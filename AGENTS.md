# Agent Guide: Airlines 2025

This document provides essential information for autonomous agents operating in this repository.

## 1. Tech Stack

- **Backend:** [Deno](https://deno.land/) with [Hono](https://hono.dev/) framework.
- **Database:** [Prisma](https://www.prisma.io/) with SQLite.
- **Frontend:** [Vue 3](https://vuejs.org/) with [Vite](https://vitejs.dev/) (located in `/AirlinesLioJakob`).

## 2. Project Structure

- `/main.ts`: Backend entry point and API route definitions.
- `/service/`: Business logic layer. Handles validation and complex operations.
- `/Repository/`: Data access layer. Direct interaction with Prisma client.
- `/prisma/`: Prisma schema, migrations, and generated client.
- `/AirlinesLioJakob/`: Frontend application.
- `/scripts/`: Utility scripts (e.g., database checks).
- `/static/`: Static assets for the backend server.

## 3. Build, Lint, and Test Commands

### Backend (Root Directory)

Backend tasks are managed via Deno. Use `deno task <task_name>`.

| Task       | Command            | Description                                     |
| :--------- | :----------------- | :---------------------------------------------- |
| **dev**    | `deno task dev`    | Starts the server with hot reload (watch mode). |
| **pg**     | `deno task pg`     | Generates the Prisma client.                    |
| **pmd**    | `deno task pmd`    | Runs Prisma migrations (dev).                   |
| **seed**   | `deno task seed`   | Seeds the database with sample data.            |
| **check**  | `deno task check`  | Performs type checking.                         |
| **studio** | `deno task studio` | Opens Prisma Studio to view/edit data.          |
| **server** | `deno task server` | Runs the production server.                     |

**Tests:** Currently, there are no tests in the repository. If adding tests, follow Deno standards:

- File naming: `*.test.ts`.
- Run all tests: `deno test -A`.
- Run a single test: `deno test -A <path_to_file>`.

### Frontend (`/AirlinesLioJakob`)

Frontend tasks use NPM.

| Task        | Command           | Description                            |
| :---------- | :---------------- | :------------------------------------- |
| **dev**     | `npm run dev`     | Starts the Vite development server.    |
| **build**   | `npm run build`   | Builds the application for production. |
| **preview** | `npm run preview` | Previews the production build locally. |

## 4. Code Style Guidelines

### General

- **Indentation:** 4 spaces (defined in `deno.json`).
- **Line Width:** 130 characters.
- **Quotes:** Double quotes preferred for strings.
- **Naming Conventions:**
  - Files: `camelCase.ts` (e.g., `flightService.ts`).
  - Functions/Variables: `camelCase`.
  - Prisma Models: `PascalCase` (e.g., `Flight`, `Passenger`).
  - Interfaces/Types: `PascalCase`.

### Backend Patterns

- **Imports:**
  - Use JSR or NPM specifiers for external dependencies.
  - Local imports must include the `.ts` extension.
  - Prefer importing services/repositories as namespaces: `import * as flightService from "./service/flight.ts";`.
- **Layering:**
  - **Routes (`main.ts`):** Handle HTTP concerns, call services, return JSON.
  - **Services (`/service`):** Handle business logic, validation, and orchestration. Throw descriptive `Error` objects on failure.
  - **Repositories (`/Repository`):** Pure data access using Prisma.
- **Error Handling:**
  - Services throw errors for validation or business rule violations.
  - `main.ts` should catch these errors and return a 400 Bad Request with a JSON error message: `{ "error": "Message" }`.
- **Database:**
  - Always run `deno task pg` after modifying `prisma/schema.prisma`.
  - Use `prisma/client/client.ts` as the model source (aliased as `model` in `deno.json`).

### Frontend Patterns (Vue)

- **SFC Structure:** Use `<script setup>`, `<template>`, and `<style scoped>`.
- **Routing:** Managed in `router.js`.
- **State:** Keep simple; use props/emits or reactive objects for shared state.

## 5. API Endpoints (Core)

- `GET /passengers`: List all passengers.
- `POST /passengers`: Create a new passenger.
- `GET /planes`: List all planes.
- `POST /planes`: Create a new plane.
- `GET /airports`: List all airports.
- `POST /airports`: Create a new airport.
- `GET /flights`: List all flights (use `?include=relations` for full data).
- `GET /flights/:id`: Get flight details.
- `POST /flights`: Create a new flight.
- `POST /flights/:id/passengers`: Book passengers to a flight.

## 6. Data Model (Prisma)

- **Airport:** `id`, `name`, `iataCode`, `city`.
- **Flight:** `id`, `flightNumber`, `departureTime`, `arrivalTime`, `originId`, `destinationId`, `planeId`.
- **Passenger:** `id`, `firstName`, `lastName`, `email`.
- **Plane:** `id`, `model`, `capacity`.

## 7. Workflow Example: Adding a Feature

1. **Schema:** Update `prisma/schema.prisma` if needed.
2. **Migrate:** Run `deno task pmd` and `deno task pg`.
3. **Repository:** Add data access method in `/Repository`.
4. **Service:** Add business logic/validation in `/service`.
5. **Route:** Add endpoint in `main.ts`.
6. **Frontend:** Update Vue components in `/AirlinesLioJakob/src/pages`.

## 8. Agent Instructions

- **Modifying Schema:** If you change the Prisma schema, you MUST run `deno task pmd` to create a migration and `deno task pg` to update the client.
- **New Endpoints:** When adding new endpoints, follow the existing pattern in `main.ts` and ensure corresponding logic is added to `service/` and `Repository/`.
- **Formatting:** Run `deno fmt` before finishing to ensure code consistency.
- **Type Safety:** Ensure all new code passes `deno task check`.

## 9. Additional Rules

- No Cursor/Copilot specific rules were found in the repository. Follow the patterns established in the existing source code.
- Avoid introducing new heavy dependencies without strong justification.
- Maintain the current separation of concerns between Repository and Service layers.
- When working on the frontend, ensure the `AirlinesLioJakob` directory is used for all Vite/Vue related changes.
- The backend and frontend are decoupled; communication happens via the API at `localhost:3000`.
