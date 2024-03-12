import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { findTimesheetById, findUserByEmail } from "../utils/dbUtils.ts";

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
  dateString: Date;
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

//  User has a timesheet dict with dateString format keys and timesheet IDs; then handle lookup
//  Can cache ID permanently and events refreshed on demand
export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    // Gotta refactor mongo connection into util that I can assign to db here
    const user = await findUserByEmail("test@test.com");
    console.log(51, user);
    // const timesheetId = user?.timesheets?.[dateString.value.toDateString()]
    const timesheetId = user?.timesheets["03-15-2024"];
    const timesheet = await findTimesheetById(timesheetId);

    if (!timesheet) {
      return ctx.renderNotFound({
        message: "Timesheet does not exist",
      });
    }
    console.log(61);
    return ctx.render(timesheet);
  },
};

// Need to define type for this which will be good
export function Timesheet(props: TimesheetProps) {
  const { events, dateString } = props;

  interface Data {
    results: string[];
    query: string;
  }

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
        <tfoot>
          <form>
            <tr>
              <td>
                <input
                  type="time"
                  name="Start time"
                />
              </td>
              <td>
                <input
                  type="time"
                  name="End time"
                  label="End time"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  label="name"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="Activity"
                  label="Activity"
                />
              </td>
            </tr>
          </form>
        </tfoot>
      </table>
    </div>
  );
}
