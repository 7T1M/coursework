import React, { useState } from "react";
import { Row, Col, Typography, Select, Card, Input } from "antd";
import ChartWidgetWidthControl from "./ChartWidgetWidthControl";
import RightInfoWidget from "./RightInfoWidget";
import StatisticByProducts from "./StatisticByProducts";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectRoute } from "../../../redux/sideNavSlice";
import Logger from "../../../logger/Logger";
const { Title } = Typography;
const { Option } = Select;

export default function Analytic() {
  const dispatch = useDispatch();
  const logger: Logger = useSelector((state: any) => state.app.logger);
  useEffect(() => {
    dispatch(selectRoute("analytic"));
    logger.userChangePage("analytic");
  }, []);
  const [updateTime, setUpdateTime] = useState<string>(
    `Обновлено ${moment().format(
      "DD MMMM YYYY"
    )} в ${moment().hours()}:${moment().minute()} `
  );
  function updateData() {
    setUpdateTime(
      `Обновлено ${moment().format(
        "DD MMMM YYYY"
      )} в ${moment().hours()}:${moment().minute()}`
    );
  }

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Row justify={"space-between"} className="p-3">
          <Col span={18}>
            <Row>
              <span className="opacity-80">{updateTime} </span>
              <div className="text-2xl mx-5 leading-5 text-[#1B3452] opacity-80	 ">
                &bull;{" "}
              </div>
              <div
                className=" text-blue-700 opacity-85 cursor-pointer opacity-80"
                onClick={updateData}
              >
                Обновить
              </div>
            </Row>

            <Row style={{ marginTop: 32 }}>
              <Title level={3}>Аналитика</Title>
            </Row>
            <Row>
              <span>
                Здесь отображена статистика о заявках и работе минестерства{" "}
              </span>
            </Row>
          </Col>
          {/* <Col span={4}>
            <img
              width={297}
              height={140}
              src={"/img/products-logo.png"}
              alt="product"
            ></img>
          </Col> */}
        </Row>
        <Row gutter={16}>
          <ChartWidgetWidthControl />
          <RightInfoWidget />
        </Row>
        <StatisticByProducts />
      </Col>
    </Row>
  );
}
