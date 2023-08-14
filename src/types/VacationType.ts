import type { Dayjs } from "Dayjs";

export const VACATIONS = {
  // 성과제 외박
  regular: 0,
  // 연가
  annual: 1,
  // 포상
  reward: 2,
  // 청원
  emergency: 3,
  // 위로
  comfort: 4,
};
export const VACATIONS_IN_KOREAN = {
  regular: "성과제",
  annual: "연가",
  reward: "포상",
  emergency: "청원",
  comfort: "위로",
};
export type VacationsKey = keyof typeof VACATIONS;

export type VacationList = {
  [vacation in VacationsKey]: Dayjs[];
};
