import { Handlers } from "$fresh/server.ts";
import { findTimesheetForUser } from "../../../utils/dbUtils.ts";
interface TimesheetEvent {
  start: string;
  end: string;
  name: string;
  activity: string;
}

//  Can cache ID permanently and events refreshed on demand
const BASE_URL = Deno.env.get("BASE_URL");

export const handler: Handlers = {
  async GET(req: Request, ctx) {
    const { dateString } = ctx.params;
    const timesheetId = await findTimesheetForUser(dateString);

    if (!timesheetId) {
      const url = `${BASE_URL}/timesheets/new/${dateString}`;
      return Response.redirect(url);
    }
    const url =
      `${BASE_URL}/timesheets/${timesheetId.toString()}/${dateString}`;
    return Response.redirect(url);
  },
  async POST(req: Request, ctx) {
    const { dateString } = ctx.params;
    const timesheetId = await findTimesheetForUser(dateString);

    if (!timesheetId) {
      const url = `${BASE_URL}/timesheets/new/${dateString}`;
      return Response.redirect(url);
    }
    const url =
      `${BASE_URL}/timesheets/${timesheetId.toString()}/${dateString}`;
    return Response.redirect(url);
  },
};
