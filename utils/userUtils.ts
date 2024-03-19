import { OAuth2Client } from "npm:google-auth-library";
import { load } from "https://deno.land/std@0.219.0/dotenv/mod.ts";
import { signal } from "@preact/signals";

export const userEmail = signal<string>;

const env = await load();
const client_id = env["GAUTH_CLIENT_ID"];
export function verifyUserToken(idToken: string) {
  console.log("VERIFYING TOKEN");
  const client = new OAuth2Client();
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken,
      audience:
        "704142127041-13pvqpiajl8bcp2g1jvv99bqt52deiae.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify().catch(console.error);
}

export function setUserEmail(email: string) {
  userEmail.value = email;
}

export function logOut() {
  userEmail.value = "";
}
