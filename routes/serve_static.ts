import { Hono } from "hono";
import { serveStatic } from "hono/deno";

const app = new Hono();

app.use(
  "/static/*",
  serveStatic({
    root: "./static",
  })
);

app.get("/", (c) => c.text("Hello there :)"));

Deno.serve(app.fetch);