interface NewTimesheetProps {
  dateString: string;
}

export function EventInputForm(props: NewTimesheetProps) {
  const { dateString } = props;
  return (
    <form
      action={`/api/timesheet/new/${dateString}`}
      method="POST"
    >
      <input
        type="time"
        name="start"
        label="Start time"
      />
      <input
        type="time"
        name="end"
        label="End time"
      />
      <input
        type="text"
        name="name"
        label="name"
      />
      <input
        type="text"
        name="activity"
        label="Activity"
      />
      <button>Start new Timesheet</button>
    </form>
  );
}
