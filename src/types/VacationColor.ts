import { VacationTypeKey } from "./VacationType";

export const HOLIDAY_COLOR = "#e84749";
export const VACATION_COLOR: {
  [vacation in VacationTypeKey]: string;
} = {
  regular: "#e8d639",
  annual: "#33bcb7",
  reward: "#e89a3c",
  emergency: "#8bbb11",
  comfort: "#3c89e8",
};
