import { RouteConfig } from "$fresh/server.ts";
import { Timesheet } from "../../components/Timesheet.tsx";
import { EventInputForm } from "../../components/EventInputForm.tsx";
import { DatePicker } from "../../islands/DatePicker.tsx";
import { Nav } from "../../components/Nav.tsx";

const BASE_URL = Deno.env.get("BASE_URL");

// could fetch timesheet just to redirect to id, which would then be the place to be
async function fetchTimesheet(id: string) {
  try {
    const url = `${BASE_URL}/api/timesheets/${id}`;
    const res = await fetch(url);
    console.log(res);
    if (!res.ok) throw new Error(`Request failed: GET ${url}`);
    return res.json();
  } catch (e) {
    console.log(e);
  }
}

export const config: RouteConfig = {
  routeOverride: "/timesheets/:id/:dateString",
};

export default async function TimesheetPage(req: any, ctx: any) {
  const timesheetId = ctx.params.id;
  const noTimesheet = timesheetId === "new";
  const dateString = ctx.params.dateString;
  let timesheet;
  if (noTimesheet) {
    console.log("Empty sheet here!");
  } else {
    timesheet = await fetchTimesheet(timesheetId);
  }
  const formAction = noTimesheet
    ? `/api/timesheets/new/${dateString}`
    : `/api/timesheets/${timesheetId}/${dateString}`;
  console.log(formAction);
  
  return (
    <div class="px-4 py-8 mx-auto my-8">
      <div class="max-w-screen-md mx-auto app-container">
        <Nav />
        <DatePicker dateString={dateString} />
        <Timesheet
          columns={["x"]}
          events={timesheet?.events}
          dateString={dateString}
        />
        <EventInputForm
          formAction={formAction}
        />
      </div>
    </div>
  );
}
