
import { EventInputForm } from "../../components/EventInputForm.tsx";
import { DatePicker } from "../../islands/DatePicker.tsx";
import { Timesheet } from "../../components/Timesheet.tsx";
import {getSelectedDate} from "../../utils/timeUtils.ts"

interface TimesheetEvent {
  startTime: string;
  endTime: string;
  eventName: string;
  activity: string;
}

export default function Home() {

  const eventOne = {
    startTime: "1",
    endTime: "1",
    eventName: "1",
    activity: "1",
  };
  const selectedDate = getSelectedDate()
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <EventInputForm />
        <DatePicker selectedDate={selectedDate} />
        <Timesheet
          columns={["x"]}
          events={[eventOne]}
          dateString={selectedDate.value}
        />
      </div>
    </div>
  );
}
