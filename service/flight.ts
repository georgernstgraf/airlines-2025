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
export async function regenerateAllIds() {
    const ids = await flightRepo.allIds();
    await Promise.all(ids.map(async (id: string) => {
        const newFlightNumber = `${faker.airline.airline().iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`; // 'AA0798'
        await flightRepo.update(id, { flightNumber: newFlightNumber });
    }));
}

export async function findById(id: string) {
    return await flightRepo.findById(id);
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

    const currentPassengers = flight.passengers?.length || 0;
    
    if (currentPassengers + passengerIds.length > plane.capacity) {
        throw new Error(`Flight capacity exceeded. Current: ${currentPassengers}, Available: ${plane.capacity - currentPassengers}, Requested: ${passengerIds.length}`);
    }

    // Update flight with new passengers
    return await flightRepo.update(flightId, {
        passengers: {
            connect: passengerIds.map(id => ({ id }))
        }
    });
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
    // Delegiere an Repository
    return await flightRepo.delete_(id);
}

export async function findFlightsByOrigin(originId: string) {
    return await flightRepo.findManyWithRelations();
}

export async function findFlightsByDestination(destinationId: string) {
    return await flightRepo.findManyWithRelations();
}

export async function findFlightsByRoute(originId: string, destinationId: string) {
    return await flightRepo.findManyWithRelations();
}