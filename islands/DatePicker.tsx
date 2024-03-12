import type { Signal } from "@preact/signals";
import { getStandardizedMonthDayYearKeyFromDate } from "../utils/timeUtils.ts";

interface DatePickerProps {
  selectedDate: Signal<Date>;
}

export function DatePicker(props: DatePickerProps) {
  const selectedDate = props.selectedDate.value || new Date();
  const date = new Date(selectedDate);
  console.log(props.selectedDate, selectedDate)
  const incrementDate = (numberOfDays: number) => {
    const date = new Date(selectedDate);
    console.log(date);
    date.setDate(date.getDate() + numberOfDays);
    console.log(date);
    props.selectedDate.value = date;
  };

  const dateValue = getStandardizedMonthDayYearKeyFromDate(date)
  console.log(dateValue);
  return (
    <div class="flex gap-8 py-6">
      <button onClick={() => incrementDate(-1)}>Go to previous day</button>
      <input
        type="date"
        name="Desired date"
        value={"03-12-2024"}
      />
      <button onClick={() => incrementDate(1)}>Go to next day</button>
    </div>
  );
}

// .add(7, 'd');
