import type { Dayjs } from "Dayjs";

export const VACATION_TYPE = [
  // 성과제 외박
  "regular",
  // 연가
  "annual",
  // 포상
  "reward",
  // 청원
  "emergency",
  // 위로
  "comfort",
] as const;

export type VacationTypeKey = (typeof VACATION_TYPE)[number];

export type VacationList = {
  [vacation in VacationTypeKey]: Dayjs[];
};
