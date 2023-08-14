import { VacationTypeKey } from "./VacationType";

export const VACATION_TYPE_IN_KOREAN: {
  [type in VacationTypeKey]: string;
} = {
  regular: "성과제",
  annual: "연가",
  reward: "포상",
  emergency: "청원",
  comfort: "위로",
};
