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
  start: string;
  end: string;
  name: string;
  activity: string;
}
// type TimesheetEvent = object

interface TimesheetProps {
  columns: string[];
  events: TimesheetEvent[] | null;
}

function formatColumnName(string: string) {
  return string;
}

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
                  <td>{row.start}</td>
                  <td>{row.end}</td>
                  <td>{row.name}</td>
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
                  name="start"
                  label="Start time"
                  form="newEvent"
                />
              </td>
              <td>
                <input
                  type="time"
                  name="end"
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
                  name="activity"
                  label="Activity"
                  form="newEvent"
                />
              </td>
            </tr>
          </tfoot>
        </table>
        {/* Form can post to existing timesheet ID or create new */}
      </div>
      <form id="newEvent" action="/api/timesheet/new" method="POST"><button>Start new Timesheet</button></form>
    </>
  );
}
