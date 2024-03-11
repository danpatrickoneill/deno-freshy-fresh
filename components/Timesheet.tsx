import type { Signal } from "@preact/signals";
import { JSX } from "preact";

const columns = ["Start Time", "End Time", "Case Name", "Activity"];

interface TimesheetEvent {
  startTime: string;
  endTime: string;
  name: string;
  activity: string;
}

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

// Need to define type for this which will be good
export function Timesheet(props: TimesheetProps) {
  const { events } = props;

  return (
    <div class="tableContainer">
      <table aria-label="a table of events with start and end times along with other data">
        <thead>
          <tr>
            {columns.map((col) => <th>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {/* Returned table goes here */}
        </tbody>
      </table>
    </div>
  );
}
