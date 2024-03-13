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
  async GET(req: Request, ctx: HandlerContext) {
    console.log(38, ctx.params);
    const timesheetId = ctx.params.id;
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
      startTime: "1",
      endTime: "1",
      eventName: "1",
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
