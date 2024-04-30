import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

const user = new Hono();

// Middleware
user.use("/*", async (_, next) => {
  try {
    const token = getCookie(_, "auth_token");
    const secretKey = Bun.env.JWT_SECRET as string;

    if (!token) {
      return _.json({ message: "token not found" }, 404);
    }

    const payload = await verify(token, secretKey);

    if (!payload) {
      return _.json({ message: "token expired" }, 401);
    }
    await next();
  } catch (error) {
    return _.json({ message: "Unauthorized" }, 401);
  }
});

user.get("/user", (c) => {
  return c.json({ message: "login success" });
});

export default user;
