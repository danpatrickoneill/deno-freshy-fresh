import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { BASE_URL } from "../../../utils/constants.ts";
import { logOut } from "../../../utils/userUtils.ts";

//  User has a timesheet dict with dateString format keys and timesheet IDs; then handle lookup
//  Can cache ID permanently and events refreshed on demand
export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    logOut();
    return Response.redirect(BASE_URL);
  },
};
