import { Hono } from "hono";
import auth from "./routes/auth";
import user from "./routes/user";
import { showRoutes } from "hono/dev";

const app = new Hono().basePath("/api/v1");

app.route("/auth", auth);
app.route("/protect", user);

showRoutes(app);

export default app;
