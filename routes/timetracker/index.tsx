import { useSignal } from "@preact/signals";
import { EventInputForm } from "../../components/EventInputForm.tsx";
import { DatePicker } from "../../islands/DatePicker.tsx";
import { Timesheet } from "../../components/Timesheet.tsx";

interface TimesheetEvent {
  startTime: string;
  endTime: string;
  eventName: string;
  activity: string;
}

export default function Home() {
  const dateString = useSignal(new Date("4/16/2024"));
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
        <DatePicker dateString={dateString} />
        <Timesheet
          columns={["x"]}
          events={[eventOne]}
          dateString={dateString.value}
        />
      </div>
    </div>
  );
}
