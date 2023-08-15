import { Badge, BadgeProps, Calendar } from "antd";
import React, { useState } from "react";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import dayjs from "dayjs";
import styles from "./ROKAFCalendar.module.scss";
import VacationBlock from "../VacationBlock";
import { RegularVacationKey, VacationTypeKey } from "../../types";
type ROKAFCalendarType = {
  generation: number;
  currentVacationType: VacationTypeKey;
  regularVacation: RegularVacationKey;
};
export default function ROKAFCalendar({
  generation,
  currentVacationType,
  regularVacation,
}: ROKAFCalendarType) {
  const DATE_FORMAT = "YYYY-MM-DD";
  const [value, setValue] = useState(dayjs("2023-08-17"));
  const [vacations, setVacations] = useState<{
    [date: string]: VacationTypeKey;
  }>({});

  const dateCellRender = (value: Dayjs) => {
    const sDate = value.format(DATE_FORMAT);
    if (!vacations?.[sDate]) {
      return;
    }
    const type = vacations[sDate];
    return (
      <VacationBlock
        key={`${sDate}-${type}`}
        type={type}
        position={getPositionOfBlock(value, type)}
      />
    );
  };

  /*
   * to determine the block has neighbor,
   * and if it has, return the where it is among the blocks
   */
  const getPositionOfBlock = (date: Dayjs, type: VacationTypeKey) => {
    const nextDate = date.add(1, "d").format(DATE_FORMAT);
    const prevDate = date.subtract(1, "d").format(DATE_FORMAT);
    const hasLeft = vacations?.[prevDate] && vacations?.[prevDate] === type;
    const hasRight = vacations?.[nextDate] && vacations?.[nextDate] === type;

    if (hasLeft && hasRight) return "middle";
    if (hasLeft) return "end";
    if (hasRight) return "start";
    return undefined;
  };
  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    // if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const onSelect = (date: Dayjs) => {
    const sDate = date.format(DATE_FORMAT);
    if (vacations?.[sDate] === currentVacationType) {
      const newVacations = { ...vacations };
      delete newVacations[sDate];
      setVacations(newVacations);
      return;
    }
    setVacations({
      ...vacations,
      [date.format(DATE_FORMAT)]: currentVacationType,
    });
  };

  // console.log(vacations);
  return (
    <Calendar
      className={styles.rokafCalendar}
      value={value}
      onSelect={onSelect}
      cellRender={cellRender}
      // fullCellRender={() => {
      //   return <div>3</div>;
      // }}
    />
  );
}
