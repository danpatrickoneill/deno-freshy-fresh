import { JSX } from "preact";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <div className="container">
      Currently loaded timesheet: {loadedDate || "Today"}
      <form>
        <label>
          Start time:
          <input
            type="time"
            name="Start time"
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          End time:
          <input
            type="time"
            name="End time"
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <label>
          Case name:
          <input
            type="text"
            name="Case name"
            onChange={(e) => setCaseName(e.target.value)}
          />
        </label>
        <label>
          Activity:
          <input
            type="text"
            name="Activity"
            onChange={(e) => setActivity(e.target.value)}
          />
        </label>
        <label>
          User initials:
          <input
            type="text"
            name="User initials"
            onChange={(e) => setAuthCode(e.target.value)}
          />
        </label>
      </form>
      <button onClick={() => downloadCurrentTimesheet()}>
        Download currently loaded timesheet
      </button>
      <button onClick={() => sendFileToS3()}>Submit new activity</button>
      <label>
        Desired date:
        <input
          type="date"
          name="Desired date"
          onChange={(e) => setDesiredDate(e.target.value)}
        />
      </label>
      <button onClick={() => fetchSheetForDate(desiredDate)}>
        Fetch timesheet for preceding date
      </button>
      <button onClick={() => fetchTimesheetsForMonth(1)}>
        Fetch timesheet for December
      </button>
      <button id="enable" onClick={() => askNotificationPermission()}>
        Enable notifications
      </button>
      <button id="notify" onClick={() => createNotification()}>
        Get notification right now
      </button>
      <TimeTable date={loadedDate} timesheet={todaysTimesheet} />
    </div>
  );
}
