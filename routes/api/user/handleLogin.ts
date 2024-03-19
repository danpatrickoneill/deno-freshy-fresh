import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { google } from "npm:googleapis";
import { load } from "https://deno.land/std@0.219.0/dotenv/mod.ts";
import url from "node:url";

import { verifyUserToken } from "../../../utils/userUtils.ts";
import { setUserEmail } from "../../../utils/userUtils.ts";
//  User has a timesheet dict with dateString format keys and timesheet IDs; then handle lookup
//  Can cache ID permanently and events refreshed on demand
export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    console.log("HEY! AT LOGIN HANDLER", ctx);
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
    google.options({ auth: oauth2Client });
    // Receive the callback from Google's OAuth 2.0 server.
    // if (req.url.startsWith("/oauth2callback")) {
    // Handle the OAuth 2.0 server response
    const q = url.parse(req.url, true).query;

    // Get access and refresh tokens (if access_type is offline)
    let { tokens } = await oauth2Client.getToken(q.code);
    console.log(36, tokens);
    oauth2Client.setCredentials(tokens);
    // }

    // Example of using Google Drive API to list filenames in user's Drive.
    const options = {
      resourceName: "people/me",
      personFields: "emailAddresses",
    };
    const people = google.people("v1");
    const userResponse = await people.people.get(options);
    console.log("55, USER: ", userResponse);
    if (userResponse.statusText === "OK") {
        setUserEmail(userResponse.data.emailAddresses[0].value);
    }
    // , (err1, res1?) => {
    //     if (err1) return console.log("The API returned an error: " + err1);
    //     const files = res1?.data.files;
    //     if (files?.length) {
    //       console.log("Files:");
    //       files.map((file) => {
    //         console.log(`${file.name} (${file.id})`);
    //       });
    //     } else {
    //       console.log("No files found.");
    //     }
    //   }

    return Response.redirect("http://localhost:8000");
  },
};
