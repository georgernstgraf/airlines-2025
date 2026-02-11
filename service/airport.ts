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

export async function createManyAirports(
    data: Array<{
        name: string;
        iataCode: string;
        city: string;
    }>,
) {
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
    }>,
) {
    // Validiere IATA Code, falls übergeben
    if (data.iataCode) {
        if (data.iataCode.length !== 3 || !/^[A-Z]{3}$/.test(data.iataCode)) {
            throw new Error("IATA code must be exactly 3 uppercase letters");
        }
    }

    return await airportRepo.update(id, data);
}

export async function deleteAirport(id: string) {
    return await airportRepo.delete_(id);
}

export async function findAirportById(id: string) {
    return await airportRepo.findById(id);
}

export async function findAirportByIataCode(iataCode: string) {
    return await airportRepo.getByIataCode(iataCode);
}

export async function searchAirportsByCity(city: string) {
    return await airportRepo.searchByCity(city);
}

export async function getAirportCount() {
    return await airportRepo.count();
}

export async function getAllAirports() {
    return await airportRepo.getAll();
}
