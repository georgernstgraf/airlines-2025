import { prisma } from "../Repository/db.ts";

const a = await prisma.airport.count();
const p = await prisma.plane.count();
const f = await prisma.flight.count();
const g = await prisma.passenger.count();

console.log(JSON.stringify({ airports: a, planes: p, flights: f, passengers: g }));

await prisma.$disconnect();
