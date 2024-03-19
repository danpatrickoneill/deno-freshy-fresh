import { userEmail } from "../utils/userUtils.ts";

export function Nav(props: object) {
  console.log(userEmail.value);

  const isLoggedIn = userEmail?.value?.length;
  const fetchLogin = () => {
    const url = "/api/user/login";
    console.log(url);
    // const res = await fetch(url, { method: "POST" });
    // console.log(30, res);
    // globalThis.location.assign(res.url);
    // return res;
  };
  return (
    <html>
      <body>
        <div className="nav-container bg-[#577590] col-span-1 row-span-3 flex flex-col justify-around">
          {isLoggedIn
            ? <p>{`Logged in as ${userEmail.value}`}</p>
            : <a href="/api/user/login">Log In</a>}
          {isLoggedIn ? null : <a href="/api/user/logout">Log Out</a>}
          <a href="/timesheets/today">Timesheets</a>
        </div>
      </body>
    </html>
  );
}
