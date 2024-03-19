import { RouteConfig } from "$fresh/server.ts";
import { Timesheet } from "../../components/Timesheet.tsx";
import { DatePicker } from "../../islands/DatePicker.tsx";
import { Nav } from "../../components/Nav.tsx";

const BASE_URL = Deno.env.get("BASE_URL");

// could fetch timesheet just to redirect to id, which would then be the place to be
async function fetchTimesheet(id: string) {
  try {
    const url = `${BASE_URL}/api/timesheet/${id}`;
    const res = await fetch(url);
    console.log(res)
    if (!res.ok) throw new Error(`Request failed: GET ${url}`);
    return res.json();
  } catch (e) {
    console.log(e);
  }
}

export const config: RouteConfig = {
  routeOverride: "/timesheets/:id/:dateString",
};

const timesheet = await fetchTimesheet(timesheetId);

export default async function TimesheetPage(req: any, ctx: any) {
  const timesheetId = ctx.params.id;
  const dateString = ctx.params.dateString;
  console.log(25, timesheetId, dateString, ctx.params);


  return (
    <div class="px-4 py-8 mx-auto my-8">
      <div class="max-w-screen-md mx-auto grid grid-cols-5 grid-rows-5 app-container">
        <Nav />
        <DatePicker dateString={timesheet?.timesheetKey} />
        <Timesheet
          columns={["x"]}
          events={timesheet?.events}
          dateString={dateString}
        />
      </div>
    </div>
  );
}
