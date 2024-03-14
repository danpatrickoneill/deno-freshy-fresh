// import { load } from "https://deno.land/std@0.219.0/dotenv/mod.ts";

// const env = await load();
const client_id = Deno.env.get("GAUTH_CLIENT_ID");

function handleCredentialResponse(googleUser: any) {
  // Useful data for your client-side scripts:
  const profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log("Full Name: " + profile.getName());
  console.log("Given Name: " + profile.getGivenName());
  console.log("Family Name: " + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  const id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}

export function Nav(props: object) {
  return (
    <html>
      <div className="nav-container bg-[#577590] col-span-1 row-span-3 flex flex-col justify-around">
        <body>
          <script src="https://accounts.google.com/gsi/client" async defer>
          </script>
          <div
            id="g_id_onload"
            data-client_id={client_id}
            data-callback="handleCredentialResponse"
          >
          </div>
          <div class="g_id_signin" data-type="standard"></div>
          <a href="/timesheets/today">Timesheets</a>
        </body>

        <a href="/timesheets/today">Timesheets</a>
        <a href="/timesheets/today">Timesheets</a>
        <a href="/timesheets/today">Timesheets</a>
        <a href="/timesheets/today">Timesheets</a>
      </div>
    </html>
  );
}
