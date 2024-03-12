import { effect, signal } from "@preact/signals";

const initializeSelectedDate = () => {
  const d = new Date();
  return signal(d);
};

const selectedDate = initializeSelectedDate();

export const setSelectedDate = (date: Date) => {
  selectedDate.value = date;
};

export function getStandardizedMonthDayYearKeyFromSelectedDate() {
  const month = selectedDate.value.getMonth() + 1;
  const monthString = month < 10 ? "0" + month.toString() : month.toString();
  const day = selectedDate.value.getDate();
  const dayString = day < 10 ? "0" + day.toString() : day.toString();
  const yearString = selectedDate.value.getFullYear().toString();

  return `${yearString}-${monthString}-${dayString}`;
}

effect(() => console.log(selectedDate.value));
