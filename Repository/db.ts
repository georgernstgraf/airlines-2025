// Prisma Client - Datenbankverbindung
import { PrismaClient, Prisma, Flight, Passenger, Plane, Airport } from "model";

// Globale Prisma-Instanz
export const prisma = new PrismaClient();
export type { Prisma, Flight, Passenger, Plane, Airport };

// Trennt die Datenbankverbindung
export async function disconnect() {
    await prisma.$disconnect();
    console.log("Disconnected from database");
}
