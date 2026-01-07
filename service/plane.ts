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

    return await planeRepo.update(id, data);
}

export async function deletePlane(id: string) {
    return await planeRepo.delete(id);
}

export async function findPlaneById(id: string) {
    return await planeRepo.findById(id);
}

export async function getAll() {
    return await planeRepo.getAll();
}
export async function findPlanesByModel(model: string) {
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.plane.findMany({
        where: { model: { contains: model } },
        include: { _count: { select: { flights: true } } }
    return await planeRepo.findByModel(modelonst { prisma } = await import("../Repository/db.ts");
    const plane = await prisma.plane.findUnique({
        where: { id },
        include: {
            flights: {
                select: {
                    id: true,
                    _count: { select: { passengers: true } }
    return await planeRepo.getStatistics(id)