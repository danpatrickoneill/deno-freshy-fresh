import { HandlerContext, Handlers } from "$fresh/server.ts";
import { addEventToTimesheet } from "../../../utils/dbUtils.ts";
import { findTimesheetById } from "../../../utils/dbUtils.ts";

interface TimesheetEvent {
  start: string;
  end: string;
  name: string;
  activity: string;
}

//  User has a timesheet dict with dateString format keys and timesheet IDs; then handle lookup
//  Can cache ID permanently and events refreshed on demand
export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const timesheetId = ctx.params.id;
    const dateString = ctx.params.dateString;
    console.log(ctx.params, timesheetId, dateString);
    
    const timesheet = await findTimesheetById(timesheetId);

    let responseBody;
    if (!timesheet) {
      responseBody = JSON.stringify({
        message: "Timesheet does not exist.",
      });
      return new Response(responseBody, { status: 404 });
    }
    responseBody = JSON.stringify(timesheet);
    return new Response(responseBody);
  },
  async POST(req: Request, ctx: HandlerContext) {
    const timesheetId = ctx.params.id;
    const newEvent = {
      start: "1",
      end: "1",
      name: "1",
      activity: "1",
    };
    const timesheet = await addEventToTimesheet(timesheetId, newEvent);

    let responseBody;
    if (!timesheet) {
      responseBody = JSON.stringify({
        message: "Timesheet does not exist.",
      });
    }
    responseBody = JSON.stringify(timesheet);
    return new Response(responseBody);
  },
};
