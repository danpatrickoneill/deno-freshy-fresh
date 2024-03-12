import { load } from "https://deno.land/std@0.219.0/dotenv/mod.ts";

const env = await load();
const client_id = env["GAUTH_CLIENT_ID"];

export function Nav(props: object) {
  return (
    <>
      <head>
        <script src="https://apis.google.com/js/platform.js" async defer>
        </script>
        <meta
          name="google-signin-client_id"
          content={client_id}
        >
        </meta>
      </head>
      <div className="nav-container bg-[#577590] col-span-1 row-span-3 flex flex-col justify-around">
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
        <a href="/timesheets/today">Timesheets</a>
        <a href="/timesheets/today">Timesheets</a>
        <a href="/timesheets/today">Timesheets</a>
        <a href="/timesheets/today">Timesheets</a>
        <a href="/timesheets/today">Timesheets</a>
      </div>
    </>
  );
}
