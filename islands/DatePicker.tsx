import type { Signal } from "@preact/signals";
import { getStandardizedMonthDayYearKeyFromDate } from "../utils/timeUtils.ts";

interface DatePickerProps {
  selectedDate: Signal<Date>;
}

export function DatePicker(props: DatePickerProps) {
  const incrementDate = (numberOfDays: number) => {
    const date = new Date(props.selectedDate.value);
    date.setDate(date.getDate() + numberOfDays);
    props.selectedDate.value = date;
  console.log(props.selectedDate);
};

  const date = new Date(props.selectedDate?.value);
  const dateValue = getStandardizedMonthDayYearKeyFromDate(date);

  return (
    <div class="col-span-4 flex gap-8 py-6">
      <button class="flex gap-8 py-6" onClick={() => incrementDate(-1)}>
        Go to previous day
      </button>
      <input
        type="date"
        name="Desired date"
        value={dateValue}
      />
      <button onClick={() => incrementDate(1)}>Go to next day</button>
    </div>
  );
}

// .add(7, 'd');
