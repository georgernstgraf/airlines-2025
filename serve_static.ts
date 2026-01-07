import { Hono } from "hono";
import { serveStatic } from "hono/deno";

const app = new Hono();

app.use(
    "/*",
    serveStatic({
        root: "./",
    }),
    (c, next) => {
        console.log("Static files served");
        return next();
    }
);

Deno.serve(app.fetch);