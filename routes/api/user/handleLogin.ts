import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { google } from "npm:googleapis";
import url from "node:url";

import { setUserEmail } from "../../../utils/userUtils.ts";
//  User has a timesheet dict with dateString format keys and timesheet IDs; then handle lookup
//  Can cache ID permanently and events refreshed on demand
export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    console.log("HEY! AT LOGIN HANDLER", ctx);
    console.log(req, req.url);

    const BASE_URL = Deno.env.get("BASE_URL");
    const client_id = Deno.env.get("GAUTH_CLIENT_ID");
    const client_secret = Deno.env.get("GAUTH_CLIENT_SECRET");
    const redirect_url = `${BASE_URL}/api/user/handleLogin`;

    const oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_url,
    );
    google.options({ auth: oauth2Client });

    const q = url.parse(req.url, true).query;
    // Get access and refresh tokens (if access_type is offline)
    let { tokens } = await oauth2Client.getToken(q.code);
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
    return Response.redirect(BASE_URL || "https://danoneill.online");
  },
};
