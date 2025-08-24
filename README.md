# Simple JWT Auth by [@renaldyakb](https://github.com/renaldyakb) using [Hono App](http://hono.dev/ "Hono.dev")
### Introduction

This my a few examples project to route some endpoint using my own middleware using [```#verfify```](https://hono.dev/helpers/jwt#verify) JWT from cookie store, I'm using [Bun runtime](https://bun.sh/) & [Supabase Database](https://supabase.com/)


### Endpoints Methods: 


```json
POST    /api/v1/auth/signup
POST    /api/v1/auth/signin 
DELETE  /api/v1/auth/signout

// protected route
GET     /api/v1/protect/user
```
-----

## Before started
It's a good idea before starting, install some dependencies first, because I use bun I will run it in the terminal in my directory folder with the command:

```
bun install 
```

and set environment variables :
```ts
SUPABASE_URL=<your_supabase_url>
SUPABASE_KEY=<your_supabase_>
JWT_SECRET=secretkey123
```

## Explained

- #### POST  &bull;  `/api/v1/auth/signup`

    is to make new user to 

    request body (JSON) :

```json
{
    "username"  : "yourUsername",
    "password"  : "yourPassword",
    "email"     : "yourEmail@example.com",
}
```
------

- #### POST  &bull;  `/api/v1/auth/signin`


    to enter the application (basically), and save a `cookie` in the browser with the name `auth_token`

    request body (JSON)

```json
{
    "username"  : "yourUsername",
    "password"  : "yourPassword",
}
```

----

- #### DELETE  &bull;  `/api/v1/auth/signin`


    To sign out is actually very simple, I just delete `cookies` in the browser with a function like the following

```typescript
import { deleteCookie } from "hono/cookie";

deleteCookie(c, "auth_token");
```

----
    
- #### GET  &bull;  `/api/v1/protect/user`


    The most crucial part is that I only authenticate using the JWT token which is already in the `cookie` with the key `"auth_token"`



----

## Contribute
I am very happy to be in the hono community and I hope I can also improve or improvise my example project, if there is input from all of you I would be very grateful, cheers 🥂


**[Instagram](https://www.instagram.com/renaldyakbar_/)** / **[LinkedIn](https://www.linkedin.com/in/renaldy-akbar-98aa41275/)**
