import { effect, signal } from "@preact/signals";


const d = new Date();
export const selectedDate = signal(d);

export function getStandardizedMonthDayYearKeyFromSelectedDate() {
  const month = selectedDate.value.getMonth() + 1;
  const monthString = month < 10 ? "0" + month.toString() : month.toString();
  const day = selectedDate.value.getDate();
  const dayString = day < 10 ? "0" + day.toString() : day.toString();
  const yearString = selectedDate.value.getFullYear().toString();

  return `${yearString}-${monthString}-${dayString}`;
}


export function getStandardizedMonthDayYearKeyFromDate(date: Date) {
  const month = date.getMonth() + 1;
  const monthString = month < 10 ? "0" + month.toString() : month.toString();
  const day = date.getDate();
  const dayString = day < 10 ? "0" + day.toString() : day.toString();
  const yearString = date.getFullYear().toString();

  return `${yearString}-${monthString}-${dayString}`;
}
export const selectedDateString = signal(getStandardizedMonthDayYearKeyFromSelectedDate());

effect(() => console.log("SELECTED DATE CHANGED: ", selectedDate.value));
effect(() => console.log("SELECTED DATEString CHANGED: ", selectedDateString.value));
