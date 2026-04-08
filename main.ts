import { Hono } from 'hono';
import type { Context } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/deno';
import * as passengerService from "./service/passenger.ts";
import * as planeService from "./service/plane.ts";
import * as airportService from "./service/airport.ts";
import * as flightService from "./service/flight.ts";
import * as bookingService from "./service/booking.ts";

const app = new Hono();
const api = new Hono();
app.use("/*", cors());

const serveFile = async (c: Context, path: string, contentType: string) => {
    try {
        const file = await Deno.readFile(path);
        return c.body(file, 200, { "Content-Type": contentType });
    } catch {
        return c.text("Not found", 404);
    }
};

api.get('/', (c) => c.json({ message: 'Flight API', version: '1.0' }));
api.get('/health', (c) => c.json({ status: 'ok' }));

// Passengers
api.get("/passengers", async (c) => c.json(await passengerService.findMany()));
api.post("/passengers", async (c) => {
    try {
        return c.json(await passengerService.createPassenger(await c.req.json()), 201);
    } catch (e) {
        return c.json({ error: (e as Error).message }, 400);
    }
});

// Planes
api.get("/planes", async (c) => c.json(await planeService.getAll()));
api.post("/planes", async (c) => {
    try {
        return c.json(await planeService.createPlane(await c.req.json()), 201);
    } catch (e) {
        return c.json({ error: (e as Error).message }, 400);
    }
});

// Airports
api.get("/airports", async (c) => c.json(await airportService.getAllAirports()));
api.post("/airports", async (c) => {
    try {
        return c.json(await airportService.createAirport(await c.req.json()), 201);
    } catch (e) {
        return c.json({ error: (e as Error).message }, 400);
    }
});

// Flights
api.get("/flights", async (c) => {
    const include = c.req.query("include");
    if (include === "relations") {
        return c.json(await flightService.findManyWithRelations());
    }
    return c.json(await flightService.findMany());
});

api.get("/flights/search", async (c) => {
    try {
        const departure = c.req.query("departure");
        const arrival = c.req.query("arrival");
        const date = c.req.query("date");

        return c.json(
            await flightService.searchFlights({
                departure,
                arrival,
                date,
            })
        );
    } catch (e) {
        return c.json({ error: (e as Error).message }, 400);
    }
});

api.get("/flights/:id", async (c) => {
    const flight = await flightService.findById(c.req.param("id"));
    if (!flight) return c.json({ error: "Flight not found" }, 404);
    return c.json(flight);
});

api.post("/flights", async (c) => {
    try {
        return c.json(await flightService.createFlight(await c.req.json()), 201);
    } catch (e) {
        return c.json({ error: (e as Error).message }, 400);
    }
});

api.post("/flights/:id/passengers", async (c) => {
    try {
        const { passengerIds } = await c.req.json();
        return c.json(await flightService.bookPassengersToFlight(c.req.param("id"), passengerIds));
    } catch (e) {
        return c.json({ error: (e as Error).message }, 400);
    }
});

api.post("/bookings", async (c) => {
    try {
        const data = await c.req.json();
        return c.json(await bookingService.createBooking(data), 201);
    } catch (e) {
        return c.json({ error: (e as Error).message }, 400);
    }
});

app.route("/api", api);

// Redirect legacy static entry points to SPA routes.
app.get('/index.html', (c) => c.redirect('/', 301));
app.get('/searchfly.html', (c) => c.redirect('/search', 301));
app.get('/bookfly.html', (c) => c.redirect('/book', 301));

// Serve built SPA assets from dist/client (e.g. /assets/*).
app.use('/assets/*', serveStatic({ root: './dist/client' }));
app.get('/favicon.ico', serveStatic({ root: './dist/client' }));
app.get('/vite.svg', serveStatic({ root: './dist/client' }));

// SPA fallback for Vue Router history mode. Keep this after API routes.
app.get('*', async (c) => {
    if (c.req.path.startsWith('/api')) {
        return c.notFound();
    }
    return serveFile(c, './dist/client/index.html', 'text/html; charset=utf-8');
});

Deno.serve({ port: 3000 }, app.fetch);
console.log("🚀 http://localhost:3000");
