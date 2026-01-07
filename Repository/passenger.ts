// nur mit diesem Objekt in die Datenbank greifen
import { Prisma } from "../prisma/client/browser.ts";
import { prisma } from "./db.ts"

// CREATE
export async function create(data: Prisma.PassengerCreateArgs["data"]) {
    return await prisma.passenger.create({ data });
}

// READ
export async function count() {
    return await prisma.passenger.count();
}

export async function findMany() {
    return await prisma.passenger.findMany();
}

export async function findManyWithFlights() {
    return await prisma.passenger.findMany({
        include: {
            flights: true,
        }
    });
}

export async function findById(id: string) {
    return await prisma.passenger.findUnique({
        where: { id },
        include: {
            flights: true,
        }
    });
}

export async function findByEmail(email: string) {
    return await prisma.passenger.findUnique({
        where: { email },
        include: {
            flights: true,
        }
    });
}

// UPDATE
export async function update(id: string, data: Prisma.PassengerUpdateInput) {
    return await prisma.passenger.update({
        where: { id },
        data
    });
}

// DELETE
export async function delete_(id: string) {
    return await prisma.passenger.delete({
        where: { id }
    });
}
