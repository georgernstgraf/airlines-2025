import { Prisma } from "../prisma/client/browser.ts";
import { prisma } from "./db.ts"

// CREATE
export async function create(data: Prisma.AirportCreateArgs["data"]) {
    return await prisma.airport.create({ data });
}

// READ
export async function count() {
    return await prisma.airport.count();
}

export async function getAll() {
    return await prisma.airport.findMany();
}

export async function getById(id: string) {
    return await prisma.airport.findUnique({
        where: { id },
        include: {
            departingFlights: true,
            arrivingFlights: true,
        }
    });
}

export async function getByIataCode(iataCode: string) {
    return await prisma.airport.findUnique({
        where: { iataCode },
        include: {
            departingFlights: true,
            arrivingFlights: true,
        }
    });
}

// UPDATE
export async function update(id: string, data: Prisma.AirportUpdateInput) {
    return await prisma.airport.update({
        where: { id },
        data
    });
}

// DELETE
export async function delete_(id: string) {
    return await prisma.airport.delete({
        where: { id }
    });
}

// SEARCH
export async function searchByCity(city: string) {
    return await prisma.airport.findMany({
        where: {
            city: {
                contains: city,
                mode: "insensitive"
            }
        }
    });
}

export async function findById(id: string) {
    return await prisma.airport.findUnique({
        where: { id },
        include: {
            departingFlights: true,
            arrivingFlights: true,
        }
    });
}