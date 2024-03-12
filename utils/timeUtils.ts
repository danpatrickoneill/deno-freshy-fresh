import { signal } from "@preact/signals";

const d = new Date();
const selectedDate = signal(d);

export function getStandardizedMonthDayYearKeyFromDate(date: Date) {
  const month = date.getMonth() + 1;
  const monthString = month < 10 ? "0" + month.toString() : month.toString();
  const day = date.getDate();
  const dayString = day < 10 ? "0" + day.toString() : day.toString();
  const yearString = date.getFullYear().toString();

  return `${yearString}-${monthString}-${dayString}`;
}

export function getSelectedDate() {
  return selectedDate;
}
