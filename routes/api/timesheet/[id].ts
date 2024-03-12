import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { addEventToTimesheet } from "../../../utils/dbUtils.ts";
import {
  createNewTimesheet,
  findTimesheetById,
  findUserByEmail,
} from "../../../utils/dbUtils.ts";
import {
  getStandardizedMonthDayYearKeyFromSelectedDate,
} from "../../../utils/timeUtils.ts";

// interface TimesheetEvent {
//   startTime: string;
//   endTime: string;
//   eventName: string;
//   activity: string;
// }
// // type TimesheetEvent = object

// interface TimesheetProps {
//   columns: string[];
//   events: TimesheetEvent[];
// }

// // async function fetchVotedItems() {
// //   const url = "/api/timesheet/[id]";
// //   const resp = await fetch(url);
// //   if (!resp.ok) throw new Error(`Request failed: GET ${url}`);
// //   return await resp.json() as Item[];
// // }

// function formatColumnName(string: string) {
//   return string;
// }

// //  User has a timesheet dict with dateString format keys and timesheet IDs; then handle lookup
// //  Can cache ID permanently and events refreshed on demand
// export const handler: Handlers = {
//   async GET(req: Request, ctx: HandlerContext) {
//     const timesheetKey = getStandardizedMonthDayYearKeyFromSelectedDate();
//     // Gotta refactor mongo connection into util that I can assign to db here
//     const user = await findUserByEmail("test@test.com");
//     // const timesheetId = user?.timesheets?.[dateString.value.toDateString()]
//     const timesheetId = user?.timesheets["03-15-2024"];
//     console.log(45, req.url)
//     const timesheet = await findTimesheetById("65ef694a05f310ac5a76bbf6");

//     if (!timesheet) {
//       return ctx.renderNotFound({
//         message: "Timesheet does not exist",
//       });
//     }
//     return ctx.render(timesheet);
//   },
// };

// export default function TimesheetPage(props: object) {
//   return (
//     <div>
//       <h1>{props.data.event}</h1>
//       <p>{props.data.stars} stars</p>
//     </div>
//   );
// }

interface Timesheet {
  name: string;
  stars: number;
}

export default async function TimesheetPage(_req: any, ctx: any) {
  console.log(72, ctx.params);
  
  const timesheet = await findTimesheetById(ctx.params.id);
  console.log(73, timesheet);

  return JSON.stringify(timesheet?.events);
  // if (!timesheet) {
  //   return <h1>{"Project not found"}</h1>;
  // }

  // return (
  //   <div>
  //     <h1>{project.name}</h1>
  //     <p>{project.stars} stars</p>
  //   </div>
  // );
}
