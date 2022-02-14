import React from "react";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import httpService from "../../../../services/admin";
import { setAuthToken } from "../../../../redux/appSlice";
import { useDispatch } from "react-redux";

export default function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onSubmit(values) {
   httpService.signUp(values.email,values.password).then((res)=> {
     console.log(res)
     
   })
  }
  return (
    <Form layout="vertical" onFinish={onSubmit} name="login-form">
      <Form.Item
        name="email"
        label="Почта"
        rules={[
          {
            required: true,
            message: "Введите свою почту",
          },
          {
            type: "email",
            message: "Введите правильную почту",
          },
        ]}
      >
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