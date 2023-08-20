import { Badge, BadgeProps, Calendar, Typography } from "antd";
import React, { useMemo, useState } from "react";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import dayjs from "dayjs";
import styles from "./ROKAFCalendar.module.scss";
import VacationBlock from "../VacationBlock";
import { VacationCycleKey, VacationTypeKey } from "../../types";
import { GENERATION } from "../../data";

type ROKAFCalendarType = {
  generation: number;
  currentVacationType: VacationTypeKey;
  vacationCycleDates: Dayjs[];
};
export default function ROKAFCalendar({
  generation,
  currentVacationType,
  vacationCycleDates,
}: ROKAFCalendarType) {
  const DATE_FORMAT = "YYYY-MM-DD";
  const [value, setValue] = useState(dayjs("2023-08-17"));
  const [vacations, setVacations] = useState<{
    [date: string]: VacationTypeKey;
  }>({});
  const { enlistDate, dischargeDate } = useMemo(
    () => ({
      enlistDate: dayjs(GENERATION[generation].enlist),
      dischargeDate: dayjs(GENERATION[generation].discharge),
    }),
    [generation],
  );
  const dateCellRender = (value: Dayjs) => {
    const sDate = value.format(DATE_FORMAT);
    const components: JSX.Element[] = [];
    if (enlistDate.isSame(value)) {
      components.push(<SpecialDateBlock name="입대" />);
      // return <SpecialDateBlock name="입대" />;
    }
    if (vacationCycleDates.find((date) => date.isSame(value))) {
      // return <SpecialDateBlock name="왔다 성과제" />;
      components.push(<SpecialDateBlock name="왔다 성과제" />);
    }
    if (dischargeDate.isSame(value)) {
      components.push(<SpecialDateBlock name="전역" />);
      // return <SpecialDateBlock name="전역" />;
    }
    if (vacations?.[sDate]) {
      const type = vacations[sDate];
      // return (
      //   <VacationBlock
      //     key={`${sDate}-${type}`}
      //     type={type}
      //     position={getPositionOfBlock(value, type)}
      //   />
      // );

      components.push(
        <VacationBlock
          key={`${sDate}-${type}`}
          type={type}
          position={getPositionOfBlock(value, type)}
        />,
      );
    }
    if (!components.length) {
      return;
    }
    return <>{components.map((block) => block)}</>;
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

type SpecialDateBlockType = {
  name: string;
};
function SpecialDateBlock({ name }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
      }}
    >
      <Typography>{name}</Typography>
    </div>
  );
}
