import type { Signal } from "@preact/signals";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { establishConnection } from "../../utils/dbUtils.ts";

const columns = ["Start Time", "End Time", "Case Name", "Activity"];

interface TimesheetEvent {
  startTime: string;
  endTime: string;
  eventName: string;
  activity: string;
}
// type TimesheetEvent = object

interface TimesheetProps {
  columns: string[];
  events: TimesheetEvent[];
  dateString: Signal<Date>;
}

// async function fetchVotedItems() {
//   const url = "/api/timesheet/[id]";
//   const resp = await fetch(url);
//   if (!resp.ok) throw new Error(`Request failed: GET ${url}`);
//   return await resp.json() as Item[];
// }

interface Data {
  results: string[];
  query: string;
}

//  User has a timesheet dict with dateString format keys and timesheet IDs; then handle lookup
//  Can cache ID permanently and events refreshed on demand
export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    // Gotta refactor mongo connection into util that I can assign to db here
    const users = await establishConnection("users");
    const user = await users.collection("users").findOne({
      email: "test@test.com",
    });
    console.log(51, user);
    // const timesheetId = user?.timesheets?.[dateString.value.toDateString()]
    const timesheetId = user?.timesheets["03-15-2024"];
    const timesheets = await establishConnection("timesheets");
    const timesheet = await timesheets.collection("timesheets").findOne({
      _id: timesheetId,
    });
    if (!timesheet) {
      return ctx.renderNotFound({
        message: "Timesheet does not exist",
      });
    }
    return ctx.render(timesheet);
  },
};
