import { userEmail } from "../utils/userUtils.ts";
import { getStandardizedMonthDayYearKeyFromDate } from "../utils/timeUtils.ts";

export function Nav(props: object) {
  const isLoggedIn = userEmail?.value?.length;
  const dateString = getStandardizedMonthDayYearKeyFromDate();

  return (
    <html>
      <body>
        <div className="nav-container bg-[#577590] col-span-1 row-span-3 flex flex-col justify-around">
          {isLoggedIn
            ? <p>{`Logged in as ${userEmail.value}`}</p>
            : <a href="/api/user/login">Log In</a>}
          {isLoggedIn ? <a href="/api/user/logout">Log Out</a> : null}
          <a href={`/timesheets/new/${dateString}`}>Timesheets</a>
          <a href="/blog">Blog</a>
        </div>
      </body>
    </html>
  );
}
