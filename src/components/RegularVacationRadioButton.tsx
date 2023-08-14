import React from "react";
import { Radio, RadioChangeEvent } from "antd";
import { RegularVacationKey, REGULAR_VACATION } from "../types";

type RegularVacationRadioButtonType = {
  regularVacation: RegularVacationKey;
  setRegularVacation: (type: RegularVacationKey) => void;
};

/*
 * The component that the radio button
 * to show Regular vacation period
 * and user can select the vacation period
 */
export default function RegularVacationRadioButton({
  regularVacation,
  setRegularVacation,
}: RegularVacationRadioButtonType) {
  const options = Object.entries(REGULAR_VACATION).map(([cycle, period]) => ({
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
