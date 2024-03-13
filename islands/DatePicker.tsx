import { Signal } from "@preact/signals";
import {
  getStandardizedMonthDayYearKeyFromDate,
  getStandardizedMonthDayYearKeyFromSelectedDate,
  selectedDate,
  selectedDateString,
} from "../utils/timeUtils.ts";

export function DatePicker(props: {dateString: Signal<string>, locked: true | false }) {
  const { dateString, locked } = props;
  const incrementDate = (numberOfDays: number) => {
    const dateValue = getStandardizedMonthDayYearKeyFromSelectedDate();
    const date = new Date(dateValue);
    date.setDate(date.getDate() + numberOfDays);
    console.log(date);
    selectedDate.value = date;
    // console.log(selectedDate);
    const date2 = new Date(selectedDateString.value);
    date2.setDate(date2.getDate() + numberOfDays);
    console.log(20,date2);
    selectedDateString.value = getStandardizedMonthDayYearKeyFromDate(date2);
  };

  return (
    <div class="col-span-4 flex gap-8 py-6">
      <button
        class="flex gap-8 py-6"
        onClick={() => incrementDate(0)}
        disabled={locked}
      >
        Go to previous day
      </button>
      <input
        type="date"
        name="Desired date"
        value={dateString.value}
      />
      <button onClick={() => incrementDate(2)} disabled={locked}>
        Go to next day
      </button>
    </div>
  );
}

// .add(7, 'd');
