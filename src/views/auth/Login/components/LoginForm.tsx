import { Button, Form, Input, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import adminServices from "../../../../services/admin";
import { setAuthToken, setLogger } from "../../../../redux/appSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/hooks";
import { AxiosError } from "axios";
import { FC } from "react";
import { NotificationPlacement } from "antd/lib/notification";
import Logger from "../../../../logger/Logger";

interface ILoginData {
  email: string;
  password: string;
}

const openErrorNotification = () => {
  notification.error({
    message: "Ошибка",
    description: "Неверный логин или пароль",
    placement: "bottom" as NotificationPlacement,
  });
};

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function onSubmit(values: ILoginData) {
    adminServices
      .login(values.email, values.password)
      .then((res) => {
        dispatch(setAuthToken(res.data.data.access_token));
        const logger = new Logger(values.email);
        logger.userLogin();
        dispatch(setLogger(logger));
        console.debug(logger);
        navigate("/app/news");
      })
      .catch(() => openErrorNotification());
  }
  return (
    <Form layout="vertical" onFinish={onSubmit} name="login-form">
      <Form.Item name="email" label="Логин">
        <Input
          prefix={<UserOutlined style={{ color: "#3e79f6" }} />}
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
};
export default LoginForm;
