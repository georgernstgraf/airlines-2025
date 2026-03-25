import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/deno";
import * as passengerService from "./service/passenger.ts";
import * as planeService from "./service/plane.ts";
import * as airportService from "./service/airport.ts";
import * as flightService from "./service/flight.ts";

const app = new Hono();
app.use("/*", cors());

app.get("/", (c) => c.json({ message: "Flight API", version: "1.0" }));

app.use("/*", serveStatic({ root: "./static" }));

// Passengers
app.get("/passengers", async (c) => c.json(await passengerService.findMany()));
app.post("/passengers", async (c) => {
    try {
        return c.json(await passengerService.createPassenger(await c.req.json()), 201);
    } catch (e) {
        return c.json({ error: (e as Error).message }, 400);
    }
});

// Planes
app.get("/planes", async (c) => c.json(await planeService.getAll()));
app.post("/planes", async (c) => {
    try {
        return c.json(await planeService.createPlane(await c.req.json()), 201);
    } catch (e) {
        return c.json({ error: (e as Error).message }, 400);
    }
});

// Airports
app.get("/airports", async (c) => c.json(await airportService.getAllAirports()));
app.post("/airports", async (c) => {
    try {
        return c.json(await airportService.createAirport(await c.req.json()), 201);
    } catch (e) {
        return c.json({ error: (e as Error).message }, 400);
    }
});

// Flights
app.get("/flights", async (c) => {
    const include = c.req.query("include");
    if (include === "relations") {
        return c.json(await flightService.findManyWithRelations());
    }
    return c.json(await flightService.findMany());
});

app.get("/flights/:id", async (c) => {
    const flight = await flightService.findById(c.req.param("id"));
    if (!flight) return c.json({ error: "Flight not found" }, 404);
    return c.json(flight);
});

app.post("/flights", async (c) => {
    try {
        return c.json(await flightService.createFlight(await c.req.json()), 201);
    } catch (e) {
        return c.json({ error: (e as Error).message }, 400);
    }
});

app.post("/flights/:id/passengers", async (c) => {
    try {
        const { passengerIds } = await c.req.json();
        return c.json(await flightService.bookPassengersToFlight(c.req.param("id"), passengerIds));
    } catch (e) {
        return c.json({ error: (e as Error).message }, 400);
    }
});

function getPreferredPort() {
    const rawPort = Deno.env.get("PORT");
    const parsed = Number(rawPort);
    if (Number.isInteger(parsed) && parsed > 0 && parsed < 65536) {
        return parsed;
    }
    return 3000;
}

const preferredPort = getPreferredPort();
let activePort = preferredPort;

for (let offset = 0; offset <= 10; offset++) {
    const candidatePort = preferredPort + offset;
    try {
        Deno.serve({ port: candidatePort }, app.fetch);
        activePort = candidatePort;
        break;
    } catch (e) {
        if (!(e instanceof Deno.errors.AddrInUse) || offset === 10) {
            throw e;
        }
    }
}

if (activePort !== preferredPort) {
    console.warn(`Port ${preferredPort} belegt, starte stattdessen auf Port ${activePort}.`);
}
console.log(`🚀 http://localhost:${activePort}`);
