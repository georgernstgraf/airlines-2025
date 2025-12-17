import * as passengerRepo from "../Repository/passenger.ts";

export async function createPassenger(data: {
    firstName: string;
    lastName: string;
    email: string;
}) {
    // Business-Logik: Email-Validierung
    if (!data.email.includes("@")) {
        throw new Error("Invalid email format");
    }

    // Delegiere an Repository
    return await passengerRepo.create(data);
}

export async function createManyPassengers(data: Array<{
    firstName: string;
    lastName: string;
    email: string;
}>) {
    // Validiere alle Emails
    for (const passenger of data) {
        if (!passenger.email.includes("@")) {
            throw new Error(`Invalid email format: ${passenger.email}`);
        }
    }

    // Delegiere an Prisma (SQLite unterstützt kein skipDuplicates)
    // Bei Duplikaten wird der gesamte Batch fehlschlagen
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.passenger.createMany({ data });
}

export async function updatePassenger(
    id: string,
    data: Partial<{
        firstName: string;
        lastName: string;
        email: string;
    }>
) {
    // Validiere Email, falls übergeben
    if (data.email && !data.email.includes("@")) {
        throw new Error("Invalid email format");
    }

    const { prisma } = await import("../Repository/db.ts");
    return await prisma.passenger.update({
        where: { id },
        data,
        include: { flights: true }
    });
}

export async function deletePassenger(id: string) {
    const { prisma } = await import("../Repository/db.ts");
    
    // Prüfe ob Passagier noch auf Flügen gebucht ist
    const passengerFlights = await prisma.passenger.findUnique({
        where: { id },
        select: { _count: { select: { flights: true } } }
    });
    
    if ((passengerFlights?._count.flights ?? 0) > 0) {
        throw new Error("Cannot delete passenger with active flight bookings");
    }
    
    return await prisma.passenger.delete({ where: { id } });
}

export async function findPassengerById(id: string) {
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.passenger.findUnique({
        where: { id },
        include: { flights: true }
    });
}

export async function findPassengerByEmail(email: string) {
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.passenger.findUnique({
        where: { email }
    });
}

export async function searchPassengersByName(firstName: string, lastName?: string) {
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.passenger.findMany({
        where: {
            AND: [
                { firstName: { contains: firstName } },
                lastName ? { lastName: { contains: lastName } } : {}
            ]
        },
        include: { flights: true },
        orderBy: [{ lastName: "asc" }, { firstName: "asc" }]
    });
}

export async function getPassengerFlights(passengerId: string) {
    const { prisma } = await import("../Repository/db.ts");
    return await prisma.passenger.findUnique({
        where: { id: passengerId },
        select: {
            flights: {
                include: { origin: true, destination: true, plane: true },
                orderBy: { departureTime: "asc" }
            }
        }
    });
}
