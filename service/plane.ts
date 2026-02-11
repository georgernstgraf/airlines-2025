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

export async function createManyPlanes(
    data: Array<{
        model: string;
        capacity: number;
    }>,
) {
    // Validiere alle Kapazitäten
    for (const plane of data) {
        if (plane.capacity <= 0 || plane.capacity > 1000) {
            throw new Error(`Invalid capacity: ${plane.capacity}`);
        }
    }

    // Delegiere an Repository
    return await Promise.all(data.map((plane) => planeRepo.create(plane)));
}

export async function updatePlane(
    id: string,
    data: Partial<{
        model: string;
        capacity: number;
    }>,
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
    return await planeRepo.delete_(id);
}

export async function findPlaneById(id: string) {
    return await planeRepo.getById(id);
}

export async function getAll() {
    return await planeRepo.getAll();
}

export async function getAllWithFlights() {
    return await planeRepo.getAllWithFlights();
}

export async function findPlanesByModel(model: string) {
    return await planeRepo.findByModel(model);
}

export async function getPlaneStatistics(id: string) {
    return await planeRepo.getStatistics(id);
}
