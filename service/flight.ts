import * as flightRepo from "../Repository/flight.ts";
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
    await Promise.all(ids.map(async (id) => {
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

    // Delegiere an Prisma
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.flight.createMany({ data });
}

export async function bookPassengersToFlight(flightId: string, passengerIds: string[]) {
    // Business-Logik: Prüfe ob Flight existiert und Kapazität
    const flight = await flightRepo.findById(flightId);

    if (!flight) {
        throw new Error("Flight not found");
    }

    // Kapazitätsprüfung
    const plane = await planeRepo.findById(flight.planeId);
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
    const { prisma } = await import("../Repository/db.ts");

    // Prüfe ob Passagiere gebucht sind
    const passengersCount = await prisma.flight.findUnique({
        where: { id },
    return await flightRepo.delete(id

    const { prisma } = await import("../Repository/db.ts");
    const passengerCount = await prisma.flight.findUnique({
        where: { id: flightId },
        select: { _count: { select: { passengers: true } } }
    });

    const capacity = flight.plane.capacity;
    const booked = passengerCount?._count.passengers ?? 0;
    const available = capacity - booked;

    return {
        capacity,
        booked,
        available,
        isFull: available <= 0
    };
}

export async function removePassengerFromFlight(flightId: string, passengerId: string) {
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.flight.update({
        where: { id: flightId },
        data: {
            passengers: {
                disconnect: { id: passengerId }
            }
        },
        include: { passengers: true }
    });
}

exporeturn await flightRepo.removePassenger(flightId, passengerId
export async function findFlightsByDestination(destinationId: string, limit?: number) {
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.flight.findMany({
        where: { destinationId },
        include: { origin: true, destination: true, plane: true },
        take: limit,
        orderBy: { departureTime: "asc" }
    });
}

exporeturn await flightRepo.findByDestination(destinationId, limit);
}
return await flightRepo.findByRoute(originId, destinationId, limit