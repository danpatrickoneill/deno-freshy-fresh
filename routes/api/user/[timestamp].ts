import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
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
    console.log(38, ctx.params);
    const { timestamp } = ctx.params;
    const timesheetId = await findTimesheetForUser(timestamp);
    console.log(40, timestamp, timesheetId);
    if (!timesheetId) {
      const url = `http:localhost:8000/timesheets/new/${timestamp}`;
      return Response.redirect(url);
    }
    console.log(48, timesheetId);
    const url = `http:localhost:8000/timesheets/${timesheetId.toString()}`;
    return Response.redirect(url);
  },
};
