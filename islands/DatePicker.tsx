import {
  getStandardizedMonthDayYearKeyFromSelectedDate,
  setSelectedDate,
} from "../utils/timeUtils.ts";

export function DatePicker() {
  const incrementDate = (numberOfDays: number) => {
    const dateValue = getStandardizedMonthDayYearKeyFromSelectedDate();
    const date = new Date(dateValue);
    date.setDate(date.getDate() + numberOfDays);
    console.log(date);
    setSelectedDate(date);
    // console.log(selectedDate);
  };

  const dateValue = getStandardizedMonthDayYearKeyFromSelectedDate();

  return (
    <div class="col-span-4 flex gap-8 py-6">
      <button class="flex gap-8 py-6" onClick={() => incrementDate(0)}>
        Go to previous day
      </button>
      <input
        type="date"
        name="Desired date"
        value={dateValue}
      />
      <button onClick={() => incrementDate(2)}>Go to next day</button>
    </div>
  );
}

// .add(7, 'd');
