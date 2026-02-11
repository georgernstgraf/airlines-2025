import { Hono } from "hono";
import { serveStatic } from "hono/deno";

const app = new Hono();

app.use(
    "/*",
    serveStatic({
        root: "./",
    })
);

Deno.serve({ port: 3001 }, app.fetch);