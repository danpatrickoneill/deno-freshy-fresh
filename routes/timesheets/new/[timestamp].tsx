import { Timesheet } from "../../../components/Timesheet.tsx";
import { findTimesheetById, findUserByEmail } from "../../../utils/dbUtils.ts";
import { EventInputForm } from "../../../components/EventInputForm.tsx";
import { DatePicker } from "../../../islands/DatePicker.tsx";
import {
  getStandardizedMonthDayYearKeyFromSelectedDate,
  selectedDate,
} from "../../../utils/timeUtils.ts";
import { Nav } from "../../../components/Nav.tsx";
import { selectedDateString } from "../../../utils/timeUtils.ts";

interface TimesheetEvent {
  start: string;
  end: string;
  name: string;
  activity: string;
}

export default async function TimesheetPage(req: any, ctx: any) {
  console.log("rendering timesheet/new/[timestamp]]");
  let locked = false;
  console.log(22, ctx.params);
  const { timestamp } = ctx.params;
  return (
    <div class="px-4 py-8 mx-auto my-8">
      <div class="max-w-screen-md mx-auto grid grid-cols-5 grid-rows-5 app-container">
        <Nav />
        <DatePicker dateString={timestamp} />
        <Timesheet
          columns={["x"]}
        />
      </div>
    </div>
  );
}
