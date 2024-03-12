import { Timesheet } from "../../components/Timesheet.tsx";
import { findTimesheetById, findUserByEmail } from "../../utils/dbUtils.ts";
import { EventInputForm } from "../../components/EventInputForm.tsx";
import { DatePicker } from "../../islands/DatePicker.tsx";
import { selectedDate, getStandardizedMonthDayYearKeyFromDate } from "../../utils/timeUtils.ts";
import { Nav } from "../../components/Nav.tsx";

interface TimesheetEvent {
  startTime: string;
  endTime: string;
  eventName: string;
  activity: string;
}

export default async function TimesheetPage(_req: any, ctx: any) {
  console.log(16, selectedDate.value)
  const timesheetKey = getStandardizedMonthDayYearKeyFromDate(selectedDate.value)
  // Email should live in context somehow once authorized?
  const user = await findUserByEmail("test@test.com");
  //   console.log(user);
  const id = user?.timesheets[timesheetKey];
  //   console.log(id)
  const timesheet = await findTimesheetById(id);

    // console.log(selectedDate, timesheetKey, id, timesheet, ctx.params.id);


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
        <DatePicker selectedDate={selectedDate} />
        <Timesheet
          columns={["x"]}
          events={timesheet?.events}
          dateString={selectedDate.value}
        />
      </div>
    </div>
  );
}
