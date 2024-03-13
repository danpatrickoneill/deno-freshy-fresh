
import { EventInputForm } from "../../components/EventInputForm.tsx";
import { DatePicker } from "../../islands/DatePicker.tsx";
import { Timesheet } from "../../components/Timesheet.tsx";

interface TimesheetEvent {
  start: string;
  end: string;
  name: string;
  activity: string;
}

export default function Home() {

  const eventOne = {
    startTime: "1",
    endTime: "1",
    eventName: "1",
    activity: "1",
  };
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <EventInputForm />
        <DatePicker />
        <Timesheet
          columns={["x"]}
          events={[eventOne]}
        />
      </div>
    </div>
  );
}
