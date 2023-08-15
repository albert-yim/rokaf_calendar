import { Typography } from "antd";
import React from "react";
import {
  VacationTypeKey,
  VACATION_COLOR,
  VACATION_TYPE_IN_KOREAN,
} from "../../types";
import styles from "./VacationBlock.module.scss";
import cn from "classnames";

type VacationBlockType = {
  /** type of vacations */
  type: VacationTypeKey;
  /** determine the position of block, if undefined, there is no block on the side */
  position?: "start" | "end" | "middle";
};
/**
 * This component is the Block to show vacation on the Calendar
 */
export default function VacationBlock({ type, position }: VacationBlockType) {
  const showName = position === undefined || position === "start";
  return (
    <div
      className={cn(styles.vacationBlock, {
        [styles.vacationBlock__start]: position === "start",
        [styles.vacationBlock__end]: position === "end",
        [styles.vacationBlock__middle]: position === "middle",
      })}
      style={{ background: `${VACATION_COLOR[type]}B3` }}
    >
      {showName ? (
        <Typography>{VACATION_TYPE_IN_KOREAN[type]}</Typography>
      ) : (
        <></>
      )}
    </div>
  );
}
