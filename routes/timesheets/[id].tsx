import { useSignal } from "@preact/signals";
import { Timesheet } from "../../components/Timesheet.tsx";
import { findTimesheetById, findUserByEmail } from "../../utils/dbUtils.ts";
import { EventInputForm } from "../../components/EventInputForm.tsx";
import { DatePicker } from "../../islands/DatePicker.tsx";

import { load } from "https://deno.land/std@0.219.0/dotenv/mod.ts";

const env = await load();
const client_id = env["GAUTH_CLIENT_ID"];

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
  return (
    <>
      <head>
        <script src="https://apis.google.com/js/platform.js" async defer>
        </script>
        <meta
          name="google-signin-client_id"
          content={client_id}
        >
        </meta>
      </head>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <div class="g-signin2" data-onsuccess="onSignIn"></div>

          <Timesheet
            columns={["x"]}
            events={timesheet.events}
            dateString={dateString}
          />
        </div>
      </div>
    </>
  );
}
