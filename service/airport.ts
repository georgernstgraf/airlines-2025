import * as airportRepo from "../Repository/airport.ts";

export async function createAirport(data: {
    name: string;
    iataCode: string;
    city: string;
}) {
    // Business-Logik: IATA Code Validierung
    if (data.iataCode.length !== 3) {
        throw new Error("IATA code must be exactly 3 characters");
    }

    if (!/^[A-Z]{3}$/.test(data.iataCode)) {
        throw new Error("IATA code must contain only uppercase letters");
    }

    // Delegiere an Repository
    return await airportRepo.create(data);
}

export async function createManyAirports(data: Array<{
    name: string;
    iataCode: string;
    city: string;
}>) {
    // Validiere alle IATA Codes
    for (const airport of data) {
        if (airport.iataCode.length !== 3 || !/^[A-Z]{3}$/.test(airport.iataCode)) {
            throw new Error(`Invalid IATA code: ${airport.iataCode}`);
        }
    }

    // Delegiere an Prisma (SQLite unterstützt kein skipDuplicates)
    // Bei Duplikaten wird der gesamte Batch fehlschlagen
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.airport.createMany({ data });
}

export async function updateAirport(
    id: string,
    data: Partial<{
        name: string;
        iataCode: string;
        city: string;
    }>
) {
    // Validiere IATA Code, falls übergeben
    if (data.iataCode) {
        if (data.iataCode.length !== 3 || !/^[A-Z]{3}$/.test(data.iataCode)) {
            throw new Error("IATA code must be exactly 3 uppercase letters");
        }
    }

    const { prisma } = await import("../Repository/db.ts");
    return await prisma.airport.update({
        where: { id },
        data
    });
}

export async function deleteAirport(id: string) {
    const { prisma } = await import("../Repository/db.ts");
    
    // Prüfe ob es noch Flüge gibt, die diesen Airport nutzen
    const flightCount = await prisma.flight.count({
        where: {
            OR: [
                { originId: id },
                { destinationId: id }
            ]
        }
    });
    
    if (flightCount > 0) {
        throw new Error("Cannot delete airport with active flights");
    }
    
    return await prisma.airport.delete({
        where: { id }
    });
}

export async function findAirportById(id: string) {
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.airport.findUnique({
        where: { id },
        include: {
            departingFlights: true,
            arrivingFlights: true
        }
    });
}

export async function findAirportByIataCode(iataCode: string) {
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.airport.findUnique({
        where: { iataCode }
    });
}

export async function searchAirportsByCity(city: string) {
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.airport.findMany({
        where: {
            city: {
                contains: city
            }
        },
        orderBy: { name: "asc" }
    });
}

export { count, getAll } from "../Repository/airport.ts";
