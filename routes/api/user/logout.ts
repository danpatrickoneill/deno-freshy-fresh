import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { logOut } from "../../../utils/userUtils.ts";

//  User has a timesheet dict with dateString format keys and timesheet IDs; then handle lookup
//  Can cache ID permanently and events refreshed on demand
export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const BASE_URL = Deno.env.get("BASE_URL");
    logOut();
    return Response.redirect(BASE_URL);
  },
};
