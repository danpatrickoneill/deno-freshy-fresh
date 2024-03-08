import { JSX } from "preact";

const columns = ["Start Time", "End Time", "Case Name", "Activity"];

const getTimesheetArray = () => {
  const rowLength = 4;
  console.log(timesheet);
  let elementsToSplit = timesheet;

  if (timesheet.slice(1, timesheet.length).includes("\n")) {
    elementsToSplit = timesheet.split("\n");
    elementsToSplit = elementsToSplit.join();
  }
  const elements = elementsToSplit.split(",");

  let a = 0;
  let b = 4;
  const returnArray = [];
  while (b <= elements.length) {
    returnArray.push(elements.slice(a, b));
    a += rowLength;
    b += rowLength;
  }
  return returnArray;
};
const timesheetArray = getTimesheetArray();

// Need to define type for this which will be good
export function TimeTable(props: object) {
// const { date, timesheet } = props;

  return (
    <div class = "tableContainer"
  >
    {date.length ? <h3>Timesheet for {date}</h3> : null}
    <table aria-label="a table of events with start and end times along with other data">
      <thead>
        <tr>
          {columns.map((col) => (
            <th>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timesheetArray.map((row) => {
          return (
            <tr>
              <th>{row[0]}</th>
              <th>{row[1]}</th>
              <th>{row[2]}</th>
              <th>{row[3]}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  );
}
