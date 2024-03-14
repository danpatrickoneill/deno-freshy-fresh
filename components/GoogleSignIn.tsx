import { load } from "https://deno.land/std@0.219.0/dotenv/mod.ts";

globalThis.handleCredentialResponse = (googleUser: any) => {
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
};
const env = await load();

export function GoogleSignIn(props: object) {
  const client_id = env["GAUTH_CLIENT_ID"];
  console.log(22, client_id);
  console.log("I'm here!");
  return (
    <>
      <div
        id="g_id_onload"
        data-client_id={client_id}
        data-callback="handleCredentialResponse"
      >
      </div>
      <div class="g_id_signin" data-type="standard"></div>
    </>
  );
}
