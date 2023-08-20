import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
// import { Input } from "../components";
type LoginFormType = {
  username: string;
  password: string;
};
export default function Login() {
  const [form] = Form.useForm<LoginFormType>();
  const navigate = useNavigate();
  const onSubmit = (values: LoginFormType) => {
    console.log(values);
    console.log("submit!");
  };
  const onFailed = (error: ValidateErrorEntity<LoginFormType>) => {
    console.log(error);
    console.log("Failed");
  };
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      onFinishFailed={onFailed}
      layout="vertical"
      className={styles.pageWrapper}
    >
      <Form.Item
        label="Username"
        name={"username"}
        rules={[
          {
            required: true,
            message: "Please input userName",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name={"password"}
        rules={[
          {
            required: true,
            message: "Please input password",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

// <div className={styles.pageWrapper}>
//   <form onSubmit={onSubmit}>
//     <div className={styles.loginContainer}>
//       <Input
//         label="userName"
//         value={userName}
//         onChange={(e) => setUserName(e.target.value)}
//       />
//       <Input
//         label={"Password"}
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <Button key="submit">로그인</Button>
//     </div>
//   </form>
// </div>
