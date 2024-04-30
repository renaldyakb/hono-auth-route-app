import { supabase } from "../libs/supabase";
import { Hono } from "hono";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import { sign as signJWT } from "hono/jwt";
import { deleteCookie, setCookie } from "hono/cookie";

const app = new Hono();

const hashPassword = (hash: string) => {
  const salt = genSaltSync(10);
  return hashSync(hash, salt);
};

//SIGN UP
app.post("/signup", async (c) => {
  const { username, password, email } = await c.req.json();
  const hashPass = hashPassword(password);

  const { data, error } = await supabase
    .from("data_user")
    .insert([{ username: username, password: hashPass, email: email }])
    .select();
  if (error) {
    return c.json(error);
  }

  return c.json(data);
});

// SIGN IN
app.post("/signin", async (c) => {
  const { username, password } = await c.req.json();

  const { data, error } = await supabase
    .from("data_user")
    .select("*")
    .eq("username", username);

  if (error) {
    return c.json(error);
  }

  if (data.length === 0) {
    return c.json({
      message: "Username " + username + " " + "Not found",
    });
  }

  const user = data[0];

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    verifyEmail: user.verifyEmail,
    createdAt: user.created_at,
    lastLogin: user.LastLogin,
    exp: Math.floor(Date.now() / 1000) + 60 * 20,
  };

  const match = compareSync(password, user.password);

  const secretKey = Bun.env.JWT_SECRET as string;

  const token = await signJWT(payload, secretKey);

  if (!match) {
    return c.json({ message: "Password salah" });
  } else {
    setCookie(c, "auth_token", token, {
      secure: true,
      httpOnly: true,
    });

    await supabase
      .from("data_user")
      .update({ LastLogin: new Date(Date.now()) })
      .eq("username", username)
      .select();

    return c.json({
      message: "berhasil login",
      data: payload,
      token: token,
    });
  }
});

// SIGN OUT
app.delete("/signout", (c) => {
  deleteCookie(c, "auth_token");
  return c.json({ message: "Logout success" }, 200);
});

export default app;
