import { Timesheet } from "../../../components/Timesheet.tsx";
import { DatePicker } from "../../../islands/DatePicker.tsx";
import { Nav } from "../../../components/Nav.tsx";

interface TimesheetEvent {
  start: string;
  end: string;
  name: string;
  activity: string;
}

export default async function TimesheetPage(req: any, ctx: any) {
  const { timestamp } = ctx.params;
  return (
    <div class="px-4 py-8 mx-auto my-8">
      <div class="max-w-screen-md mx-auto grid grid-cols-5 grid-rows-5 app-container">
        <Nav />
        <DatePicker dateString={timestamp} />
        <Timesheet
          columns={["x"]}
          dateString={timestamp}
        />
      </div>
    </div>
  );
}
