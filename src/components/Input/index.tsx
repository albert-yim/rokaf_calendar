import React from "react";
import { Input as AntdInput, InputProps, Typography } from "antd";
import styles from "./input.module.scss";

type InputType = InputProps & {
  label?: string;
};
export default function Input({ label, ...props }: InputType) {
  return (
    <div className={styles.inputContainer}>
      {label ? <Typography>{label}</Typography> : <></>}
      <AntdInput {...props} />
    </div>
  );
}
