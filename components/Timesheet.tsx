import type { Signal } from "@preact/signals";
import { JSX } from "preact";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";



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
  timestamp: Signal<Date>;
}

// async function fetchVotedItems() {
//   const url = "/api/timesheet/[id]";
//   const resp = await fetch(url);
//   if (!resp.ok) throw new Error(`Request failed: GET ${url}`);
//   return await resp.json() as Item[];
// }

function formatColumnName(string: string) {
  return string;
}

// Need to define type for this which will be good
export function Timesheet(props: TimesheetProps) {
  const { events, timestamp } = props;

  interface Data {
    results: string[];
    query: string;
  }
  
  //  User has a timesheet dict with timestamp format keys and timesheet IDs; then handle lookup
  //  Can cache ID permanently and events refreshed on demand
  export const handler: Handlers = {
    async GET(req: Request, ctx: HandlerContext) {
      // Gotta refactor mongo connection into util that I can assign to db here
      const user = await db.users.findOne({ email: enteredEmail });
      const timesheet = await db.timesheets.findOne({ _id: user.timesheets[timestamp] });
      if (!timesheet) {
        return ctx.renderNotFound({
          message: "Timesheet does not exist",
        });
      }
      return ctx.render(timesheet);
    },
  };

  return (
    <div class="tableContainer">
      <table aria-label="a table of events with start and end times along with other data">
        <thead>
          <tr>
            {columns.map((col) => <th>{formatColumnName(col)}</th>)}
          </tr>
        </thead>
        <tbody>
          {/* Returned table goes here */}
          {events.map((row: TimesheetEvent) => {
            return (
              <tr>
                <td>{row.startTime}</td>
                <td>{row.endTime}</td>
                <td>{row.eventName}</td>
                <td>{row.activity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
