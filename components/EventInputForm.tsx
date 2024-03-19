interface NewTimesheetProps {
  formAction: string;
}

export function EventInputForm(props: NewTimesheetProps) {
  const { formAction } = props;
  return (
    <form
      action={formAction}
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
      <button class="bg-primary hover:bg-accent-light text-white font-bold py-2 px-4 rounded-full">Add event to sheet</button>
    </form>
  );
}
