import * as flightRepo from "../Repository/flight.ts";
import * as planeRepo from "../Repository/plane.ts";
import { faker } from "@faker-js/faker";

export async function createFlight(data: {
    flightNumber: string;
    departureTime: Date;
    arrivalTime: Date;
    originId: string;
    destinationId: string;
    planeId: string;
}) {
    // Business-Logik: Validierung
    if (data.departureTime >= data.arrivalTime) {
        throw new Error("Departure time must be before arrival time");
    }

    if (data.originId === data.destinationId) {
        throw new Error("Origin and destination must be different");
    }

    // Delegiere an Repository
    return await flightRepo.create(data);
}

export async function count() {
    return await flightRepo.count();
}

export async function findMany() {
    return await flightRepo.findMany();
}
export async function findManyWithRelations() {
    return await flightRepo.findManyWithRelations();
}

export async function searchFlights(params: {
    departure?: string;
    arrival?: string;
    date?: string;
}) {
    // Get all flights with relations first
    const flights = await flightRepo.findManyWithRelations();

    // Filter by departure city/IATA code
    let filtered = flights;

    if (params.departure) {
        const term = params.departure.toLowerCase();
        filtered = filtered.filter(
            (f) =>
                f.origin.city.toLowerCase().includes(term) ||
                f.origin.iataCode.toLowerCase().includes(term)
        );
    }

    // Filter by arrival city/IATA code
    if (params.arrival) {
        const term = params.arrival.toLowerCase();
        filtered = filtered.filter(
            (f) =>
                f.destination.city.toLowerCase().includes(term) ||
                f.destination.iataCode.toLowerCase().includes(term)
        );
    }

    // Filter by date
    if (params.date) {
        const searchDate = new Date(params.date).toDateString();
        filtered = filtered.filter((f) => new Date(f.departureTime).toDateString() === searchDate);
    }

    // Return top 50 results
    return filtered.slice(0, 50);
}
export async function regenerateAllIds() {
    const ids = await flightRepo.allIds();
    await Promise.all(ids.map(async (id) => {
        const newFlightNumber = `${faker.airline.airline().iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`;
        await flightRepo.update(id, { flightNumber: newFlightNumber });
    }));
}

export async function findById(id: string) {
    return await flightRepo.findById(id);
}

export async function findByFlightNumber(flightNumber: string) {
    return await flightRepo.findByFlightNumber(flightNumber);
}

export async function createManyFlights(data: Array<{
    flightNumber: string;
    departureTime: Date;
    arrivalTime: Date;
    originId: string;
    destinationId: string;
    planeId: string;
}>) {
    // Validiere alle Flights
    for (const flight of data) {
        if (flight.departureTime >= flight.arrivalTime) {
            throw new Error(`Invalid times for flight ${flight.flightNumber}`);
        }
        if (flight.originId === flight.destinationId) {
            throw new Error(`Same origin and destination for flight ${flight.flightNumber}`);
        }
    }

    // Delegiere an Repository
    return await Promise.all(data.map(flight => flightRepo.create(flight)));
}

export async function bookPassengersToFlight(flightId: string, passengerIds: string[]) {
    // Business-Logik: Prüfe ob Flight existiert und Kapazität
    const flight = await flightRepo.findById(flightId);

    if (!flight) {
        throw new Error("Flight not found");
    }

    // Kapazitätsprüfung
    const plane = await planeRepo.getById(flight.planeId);
    if (!plane) {
        throw new Error("Plane not found");
    }
    
    const currentPassengers = await flightRepo.getPassengerCount(flightId);
    
    if (currentPassengers + passengerIds.length > plane.capacity) {
        throw new Error("Flight capacity exceeded");
    }

    return await flightRepo.bookPassengers(flightId, passengerIds);
}

export async function updateFlight(
    id: string,
    data: Partial<{
        flightNumber: string;
        departureTime: Date;
        arrivalTime: Date;
        originId: string;
        destinationId: string;
        planeId: string;
    }>
) {
    // Validiere Zeiten, falls übergeben
    if (data.departureTime || data.arrivalTime) {
        const flight = await flightRepo.findById(id);
        if (!flight) throw new Error("Flight not found");

        const departure = data.departureTime || flight.departureTime;
        const arrival = data.arrivalTime || flight.arrivalTime;

        if (departure >= arrival) {
            throw new Error("Departure time must be before arrival time");
        }
    }

    // Validiere Ursprung != Ziel
    if (data.originId && data.destinationId && data.originId === data.destinationId) {
        throw new Error("Origin and destination must be different");
    }

    return await flightRepo.update(id, data);
}

export async function deleteFlight(id: string) {
    return await flightRepo.delete_(id);
}

export async function getFlightCapacity(id: string) {
    const flight = await flightRepo.findById(id);
    
    if (!flight) {
        throw new Error("Flight not found");
    }

    const plane = await planeRepo.getById(flight.planeId);
    if (!plane) {
        throw new Error("Plane not found");
    }

    const passengerCount = await flightRepo.getPassengerCount(id);
    const capacity = plane.capacity;
    const booked = passengerCount;
    const available = capacity - booked;

    return {
        capacity,
        booked,
        available,
        isFull: available <= 0
    };
}

export async function removePassengerFromFlight(flightId: string, passengerId: string) {
    return await flightRepo.removePassenger(flightId, passengerId);
}

export async function findFlightsByDestination(destinationId: string, limit?: number) {
    return await flightRepo.findByDestination(destinationId, limit);
}

export async function findFlightsByRoute(originId: string, destinationId: string, limit?: number) {
    return await flightRepo.findByRoute(originId, destinationId, limit);
}