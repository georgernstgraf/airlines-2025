import { Prisma } from "../prisma/client/client.ts";
import { prisma } from "./db.ts"

// CREATE - Neuen Flug erstellen
export async function create(data: Prisma.FlightCreateArgs["data"]) {
    return await prisma.flight.create({ data });
}

// READ - Flüge abrufen
// Zählt alle Flüge
export async function count() {
    return await prisma.flight.count();
}

// Gibt alle Flüge zurück
export async function findMany() {
    return await prisma.flight.findMany();
}

export async function findManyWithRelations() {
    return await prisma.flight.findMany({
        include: {
            passengers: true,
            plane: true,
            origin: true,
            destination: true,
        }
    });
}

export async function findById(id: string) {
    return await prisma.flight.findUnique({
        where: { id },
        include: {
            passengers: true,
            plane: true,
            origin: true,
            destination: true,
        }
    });
}

export async function findByFlightNumber(flightNumber: string) {
    return await prisma.flight.findFirst({
        where: { flightNumber },
        include: {
            passengers: true,
            plane: true,
            origin: true,
            destination: true,
        }
    });
}


// UPDATE - Flug aktualisieren
export async function update(id: string, data: Prisma.FlightUpdateInput) {
    return await prisma.flight.update({
        where: { id },
        data
    });
}

// DELETE - Flug löschen
export async function delete_(id: string) {
    return await prisma.flight.delete({
        where: { id }
    });
}

// HELPER FUNCTIONS - Hilfsfunktionen
// Gibt alle Flug-IDs zurück
export async function allIds() {
    const flights = await prisma.flight.findMany({
        select: { id: true }
    });
    return flights.map(f => f.id);
}

export async function getPassengerCount(id: string) {
    const flight = await prisma.flight.findUnique({
        where: { id },
        select: { passengers: { select: { id: true } } }
    });
    return flight?.passengers.length ?? 0;
}

export async function bookPassengers(flightId: string, passengerIds: string[]) {
    return await prisma.flight.update({
        where: { id: flightId },
        data: {
            passengers: {
                connect: passengerIds.map(id => ({ id }))
            }
        },
        include: { passengers: true }
    });
}

export async function removePassenger(flightId: string, passengerId: string) {
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

export async function findByDestination(destinationId: string, limit?: number) {
    return await prisma.flight.findMany({
        where: { destinationId },
        include: { origin: true, destination: true, plane: true, passengers: true },
        take: limit,
        orderBy: { departureTime: "asc" }
    });
}

export async function findByRoute(originId: string, destinationId: string, limit?: number) {
    return await prisma.flight.findMany({
        where: {
            originId,
            destinationId
        },
        include: { origin: true, destination: true, plane: true, passengers: true },
        take: limit,
        orderBy: { departureTime: "asc" }
    });
}
