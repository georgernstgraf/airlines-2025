# Project State

Current status as of 2026-04-08.

## Current Focus
Initial knowledge persistence — documenting the full codebase state for the first time.

## Completed (this cycle)
- [x] Full project exploration and documentation
- [x] Created `docs/ai/` knowledge files (DECISIONS, CONVENTIONS, PITFALLS, DOMAIN, STATE, ARCHITECTURE, HANDOFF)
- [x] Amended `AGENTS.md` with Knowledge Bootstrap block

## Pending
- [ ] Fix stale `AirlinesLioJakob/` references in AGENTS.md, SETUP.md, QUICKSTART.md, CHANGES.md
- [ ] Fix BookFlight.vue to create passengers before booking (currently sends fake IDs)
- [ ] Fix `endpoints.rest` query param (`?include=true` → `?include=relations`)
- [ ] Fix `seed.ts` to insert the 31 real airports from `realAirports` array
- [ ] Align `seed.ts` flight count (2000) with documented count (6000) or vice versa
- [ ] Implement CSS styling for all Vue components (all scoped style blocks are empty)
- [ ] Replace mock price calculation in FlightSearch.vue with a real pricing model
- [ ] Remove duplicate `findById`/`getById` in Repository/airport.ts
- [ ] Write unit tests (none currently exist)

## Blockers
- None

## Next Session Suggestion
Fix the stale `AirlinesLioJakob/` references across all documentation files, then tackle the BookFlight.vue booking bug (passenger IDs).
