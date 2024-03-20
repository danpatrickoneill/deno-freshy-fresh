#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";
Deno.env.set("BASE_URL", "http://localhost:8000");
console.log(
  "STARTING DEV ENVIRONMENT. BASE_URL IS: ",
  Deno.env.get("BASE_URL"),
);
await dev(import.meta.url, "./main.ts", config);
