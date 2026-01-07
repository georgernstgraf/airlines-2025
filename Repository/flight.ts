import { Prisma } from "../prisma/client/browser.ts";
import { prisma } from "./db.ts"

// CREATE
export async function create(data: Prisma.FlightCreateArgs["data"]) {
    return await prisma.flight.create({ data });
}

// READ
export async function count() {
    return await prisma.flight.count();
}

export async function findMany() {
    return await prisma.flight.findMany();
}
export async function allIds() {
    const flights = await prisma.flight.findMany({ select: { id: true } });
    return flights.map(f => f.id);
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


// UPDATE
export async function update(id: string, data: Prisma.FlightUpdateInput) {
    return await prisma.flight.update({
        where: { id },
        data
    });
}

// UPDATE

// DELETE
export async function delete_(id: string) {
    return await prisma.flight.delete({
        where: { id }
    });
}
