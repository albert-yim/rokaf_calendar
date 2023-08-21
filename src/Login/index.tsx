import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { GENERATION } from "../data";
// import { Input } from "../components";
type LoginFormType = {
  username: string;
  password: string;
  generation: number;
};
const USER_DATA = [
  {
    username: "test",
    password: "asdqwe123!",
    generation: 846,
  },
];
export default function Login() {
  const generation_key = Object.keys(GENERATION);
  const [firstLogin, setFirstLogin] = useState(false);
  const [form] = Form.useForm<LoginFormType>();
  const navigate = useNavigate();
  const login = (generation?: number) => {
    if (generation) {
      // set generation
      console.log(`set generation ${generation}`);
    }
    navigate("/home", { replace: true });
  };
  const onSubmit = (values: LoginFormType) => {
    if (firstLogin) {
      login(form.getFieldValue("generation"));
      return;
    }
    const user = USER_DATA.find(
      (user) => user.username === form.getFieldValue("username"),
    );
    if (!user) {
      // create user
      setFirstLogin(true);
      return;
    }
    if (user?.password !== form.getFieldValue("password")) {
      console.log("password error");
      return;
    }
    console.log(values);
    console.log("submit!");
    login();
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
        <Input disabled={firstLogin} />
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
        <Input.Password disabled={firstLogin} />
      </Form.Item>
      <Form.Item label="기수" name="generation" hidden={!firstLogin}>
        <Select placeholder="기수를 선택하세요." style={{ width: "100%" }}>
          {generation_key.map((generation) => (
            <Select.Option key={generation} value={generation}>
              {generation}
            </Select.Option>
          ))}
        </Select>
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
