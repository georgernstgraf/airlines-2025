# Pitfalls

Things that do not work, subtle bugs, and non-obvious constraints.
Read this file carefully before making changes in affected areas.

- **Stale `AirlinesLioJakob/` references**: `AGENTS.md`, `SETUP.md`, `QUICKSTART.md`, and `CHANGES.md` all reference `AirlinesLioJakob/` as the frontend directory. It does not exist. The frontend lives in `src/` at the project root.

- **Seed count mismatch**: `CHANGES.md` and `SETUP.md` claim 6000 flights are seeded, but `seed.ts` sets `ensureFlights = 2000`. Do not trust doc numbers over code.

- **`endpoints.rest` uses wrong query param**: The file uses `?include=true` for the flights-with-relations endpoint, but `main.ts` checks `?include=relations`. The `.rest` file will not return relational data as written.

- **BookFlight.vue sends fake passenger IDs**: On booking, `BookFlight.vue` sends `passengerIds` as array index strings (`["0", "1", ...]`) instead of real passenger UUIDs. No passengers are created via the API before booking. The booking will fail or create meaningless associations.

- **Flight price is random mock data**: `calculatePrice()` in `FlightSearch.vue` returns `Math.floor(Math.random() * 200) + 50`, producing a different price on every render. There is no real pricing model.

- **Airport seeder never inserts real airports**: `seed.ts` defines a `realAirports` array of 31 real airports but the creation loop uses `faker.airline.airport()` for fake data instead. The real airports are only used to determine the target count.

- **All Vue scoped style blocks are empty**: Every `.vue` component has an empty `<style scoped>` block. No CSS has been applied to the frontend yet.

- **Duplicate repository function in airport.ts**: `Repository/airport.ts` exports both `getById` and `findById` that perform the same Prisma query with identical includes.

- **`deno.json` `model` alias is unused**: The `"model": "./prisma/client/client.ts"` import alias exists in `deno.json` but is never imported anywhere. Do not rely on it.

- **Port auto-selection can break Vite proxy**: If port 3000 is occupied, the backend starts on 3001+. The Vite dev proxy is hardcoded to `localhost:3000` and will fail silently.

- **Prisma import paths differ by file**: `db.ts` imports `PrismaClient` from `../prisma/client/client.ts`, while all other repos import `Prisma` types from `../prisma/client/browser.ts`. Do not mix these up.

- **`service/airport.ts` bypasses service layer**: `getAllAirports` and `getAirportCount` are re-exported directly from the repository, skipping the service layer. This breaks the three-layer architecture convention.
