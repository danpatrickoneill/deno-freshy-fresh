/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";

if (!Deno.env.get("BASE_URL")) {
  Deno.env.set("BASE_URL", "https://danoneill.online");
}
console.log(
  "STARTING MAIN ENVIRONMENT. BASE_URL IS: ",
  Deno.env.get("BASE_URL"),
);

await start(manifest, config);
