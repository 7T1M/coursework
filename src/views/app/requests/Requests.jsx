import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Input, Card, Select, Typography } from "antd";
import RequestsTable from "./RequestsTable";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectRoute } from "../../../redux/sideNavSlice";
import adminServices from "../../../services/admin";

import tasks from "./data";
const { Title } = Typography;
const { Option } = Select;

export default function Requests() {
  const [claims, setClaims] = useState();
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state) => state.app.authToken);
  const logger = useSelector((state) => state.app.logger);

  useEffect(() => {
    dispatch(selectRoute("claims"));
    logger.userChangePage("claims");

    getClaims();
  }, []);
  const [updateTime, setUpdateTime] = useState(
    `Обновлено ${moment().format(
      "DD MMMM YYYY"
    )} в ${moment().hours()}:${moment().minute()} `
  );
  function updateData() {
    getClaims();
    setUpdateTime(
      `Обновлено ${moment().format(
        "DD MMMM YYYY"
      )} в ${moment().hours()}:${moment().minute()}`
    );
  }
  function getClaims() {
    setIsLoading(true);
    adminServices.getClaims(auth).then((res) => {
      setClaims(res.data.data);
      setIsLoading(false);
      setIsDataUpdated(false);
    });
  }
  useEffect(() => {
    if (isDataUpdated) {
      updateData();
    } else return;
  }, [isDataUpdated]);

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
              <Title level={3}>Заявки</Title>
            </Row>
            <Row>
              <span>Полная информация о заявках</span>
            </Row>
          </Col>
          <Col span={4}></Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card>
              <Row justify={"space-between"}>
                <Col span={12}>
                  <Input
                    placeholder="Поиск по артикулу..."
                    prefix={<SearchOutlined className="site-form-item-icon" />}
                  />
                </Col>
                <Col span={7}>
                  <Row justify={"center"}>
                    <Col style={{ width: "100%" }}>
                      <Select style={{ width: "100%" }} defaultValue={250}>
                        <Option value={250}>Показывать по 250шт.</Option>
                        <Option value={500}>Показывать по 500шт.</Option>
                        <Option value={1000}>Показывать по 1000шт.</Option>
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card>
              <RequestsTable
                setIsDataUpdated={setIsDataUpdated}
                auth={auth}
                isLoading={isLoading}
                tasks={claims}
              />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
