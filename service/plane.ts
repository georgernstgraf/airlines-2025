import * as planeRepo from "../Repository/plane.ts";

export async function createPlane(data: {
    model: string;
    capacity: number;
}) {
    // Business-Logik: Validierung
    if (data.capacity <= 0) {
        throw new Error("Plane capacity must be positive");
    }

    if (data.capacity > 1000) {
        throw new Error("Plane capacity exceeds maximum (1000)");
    }

    // Delegiere an Repository
    return await planeRepo.create(data);
}

export async function count() {
    return await planeRepo.count();
}
export async function createManyPlanes(data: Array<{
    model: string;
    capacity: number;
}>) {
    // Validiere alle Kapazitäten
    for (const plane of data) {
        if (plane.capacity <= 0 || plane.capacity > 1000) {
            throw new Error(`Invalid capacity: ${plane.capacity}`);
        }
    }

    // Delegiere an Prisma
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.plane.createMany({ data });
}

export async function updatePlane(
    id: string,
    data: Partial<{
        model: string;
        capacity: number;
    }>
) {
    // Validiere Kapazität, falls übergeben
    if (data.capacity !== undefined) {
        if (data.capacity <= 0 || data.capacity > 1000) {
            throw new Error("Plane capacity must be between 1 and 1000");
        }
    }

    const { prisma } = await import("../Repository/db.ts");
    return await prisma.plane.update({
        where: { id },
        data,
        include: { flights: { select: { id: true, flightNumber: true } } }
    });
}

export async function deletePlane(id: string) {
    const { prisma } = await import("../Repository/db.ts");

    // Prüfe ob noch Flüge mit diesem Flugzeug existieren
    const flightCount = await prisma.plane.findUnique({
        where: { id },
        select: { _count: { select: { flights: true } } }
    });

    if ((flightCount?._count.flights ?? 0) > 0) {
        throw new Error("Cannot delete plane with assigned flights");
    }

    return await prisma.plane.delete({ where: { id } });
}

export async function findPlaneById(id: string) {
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.plane.findUnique({
        where: { id },
        include: { flights: { select: { id: true, flightNumber: true, departureTime: true } } }
    });
}

export async function getAll() {
    return await planeRepo.getAll();
}
export async function findPlanesByModel(model: string) {
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.plane.findMany({
        where: { model: { contains: model } },
        include: { _count: { select: { flights: true } } }
    });
}

export async function getPlaneStatistics(id: string) {
    const { prisma } = await import("../Repository/db.ts");
    const plane = await prisma.plane.findUnique({
        where: { id },
        include: {
            flights: {
                select: {
                    id: true,
                    _count: { select: { passengers: true } }
                }
            }
        }
    });

    if (!plane) throw new Error("Plane not found");

    const totalFlights = plane.flights.length;
    const totalPassengers = plane.flights.reduce((sum, f) => sum + (f._count?.passengers ?? 0), 0);
    const avgPassengersPerFlight = totalFlights > 0 ? totalPassengers / totalFlights : 0;
    const utilizationRate = totalFlights > 0
        ? (totalPassengers / (plane.capacity * totalFlights)) * 100
        : 0;

    return {
        id: plane.id,
        model: plane.model,
        capacity: plane.capacity,
        totalFlights,
        totalPassengers,
        avgPassengersPerFlight: Math.round(avgPassengersPerFlight * 100) / 100,
        utilizationRate: Math.round(utilizationRate * 100) / 100
    };
}
