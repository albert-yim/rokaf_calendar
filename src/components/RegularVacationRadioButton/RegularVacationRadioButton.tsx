import React from "react";
import { Radio, RadioChangeEvent } from "antd";
import { VacationCycleKey, VACATION_CYCLE } from "../../types";

type RegularVacationRadioButtonType = {
  vacationCycle: VacationCycleKey;
  setVacationCycle: (type: VacationCycleKey) => void;
};

/*
 * The component that the radio button
 * to show Regular vacation period
 * and user can select the vacation period
 */
export default function RegularVacationRadioButton({
  vacationCycle: regularVacation,
  setVacationCycle: setRegularVacation,
}: RegularVacationRadioButtonType) {
  const options = Object.entries(VACATION_CYCLE).map(([cycle, period]) => ({
    label: cycle,
    value: cycle,
  }));
  const onChange = (e: RadioChangeEvent) => {
    setRegularVacation(e.target.value);
  };
  return (
    <Radio.Group
      options={options}
      value={regularVacation}
      onChange={onChange}
      optionType={"button"}
      buttonStyle={"solid"}
      defaultValue={"6weeks"}
    />
  );
}
