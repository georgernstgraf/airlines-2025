import { prisma, type Prisma } from "./db.ts"

// CREATE - Neuen Passagier erstellen
export async function create(data: Prisma.PassengerCreateArgs["data"]) {
    return await prisma.passenger.create({ data });
}

// READ - Passagiere abrufen
// Zählt alle Passagiere
export async function count() {
    return await prisma.passenger.count();
}

// Gibt alle Passagiere zurück
export async function findMany() {
    return await prisma.passenger.findMany();
}

export async function findManyWithFlights() {
    return await prisma.passenger.findMany({
        include: {
            flights: true,
        },
    });
}

export async function findById(id: string) {
    return await prisma.passenger.findUnique({
        where: { id },
        include: {
            flights: true,
        },
    });
}

export async function findByEmail(email: string) {
    return await prisma.passenger.findUnique({
        where: { email },
        include: {
            flights: true,
        },
    });
}

// UPDATE - Passagier aktualisieren
export async function update(id: string, data: Prisma.PassengerUpdateInput) {
    return await prisma.passenger.update({
        where: { id },
        data,
    });
}

// DELETE - Passagier löschen
export async function delete_(id: string) {
    return await prisma.passenger.delete({
        where: { id },
    });
}

// SEARCH - Passagiere suchen
// Sucht Passagiere nach Vor- und Nachname
export async function searchByName(firstName: string, lastName?: string) {
    const where: Prisma.PassengerWhereInput = {
        firstName: {
            contains: firstName,
        },
    };

    if (lastName) {
        where.lastName = {
            contains: lastName,
        };
    }

    return await prisma.passenger.findMany({
        where,
        include: { flights: true },
    });
}

export async function getFlights(passengerId: string) {
    return await prisma.passenger.findUnique({
        where: { id: passengerId },
        select: {
            flights: {
                include: { origin: true, destination: true, plane: true },
                orderBy: { departureTime: "asc" },
            },
        },
    });
}
