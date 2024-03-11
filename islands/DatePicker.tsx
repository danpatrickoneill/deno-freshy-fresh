import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

interface DatePickerProps {
  dateString: Signal<string>;
}

export function DatePicker(props: DatePickerProps) {
  const dateString = props.dateString.value || new Date().toDateString();
  const date = new Date(dateString);

  const incrementDate = (numberOfDays: number) => {
    const date = new Date(dateString);
    console.log(date);
    date.setDate(date.getDate() + numberOfDays);
    console.log(date);
    props.dateString.value = date.toDateString();
  };
  const monthNumber = date.getMonth() + 1
  const month = monthNumber.toString().length === 1
    ? "0" + monthNumber.toString()
    : monthNumber.toString();
    const dateNumber = date.getDate().toString().length === 1
    ? "0" + date.getDate().toString()
    : date.getDate().toString();
  const dateInputValue = `${date.getFullYear()}-${month}-${dateNumber}`;
  console.log(dateInputValue);
  console.log(props.dateString.value);
  return (
    <div class="flex gap-8 py-6">
      <Button onClick={() => incrementDate(-1)}>Go to previous day</Button>
      <input
        type="date"
        name="Desired date"
        value={dateInputValue}
      />
      <Button onClick={() => incrementDate(1)}>Go to next day</Button>
    </div>
  );
}

// .add(7, 'd');
