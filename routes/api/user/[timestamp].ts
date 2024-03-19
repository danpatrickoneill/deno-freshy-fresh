import { HandlerContext, Handlers } from "$fresh/server.ts";
import { findTimesheetForUser } from "../../../utils/dbUtils.ts";
interface TimesheetEvent {
  start: string;
  end: string;
  name: string;
  activity: string;
}

//  User has a timesheet dict with dateString format keys and timesheet IDs; then handle lookup
//  Can cache ID permanently and events refreshed on demand
export const handler: Handlers = {
  async POST(req: Request, ctx: HandlerContext) {
    const { timestamp } = ctx.params;
    const timesheetId = await findTimesheetForUser(timestamp);
    if (!timesheetId) {
      const url = `http:localhost:8000/timesheets/new/${timestamp}`;
      return Response.redirect(url);
    }
    const url = `http:localhost:8000/timesheets/${timesheetId.toString()}`;
    return Response.redirect(url);
  },
};
