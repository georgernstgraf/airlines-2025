import { Prisma } from "../prisma/client/browser.ts";
import { prisma } from "./db.ts"

// CREATE
export async function create(data: Prisma.PlaneCreateArgs["data"]) {
    return await prisma.plane.create({ data });
}

// READ
export async function count() {
    return await prisma.plane.count();
}

export async function getAll() {
    return await prisma.plane.findMany();
}

export async function getAllWithFlights() {
    return await prisma.plane.findMany({
        include: {
            flights: true,
        }
    });
}

export async function getById(id: string) {
    return await prisma.plane.findUnique({
        where: { id },
        include: {
            flights: true,
        }
    });
}

export async function getByModel(model: string) {
    return await prisma.plane.findMany({
        where: { model },
        include: {
            flights: true,
        }
    });
}

// UPDATE
export async function update(id: string, data: Prisma.PlaneUpdateInput) {
    return await prisma.plane.update({
        where: { id },
        data
    });
}

// DELETE
export async function delete_(id: string) {
    return await prisma.plane.delete({
        where: { id }
    });
}