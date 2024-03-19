import { HandlerContext, Handlers } from "$fresh/server.ts";
import {
  getStandardizedMonthDayYearKeyFromDate,
} from "../../utils/timeUtils.ts";

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

// We'll be going to new/date and id/date
export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const timestamp = getStandardizedMonthDayYearKeyFromDate(new Date());
    const url = `http:localhost:8000/api/user/${timestamp}`;

    return Response.redirect(url);
  },
};
