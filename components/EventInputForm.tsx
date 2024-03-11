import { JSX } from "preact";

export function EventInputForm(props: object) {
  return (
    <div className="container">
      Currently loaded timesheet: {null || "Today"}
      <form>
        <label>
          Start time:
          <input
            type="time"
            name="Start time"
          />
        </label>
        <label>
          End time:
          <input
            type="time"
            name="End time"
          />
        </label>
        <label>
          Case name:
          <input
            type="text"
            name="Case name"
          />
        </label>
        <label>
          Activity:
          <input
            type="text"
            name="Activity"
          />
        </label>
        <label>
          Email address:
          <input
            type="email"
            name="Email"
          />
        </label>
      </form>
      <label>
        Desired date: :
        <input
          type="date"
          name="Desired date"
        />
      </label>
    </div>
  );
}
