// Prisma Client - Datenbankverbindung
import { PrismaClient } from "../prisma/client/client.ts";

// Globale Prisma-Instanz
export const prisma = new PrismaClient();

// Trennt die Datenbankverbindung
export async function disconnect() {
    await prisma.$disconnect();
    console.log("Disconnected from database");
}