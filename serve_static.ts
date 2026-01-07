import { Hono } from "hono";
import { serveStatic } from "hono/deno";

const app = new Hono();

app.use(
    "/static/*",
    serveStatic({
        root: "./static",
    })
);

Deno.serve(app.fetch);