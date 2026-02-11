import { Prisma } from "../prisma/client/client.ts";
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

// SEARCH & STATISTICS
export async function findByModel(model: string) {
    return await prisma.plane.findMany({
        where: {
            model: {
                contains: model
            }
        },
        include: {
            _count: { select: { flights: true } }
        }
    });
}

export async function getStatistics(id: string) {
    const plane = await prisma.plane.findUnique({
        where: { id },
        include: {
            flights: {
                select: {
                    id: true,
                    passengers: { select: { id: true } }
                }
            }
        }
    });

    if (!plane) {
        return null;
    }

    const totalPassengers = plane.flights.reduce((sum, flight) => sum + flight.passengers.length, 0);
    const averagePassengersPerFlight = plane.flights.length > 0 ? totalPassengers / plane.flights.length : 0;

    return {
        id: plane.id,
        model: plane.model,
        capacity: plane.capacity,
        totalFlights: plane.flights.length,
        totalPassengers,
        averagePassengersPerFlight,
        utilization: ((totalPassengers / (plane.capacity * plane.flights.length)) * 100).toFixed(2) + "%"
    };
}