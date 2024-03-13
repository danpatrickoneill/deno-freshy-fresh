import { Timesheet } from "../../components/Timesheet.tsx";
import { findTimesheetById, findUserByEmail } from "../../utils/dbUtils.ts";
import { EventInputForm } from "../../components/EventInputForm.tsx";
import { DatePicker } from "../../islands/DatePicker.tsx";
import {
  getStandardizedMonthDayYearKeyFromSelectedDate,
  selectedDate,
} from "../../utils/timeUtils.ts";
import { Nav } from "../../components/Nav.tsx";
import { selectedDateString } from "../../utils/timeUtils.ts";

interface TimesheetEvent {
  start: string;
  end: string;
  name: string;
  activity: string;
}
// could fetch timesheet just to redirect to id, which would then be the place to be
async function fetchTimesheet(id: string) {
  try {
    const url = `http:localhost:8000/api/timesheet/${id}`;
    console.log(url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Request failed: GET ${url}`);
    return res.json();
  } catch (e) {
    console.log(e);
  }
}

export default async function TimesheetPage(req: any, ctx: any) {
  console.log(32, "re-rendering timesheet/[id]")
  let locked = false;
  let timesheetId;
  console.log(ctx.params);
  if (!ctx?.params?.id || ctx.params.id === "new") {
    const timesheetKey = getStandardizedMonthDayYearKeyFromSelectedDate();
    // Email should live in context somehow once authorized?
    const user = await findUserByEmail("test@test.com");
    console.log(37, user, timesheetKey);
    timesheetId = user?.timesheets[timesheetKey];
    //   console.log(id)
  } else {
    timesheetId = ctx.params.id;
  }
  const timesheet = await fetchTimesheet(timesheetId);
  // if (!timesheet) {
  //   locked = true;
  // }
  if (timesheet?.timesheetKey) {
    console.log(41, timesheet);
    const timesheetDate = new Date(timesheet?.timesheetKey);
    selectedDate.value = timesheetDate;
    selectedDateString.value = timesheet?.timesheetKey;
  }
  console.log(55, selectedDateString.value)
  return (
    <div class="px-4 py-8 mx-auto my-8">
      <div class="max-w-screen-md mx-auto grid grid-cols-5 grid-rows-5 app-container">
        <Nav />
        <DatePicker locked={locked} dateString={selectedDateString} />
        <Timesheet
          columns={["x"]}
          events={timesheet?.events}
        />
      </div>
    </div>
  );
}
