export function Nav(props: object) {
  const fetchLogin = () => {
    const url = "/api/user/login";
    console.log(url);
    // const res = await fetch(url, { method: "POST" });
    // console.log(30, res);
    // globalThis.location.assign(res.url);
    // return res;
  };
  const logInLink =
    "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&include_granted_scopes=true&response_type=code&client_id=704142127041-13pvqpiajl8bcp2g1jvv99bqt52deiae.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000";

  return (
    <html>
      <body>
        <div className="nav-container bg-[#577590] col-span-1 row-span-3 flex flex-col justify-around">
          <a href="/api/user/login">SIGN IN</a>

          <a href={logInLink}>Log in</a>
          <a href="/timesheets/today">Timesheets</a>
        </div>
      </body>
    </html>
  );
}
