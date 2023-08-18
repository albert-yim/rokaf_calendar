import { GENERATION } from "../data";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { VacationCycleKey, VACATION_CYCLE } from "../types";

export function regularVacationCycles(
  generation: number,
  cycle: VacationCycleKey,
) {
  const enlist_date = dayjs(GENERATION[generation].enlist);
  const discharge_date = dayjs(GENERATION[generation].discharge);
  // 수료날이 첫 휴가
  let regular_vacation = enlist_date.add(4, "week").set("day", 5);
  const vacation_cycle_dates: Dayjs[] = [];
  const num_cycle = +cycle[0];
  while (regular_vacation < discharge_date) {
    vacation_cycle_dates.push(regular_vacation);
    regular_vacation = regular_vacation.add(num_cycle, "week");
  }
  console.log(vacation_cycle_dates.map((date) => date.format("YYYY-MM-DD")));
  return vacation_cycle_dates;
}
