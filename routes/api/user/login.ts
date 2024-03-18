import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { google } from "npm:googleapis";
import { load } from "https://deno.land/std@0.219.0/dotenv/mod.ts";

//  User has a timesheet dict with dateString format keys and timesheet IDs; then handle lookup
//  Can cache ID permanently and events refreshed on demand
export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    console.log("HEY!");
    console.log(req, req.url);

    const env = await load();
    const client_id = env["GAUTH_CLIENT_ID"];
    const client_secret = env["GAUTH_CLIENT_SECRET"];
    const redirect_url = "http://localhost:8000/api/user/handleLogin";
    /**
     * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
     * from the client_secret.json file. To get these credentials for your application, visit
     * https://console.cloud.google.com/apis/credentials.
     */
    const oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_url,
    );

    // Access scopes for read-only Drive activity.
    const scopes = [
      "https://www.googleapis.com/auth/user.emails.read",
      // "https://www.googleapis.com/auth/contacts.readonly",
    ];

    // Generate a url that asks permissions for the Drive activity scope
    const authorizationUrl = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",
      /** Pass in the scopes array defined above.
       * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
      scope: scopes,
      // Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes: true,
    });
    console.log(41, authorizationUrl);
    return Response.redirect(authorizationUrl);
  },
};
