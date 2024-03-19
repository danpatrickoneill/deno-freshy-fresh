import { getStandardizedMonthDayYearKeyFromDate } from "../utils/timeUtils.ts";

export function DatePicker(props: { dateString: string }) {
  let { dateString } = props;
  const incrementDate = (numberOfDays: number) => {
    const date = new Date(`${dateString} 00:00:00`);
    const x = date.getDate() + numberOfDays;
    date.setDate(x);
    const target = getStandardizedMonthDayYearKeyFromDate(date);
    goToNextDay(target);
  };
  const goToNextDay = async (dateString: string) => {
    try {
      const url = `/api/user/${dateString}`;
      const res = await fetch(url, { method: "POST" });
      globalThis.location.assign(res.url);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  // Could implement with own input field, date picker is a pain
  const jumpToDate = async (date: Date) => {
  };

  return (
    <div class="col-span-4 flex gap-8 py-6">
      <button
        class="flex gap-8 py-6"
        onClick={() => incrementDate(-1)}
      >
        Go to previous day
      </button>
      <input
        type="date"
        name="Desired date"
        value={dateString}
      />
      <button onClick={() => incrementDate(1)}>
        Go to next day
      </button>
    </div>
  );
}

// .add(7, 'd');
