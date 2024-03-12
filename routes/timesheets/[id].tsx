import { Timesheet } from "../../components/Timesheet.tsx";
import { findTimesheetById, findUserByEmail } from "../../utils/dbUtils.ts";
import { EventInputForm } from "../../components/EventInputForm.tsx";
import { DatePicker } from "../../islands/DatePicker.tsx";
import { getStandardizedMonthDayYearKeyFromSelectedDate } from "../../utils/timeUtils.ts";
import { Nav } from "../../components/Nav.tsx";

interface TimesheetEvent {
  startTime: string;
  endTime: string;
  eventName: string;
  activity: string;
}
async function fetchTimesheet(id: string) {
  try {
    const url = `http:localhost:8000/api/timesheet/test`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Request failed: GET ${url}`);
    return await resp;
  } catch (e) {
    console.log(e);
  }
}

export default async function TimesheetPage(_req: any, ctx: any) {
  console.log(16);

  const timesheetKey = getStandardizedMonthDayYearKeyFromSelectedDate();
  // Email should live in context somehow once authorized?
  const user = await findUserByEmail("test@test.com");
  //   console.log(user);
  const id = user?.timesheets[timesheetKey];
  //   console.log(id)
  const timesheet = await fetchTimesheet(id);

  console.log(timesheetKey, id, timesheet, ctx.params.id);

  const eventOne = {
    startTime: "1",
    endTime: "1",
    eventName: "1",
    activity: "1",
  };
  return (
    <div class="px-4 py-8 mx-auto my-8">
      <div class="max-w-screen-md mx-auto grid grid-cols-5 grid-rows-5 app-container">
        <Nav />
        <DatePicker />
        <Timesheet
          columns={["x"]}
          events={timesheet?.events}
        />
      </div>
    </div>
  );
}
