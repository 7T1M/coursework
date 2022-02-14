import React from "react";
import { Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import httpService from "../../../../services/admin";
import { setAuthToken } from "../../../../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LoginForm() {
  const dispatch = useDispatch();

  const auth = useSelector((state)=> state.app)
  function onSubmit(values) {
    httpService
      .login(values.email, values.password)
      .then((res) => {
        dispatch(setAuthToken(res.data.data.access_token));
      })
      .catch((err) => console.log(err));
  }
  return (
    <Form layout="vertical" onFinish={onSubmit} name="login-form">
      <Form.Item name="email" label="Почта">
        <Input
          prefix={<MailOutlined style={{ color: "#3e79f6" }} />}
          className="rounded-lg"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label={
          <div className="flex justify-between w-max items-center">
            <div className="flex">Пароль</div>
          </div>
        }
        rules={[
          {
            required: true,
            message: "Введите пароль",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "#3e79f6" }} />}
          className="text-primary rounded-lg"
          height={40}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className=" rounded-lg text-white"
          block
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
}
