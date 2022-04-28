import React from "react";
import LoginForm from "./components/LoginForm";
import logo from "../../../assets/img/ur-dpr.png";
import { Row, Col } from "antd";

export default function Login() {
  return (
    <div className={"w-full h-[100vh]"}>
      <Col span={24} className=" 2xl:h-[100vh]">
        <Row
          align="middle"
          className=" h-full items-center flex-col"
          justify="center"
        >
          <div>
            <img src={logo} height={300} width={300} alt="" />
          </div>
          <div className="w-[30%] 2xl:w-[20%]">
            <h1>Вход</h1>
            <div className="mt-4">
              <LoginForm />
            </div>
          </div>
        </Row>
      </Col>
    </div>
  );
}
