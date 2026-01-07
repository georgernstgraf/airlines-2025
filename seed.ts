import * as passengerService from "./service/passenger.ts";
import * as planeService from "./service/plane.ts";
import * as airportService from "./service/airport.ts";
import * as flightService from "./service/flight.ts";
import { faker } from "@faker-js/faker";
import { disconnect } from "./Repository/db.ts";

const ensurePassengers = 20000;
const ensurePlanes = 250;
const ensureFlights = 2000;

// Real-world airport list to avoid fake locations
const realAirports = [
    { name: "Vienna International Airport", iataCode: "VIE", city: "Vienna" },
    { name: "Graz Airport", iataCode: "GRZ", city: "Graz" },
    { name: "Salzburg Airport", iataCode: "SZG", city: "Salzburg" },
    { name: "Innsbruck Airport", iataCode: "INN", city: "Innsbruck" },
    { name: "Linz Airport", iataCode: "LNZ", city: "Linz" },
    { name: "Munich Airport", iataCode: "MUC", city: "Munich" },
    { name: "Frankfurt Airport", iataCode: "FRA", city: "Frankfurt" },
    { name: "Berlin Brandenburg Airport", iataCode: "BER", city: "Berlin" },
    { name: "Zurich Airport", iataCode: "ZRH", city: "Zurich" },
    { name: "Geneva Airport", iataCode: "GVA", city: "Geneva" },
    { name: "Paris Charles de Gaulle", iataCode: "CDG", city: "Paris" },
    { name: "London Heathrow", iataCode: "LHR", city: "London" },
    { name: "Amsterdam Schiphol", iataCode: "AMS", city: "Amsterdam" },
    { name: "Madrid Barajas", iataCode: "MAD", city: "Madrid" },
    { name: "Barcelona El Prat", iataCode: "BCN", city: "Barcelona" },
    { name: "Rome Fiumicino", iataCode: "FCO", city: "Rome" },
    { name: "Milan Malpensa", iataCode: "MXP", city: "Milan" },
    { name: "Copenhagen Airport", iataCode: "CPH", city: "Copenhagen" },
    { name: "Stockholm Arlanda", iataCode: "ARN", city: "Stockholm" },
    { name: "Oslo Gardermoen", iataCode: "OSL", city: "Oslo" },
    { name: "Helsinki Vantaa", iataCode: "HEL", city: "Helsinki" },
    { name: "Brussels Airport", iataCode: "BRU", city: "Brussels" },
    { name: "Prague Vaclav Havel", iataCode: "PRG", city: "Prague" },
    { name: "Budapest Ferenc Liszt", iataCode: "BUD", city: "Budapest" },
    { name: "Warsaw Chopin", iataCode: "WAW", city: "Warsaw" },
    { name: "Lisbon Airport", iataCode: "LIS", city: "Lisbon" },
    { name: "Dublin Airport", iataCode: "DUB", city: "Dublin" },
    { name: "Athens International", iataCode: "ATH", city: "Athens" },
    { name: "Istanbul Airport", iataCode: "IST", city: "Istanbul" },
    { name: "Doha Hamad", iataCode: "DOH", city: "Doha" },
    { name: "Dubai International", iataCode: "DXB", city: "Dubai" },
];
const ensureAirports = realAirports.length;

console.log("🌱 Starting seed...");

// Clean existing data so we don't keep fake airports/flights
const { prisma } = await import("./Repository/db.ts");
await prisma.$executeRaw`DELETE FROM "_FlightToPassenger"`;
await prisma.flight.deleteMany();
await prisma.passenger.deleteMany();
await prisma.airport.deleteMany();
await prisma.plane.deleteMany();

// ensure passengers (no deps)
console.log(`Ensuring ${ensurePassengers} passengers...`);
const passengers_to_create = ensurePassengers - await passengerService.count();
let passengers_created = 0;
while (passengers_created < passengers_to_create) {
    try {
        await passengerService.createPassenger({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
        });
        passengers_created++;
    } catch (e) {
        console.error(`Error creating passenger:`, (e as Error).message);
    }
}
// ensure planes (no deps)
console.log(`Ensuring ${ensurePlanes} planes...`);
const planes_to_create = ensurePlanes - await planeService.count();
if (planes_to_create > 0) {
    const planeData = Array.from({ length: planes_to_create }, () => ({
        model: faker.airline.airplane().name,
        capacity: faker.number.int({ min: 10, max: 850 }),
    }));
    await planeService.createManyPlanes(planeData);
    console.log(`  Created ${planes_to_create} planes`);
}

// ensure airports (no deps, real list)
console.log(`Ensuring ${ensureAirports} airports...`);
let airports_to_create = ensureAirports - await airportService.count();
while (airports_to_create > 0) {
    const fake_airport = faker.airline.airport();
    const airportData = {
        name: fake_airport.name,
        iataCode: fake_airport.iataCode,
        city: faker.location.city(),
    };
    try {
        await airportService.createAirport(airportData);
        airports_to_create--;
    } catch (_e) {
        console.log(`  Skipping duplicate airport: ${airportData.iataCode}`);
    }
    console.log(`  Created airports (duplicates skipped)`);
}

// ensure flights (depends on airport, plane)
console.log(`Ensuring ${ensureFlights} flights...`);
const flights_to_create = ensureFlights - await flightService.count();

// Fetch available airports and planes (once!)
const airports = await airportService.getAll();
const planes = await planeService.getAll();

if (airports.length < 2) {
    console.error("❌ Need at least 2 airports to create flights!");
    Deno.exit(1);
}
if (planes.length === 0) {
    console.error("❌ Need at least 1 plane to create flights!");
    Deno.exit(1);
}

if (flights_to_create > 0) {
    const flightData = Array.from({ length: flights_to_create }, () => {
        const departure = faker.date.soon({ days: 30 });
        const arrival = new Date(departure.getTime() + faker.number.int({ min: 1, max: 12 }) * 3600000);

        const origin = airports[faker.number.int({ min: 0, max: airports.length - 1 })];
        let destination = airports[faker.number.int({ min: 0, max: airports.length - 1 })];
        while (destination.id === origin.id && airports.length > 1) {
            destination = airports[faker.number.int({ min: 0, max: airports.length - 1 })];
        }
        const plane = planes[faker.number.int({ min: 0, max: planes.length - 1 })];

        return {
            flightNumber: `${faker.airline.airline().iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`, // 'AA0798'
            departureTime: departure,
            arrivalTime: arrival,
            originId: origin.id,
            destinationId: destination.id,
            planeId: plane.id,
        };
    });
    await flightService.createManyFlights(flightData);
    console.log(`  Created ${flights_to_create} flights`);
} else {
    console.log(`  No new flights needed, reassigning flight numbers...`);
    await flightService.regenerateAllIds();
}

// assign passengers to flights
console.log("Assigning passengers to flights...");
const allFlights = await flightService.findMany();
const allPassengers = await passengerService.findMany();

console.log(`Found ${allFlights.length} flights and ${allPassengers.length} passengers`);

if (allFlights.length > 0 && allPassengers.length > 0) { // so only do this if we have both
    let assignedCount = 0;
    for (const f of allFlights) {
        // Random number of passengers per flight (0 to 50)
        const numPassengers = faker.number.int({ min: 0, max: Math.min(50, allPassengers.length) });

        // Pick random unique passengers using a Set for uniqueness
        const selectedPassengerIds = new Set<string>();
        let attempts = 0;
        while (selectedPassengerIds.size < numPassengers && attempts < numPassengers * 3) {
            const randomIndex = faker.number.int({ min: 0, max: allPassengers.length - 1 });
            const randomPassenger = allPassengers[randomIndex];
            if (randomPassenger && randomPassenger.id) {
                selectedPassengerIds.add(randomPassenger.id);
            }
            attempts++;
        }

        if (selectedPassengerIds.size > 0) {
            try {
                await flightService.bookPassengersToFlight(f.id, Array.from(selectedPassengerIds));
                assignedCount++;
                if (assignedCount % 100 === 0) {
                    console.log(`  Assigned passengers to ${assignedCount} flights...`);
                }
            } catch (e) {
                console.error(`Error assigning passengers to flight ${f.flightNumber}:`, (e as Error).message);
            }
        }
    }
    console.log(`✅ Assigned passengers to ${assignedCount} flights`);
}

console.log("✅ Seed complete!");
await disconnect();
