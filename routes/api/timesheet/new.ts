import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { addEventToTimesheet } from "../../../utils/dbUtils.ts";
import {
  addTimesheetToUser,
  createNewTimesheet,
  findTimesheetById,
  findUserByEmail,
} from "../../../utils/dbUtils.ts";
import {
  getStandardizedMonthDayYearKeyFromSelectedDate,
} from "../../../utils/timeUtils.ts";

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

function formatColumnName(string: string) {
  return string;
}

//  User has a timesheet dict with dateString format keys and timesheet IDs; then handle lookup
//  Can cache ID permanently and events refreshed on demand
export const handler: Handlers = {
  async POST(req: Request, _ctx: HandlerContext) {
    // Gotta refactor mongo connection into util that I can assign to db here
    const user = await findUserByEmail("test@test.com");
    const data = await req.formData();
    console.log(40, data);
    const newEvent = {
      start: data.get("start")?.toString(),
      end: data.get("end")?.toString(),
      name: data.get("name")?.toString(),
      activity: data.get("activity")?.toString(),
    };
    const res = await createNewTimesheet(newEvent);

    if (!res.acknowledged) {
      const responseBody = JSON.stringify({
        message: "Timesheet creation failed.",
      });
      return new Response(responseBody);
    }
    addTimesheetToUser(res.insertedId, user);
    const url = `http:localhost:8000/timesheets/${res.insertedId}`;
    return Response.redirect(url);
  },
};
