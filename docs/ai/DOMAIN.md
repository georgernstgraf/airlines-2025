# Domain Knowledge

Business rules and domain relationships not obvious from code.

## Entities

- **Airport**: Represents a real-world airport with a unique 3-letter IATA code (e.g., `VIE`, `MUC`). An airport can be both an origin and a destination for flights.
- **Flight**: A scheduled journey between two airports on a specific plane. Identified by a flight number (e.g., `LH1234`). Has a departure time, arrival time, origin, destination, and assigned plane.
- **Plane**: An aircraft with a model name (e.g., `Boeing 737`) and a fixed seating capacity (1-1000). One plane can operate multiple flights.
- **Passenger**: A person with a first name, last name, and unique email. Can be booked on multiple flights. The many-to-many relationship is managed via an implicit Prisma join table `_FlightToPassenger`.

## Relationships

- `Airport` 1:N `Flight` (as origin via `departingFlights`)
- `Airport` 1:N `Flight` (as destination via `arrivingFlights`)
- `Plane` 1:N `Flight` (a plane operates many flights)
- `Passenger` M:N `Flight` (a passenger can be booked on many flights; a flight can have many passengers)

## Rules

- Departure time must be strictly before arrival time.
- Origin airport must differ from destination airport (no self-referencing flights).
- A plane's capacity cannot be exceeded: total booked passengers (existing + new) must be <= plane capacity.
- Plane capacity must be between 1 and 1000 inclusive.
- IATA codes must be exactly 3 uppercase letters (`/^[A-Z]{3}$/`).
- Passenger emails must be unique across the system and match the pattern `^[^\s@]+@[^\s@]+\.[^\s@]+$`.
- All entity IDs are auto-generated UUIDs (`@default(uuid())`).
- Passenger-Flight bookings use Prisma `connect`/`disconnect` operations on the implicit join table.

## Data Volume (Seed Defaults)

- 20,000 passengers
- 250 planes
- 31 airports (intended; actual seeding uses faker data — see PITFALLS.md)
- 2,000 flights
- 0-50 passengers assigned per flight (random)
