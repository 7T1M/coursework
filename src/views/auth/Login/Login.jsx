import React from "react";
import LoginForm from "./components/LoginForm";
import { Row, Col } from "antd";
const backgroundURL = "/img/img-17.jpg";
const backgroundStyle = {
  backgroundImage: `url(${backgroundURL})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100vh",
  padding: "5%",
};

export default function Login() {
  return (
    <div className="bg-white">
      <Row justify="center" className="items-stretch 	" align="middle">
        <Col xs={20} sm={20} md={24} lg={16} className="align-middle relative">
          <div className="container flex flex-col justify-center align-middle absolute top-0 bottom-0  	">
            <Row justify="center" align="middle">
              <Col xs={24} sm={24} md={20} lg={12} xl={8}>
                <h1>Вход</h1>
                {/* <p>
                  Еще не зарегистрированы? <a href="/signup">Зарегистрироваться</a>
                </p> */}
                <div className="mt-4">
                  <LoginForm />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={8}>
          <div
            className="flex flex-col   pr-4"
            style={backgroundStyle}
          >
            <div
              className="text-right"
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "white",
                paddingTop: "10px",
              }}
            >
              Salero.io
            </div>
            <Row justify="center" >
              <Col xs={0} sm={0} md={0} lg={20}>
                <img style={{ width: "100%" }} src="/img/img-18.png" alt="" />
                <h1 className="text-white">Добро прожаловать в Salero</h1>
                <p className="text-white">
                  Salero - это многофункциональный дашборд для отслеживания
                  показателей торговли на платформе Wildberries
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}
