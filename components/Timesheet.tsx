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
  dateString: string;
}

function formatColumnName(string: string) {
  return string;
}

// Need to define type for this which will be good
export function Timesheet(props: TimesheetProps) {
  const { events, dateString } = props;

  return (
    <>
      <div class="tableContainer ">
        <table
          class=""
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
          </tfoot>
        </table>
      </div>
    </>
  );
}
