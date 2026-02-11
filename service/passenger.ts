import * as passengerRepo from "../Repository/passenger.ts";

export async function createPassenger(data: {
    firstName: string;
    lastName: string;
    email: string;
}) {
    // Business-Logik: Email-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        throw new Error("Invalid email format");
    }

    // Delegiere an Repository
    return await passengerRepo.create(data);
}

export async function findMany() {
    return await passengerRepo.findMany();
}
export async function createManyPassengers(data: Array<{
    firstName: string;
    lastName: string;
    email: string;
}>) {
    // Validiere alle Emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const passenger of data) {
        if (!emailRegex.test(passenger.email)) {
            throw new Error(`Invalid email format: ${passenger.email}`);
        }
    }

    // Delegiere an Repository
    return Promise.all(data.map(passenger => passengerRepo.create(passenger)));
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
    if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            throw new Error("Invalid email format");
        }
    }

    return await passengerRepo.update(id, data);
}

export async function count() {
    return await passengerRepo.count();
}
export async function deletePassenger(id: string) {
    return await passengerRepo.delete_(id);
}

export async function findPassengerById(id: string) {
    return await passengerRepo.findById(id);
}

export async function findPassengerByEmail(email: string) {
    return await passengerRepo.findByEmail(email);
}

export async function findPassengerWithFlights(id: string) {
    return await passengerRepo.findById(id);
}