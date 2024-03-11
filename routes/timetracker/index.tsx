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
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <EventInputForm />
        <DatePicker dateString={dateString} />
        <Timesheet
          columns={["x"]}
          events={[eventOne]}
          timestamp={dateString.value}
        />
      </div>
    </div>
  );
}
