import { HandlerContext, Handlers } from "$fresh/server.ts";
import {
  addTimesheetToUser,
  createNewTimesheet,
  findUserByEmail,
} from "../../../../utils/dbUtils.ts";

interface TimesheetEvent {
  start: string;
  end: string;
  name: string;
  activity: string;
}

interface Timesheet {
  name: string;
  stars: number;
}

interface TimesheetProps {
  columns: string[];
  events: TimesheetEvent[];
}

const BASE_URL = Deno.env.get("BASE_URL");

//  User has a timesheet dict with dateString format keys and timesheet IDs; then handle lookup
//  Can cache ID permanently and events refreshed on demand
export const handler: Handlers = {
  async POST(req: Request, ctx: HandlerContext) {
    const dateString = ctx.params.dateString;
    const data = await req.formData();
    const newEvent = {
      start: data.get("start")?.toString(),
      end: data.get("end")?.toString(),
      name: data.get("name")?.toString(),
      activity: data.get("activity")?.toString(),
    };
    const res = await createNewTimesheet(newEvent, dateString);

    if (!res.acknowledged) {
      const responseBody = JSON.stringify({
        message: "Timesheet creation failed.",
      });
      return new Response(responseBody);
    }
    addTimesheetToUser(res.insertedId, dateString);
    const url = `${BASE_URL}/timesheets/${res.insertedId}/${dateString}`;
    return Response.redirect(url);
  },
};
