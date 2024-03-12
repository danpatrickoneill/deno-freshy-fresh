import { Timesheet } from "../../components/Timesheet.tsx";
import { findTimesheetById, findUserByEmail } from "../../utils/dbUtils.ts";
import { EventInputForm } from "../../components/EventInputForm.tsx";
import { DatePicker } from "../../islands/DatePicker.tsx";
import { getSelectedDate } from "../../utils/timeUtils.ts";
import { Nav } from "../../components/Nav.tsx";

interface TimesheetEvent {
  startTime: string;
  endTime: string;
  eventName: string;
  activity: string;
}

export default async function TimesheetPage(_req: any, ctx: any) {
  // Email should live in context somehow once authorized?
  const user = await findUserByEmail("test@test.com");
  //   console.log(user);
  const id = user?.timesheets["03-11-2024"];
  //   console.log(id)
  const timesheet = await findTimesheetById(id);

  //   console.log(timesheet, ctx.params);

  if (!timesheet) {
    return <h1>Project not found</h1>;
  }
  const eventOne = {
    startTime: "1",
    endTime: "1",
    eventName: "1",
    activity: "1",
  };
  const dateString = new Date("03-11-2024");
  const selectedDate = getSelectedDate();
  return (
    <div class="px-4 py-8 mx-auto my-8">
      <div class="max-w-screen-md mx-auto grid grid-cols-5 grid-rows-5 app-container">
        <Nav />
        <DatePicker selectedDate={selectedDate} />
        <Timesheet
          columns={["x"]}
          events={timesheet.events}
          dateString={dateString}
        />
      </div>
    </div>
  );
}
