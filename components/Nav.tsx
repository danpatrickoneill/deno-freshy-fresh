import { GoogleSignIn } from "./GoogleSignIn.tsx";

export function Nav(props: object) {
  return (
    <html>
      <script src="https://accounts.google.com/gsi/client" async defer>
      </script>
      <div className="nav-container bg-[#577590] col-span-1 row-span-3 flex flex-col justify-around">
        <GoogleSignIn />
        <a href="/timesheets/today">Timesheets</a>
        <a href="/timesheets/today">Timesheets</a>
        <a href="/timesheets/today">Timesheets</a>
        <a href="/timesheets/today">Timesheets</a>
      </div>
    </html>
  );
}
