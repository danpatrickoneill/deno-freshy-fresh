import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { addEventToTimesheet } from "../utils/dbUtils.ts";
import {
  createNewTimesheet,
  findTimesheetById,
  findUserByEmail,
} from "../utils/dbUtils.ts";
import {
  getStandardizedMonthDayYearKeyFromSelectedDate,
} from "../utils/timeUtils.ts";

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
    const timesheetKey = getStandardizedMonthDayYearKeyFromSelectedDate();
    // Gotta refactor mongo connection into util that I can assign to db here
    const user = await findUserByEmail("test@test.com");
    // const timesheetId = user?.timesheets?.[dateString.value.toDateString()]
    const timesheetId = user?.timesheets["03-15-2024"];
    const timesheet = await findTimesheetById(timesheetId);

    if (!timesheet) {
      return ctx.renderNotFound({
        message: "Timesheet does not exist",
      });
    }
    return ctx.render(timesheet);
  },
  async POST(req: Request, ctx: HandlerContext) {
    // Gotta refactor mongo connection into util that I can assign to db here
    const user = await findUserByEmail("test@test.com");
    // const timesheetId = user?.timesheets?.[dateString.value.toDateString()]
    const newEvent = {
      startTime: "1",
      endTime: "1",
      eventName: "1",
      activity: "1",
    };
    const timesheet = await createNewTimesheet(newEvent);

    if (!timesheet) {
      return ctx.renderNotFound({
        message: "Timesheet does not exist",
      });
    }
    return ctx.render(timesheet);
  },
  async PUT(req: Request, ctx: HandlerContext) {
    const timesheetId = ctx.params.id;
    const newEvent = {
      startTime: "1",
      endTime: "1",
      eventName: "1",
      activity: "1",
    };
    const timesheet = await addEventToTimesheet(timesheetId, newEvent);

    if (!timesheet) {
      return ctx.renderNotFound({
        message: "Timesheet does not exist",
      });
    }
    return ctx.render(timesheet);
  },
};

// Need to define type for this which will be good
export function Timesheet(props: TimesheetProps) {
  const { events } = props;

  interface Data {
    results: string[];
    query: string;
  }

  return (
    <>
      {/* Need to figure out all this grid stuff! */}
      <div class="tableContainer col-span-4 row-span-4 ">
        <table
          class="col-span-4 row-span-4 grid auto-cols-min auto-rows-min"
          aria-label="a table of events with start and end times along with other data"
        >
          <thead>
            <tr>
              {columns.map((col) => <th class="">{formatColumnName(col)}</th>)}
            </tr>
          </thead>
          <tbody>
            {/* Returned table goes here */}
            {events?.map((row: TimesheetEvent) => {
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
            <tr>
              <td>
                <input
                  type="time"
                  name="Start time"
                  label="Start time"
                  form="newEvent"
                />
              </td>
              <td>
                <input
                  type="time"
                  name="End time"
                  label="End time"
                  form="newEvent"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  label="name"
                  form="newEvent"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="Activity"
                  label="Activity"
                  form="newEvent"
                />
              </td>
            </tr>
          </tfoot>
        </table>
        {/* Form can post to existing timesheet ID or create new */}
      </div>
      <form id="newEvent" action=""></form>
    </>
  );
}
