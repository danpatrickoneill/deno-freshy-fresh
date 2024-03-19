import { HandlerContext, Handlers, RouteConfig } from "$fresh/server.ts";
import { addEventToTimesheet } from "../../../utils/dbUtils.ts";
import { findTimesheetById } from "../../../utils/dbUtils.ts";

interface TimesheetEvent {
  start: string;
  end: string;
  name: string;
  activity: string;
}

export const config: RouteConfig = {
  routeOverride: "/api/timesheets/:id(.{24})/:dateString(.{10})?",
};

//  User has a timesheet dict with dateString format keys and timesheet IDs; then handle lookup
//  Can cache ID permanently and events refreshed on demand
export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const timesheetId = ctx.params.id;
    const dateString = ctx.params.dateString;
    console.log(22, ctx.params, timesheetId, dateString);

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
    const dateString = ctx.params.dateString;
    console.log(40, ctx.params, timesheetId, dateString);
    const data = await req.formData();
    const newEvent = {
      start: data.get("start")?.toString(),
      end: data.get("end")?.toString(),
      name: data.get("name")?.toString(),
      activity: data.get("activity")?.toString(),
    };
    const timesheet = await addEventToTimesheet(timesheetId, newEvent);

    let responseBody;
    if (!timesheet) {
      responseBody = JSON.stringify({
        message: "Timesheet does not exist.",
      });
    }
    const BASE_URL = Deno.env.get("BASE_URL");

    const url = `${BASE_URL}/timesheets/${timesheetId}/${dateString}`;
    return Response.redirect(url);
  },
};
