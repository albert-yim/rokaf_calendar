import React from "react";
import { Radio, RadioChangeEvent } from "antd";
import {
  VacationTypeKey,
  VACATION_COLOR,
  VACATION_TYPE,
  VACATION_TYPE_IN_KOREAN,
} from "../../types";
import styles from "./VacationRadioButton.module.scss";

type VacationRadioButtonType = {
  vacationType: VacationTypeKey;
  setVacationType: (type: VacationTypeKey) => void;
};

/*
 * The component that the radio button
 * to show vacation types
 * and user can select the type
 */
export default function VacationRadioButton({
  vacationType,
  setVacationType,
}: VacationRadioButtonType) {
  const options = VACATION_TYPE.map((type) => ({
    // label: VACATION_TYPE_IN_KOREAN[type],
    label: (
      <div className={styles.optionLabel}>
        <div
          className={styles.indicator}
          style={{ background: VACATION_COLOR[type] }}
        />
        {VACATION_TYPE_IN_KOREAN[type]}
      </div>
    ),
    value: type,
  }));

  const onChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setVacationType(value);
  };

  return (
    <Radio.Group
      options={options}
      value={vacationType}
      onChange={onChange}
      optionType={"button"}
      // buttonStyle={"solid"}
    />
  );
}
