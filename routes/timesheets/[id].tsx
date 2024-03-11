import { findTimesheetById, findUserByEmail } from "../../utils/dbUtils.ts";
import { Timesheet } from "../../components/Timesheet.tsx";

interface TimesheetEvent {
  startTime: string;
  endTime: string;
  eventName: string;
  activity: string;
}

export default async function TimesheetPage(_req: any, ctx: any) {
  const user = await findUserByEmail("test@test.com");
  console.log(user);
  const id = user?.timesheets["03-11-2024"]
  console.log(id)
  const timesheet = await findTimesheetById(id);

  console.log(timesheet, ctx.params);

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
  return (
    <div>
      <Timesheet
        columns={["x"]}
        events={timesheet.events}
        timestamp={dateString}
      />
    </div>
  );
}
