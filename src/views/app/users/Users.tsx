import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Input, Card, Select, Typography } from "antd";
import Flex from "../../../components/Flex";
import UsersTable from "./UsersTable";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectRoute } from "../../../redux/sideNavSlice";
import ChartWidget from "../../../components";
import { weeklyActiveData } from "./chartData";
import adminServices from "../../../services/admin";

const { Title } = Typography;
const { Option } = Select;

export default function Users() {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.app.authToken);
  const [users, setUsers] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const logger = useSelector((state: any) => state.app.logger);

  useEffect(() => {
    dispatch(selectRoute("users"));
    logger.userChangePage("users");

    getUsers();
  }, []);
  useEffect(() => {
    if (isDataUpdated) {
      getUsers();
    } else return;
  }, [isDataUpdated]);

  const [updateTime, setUpdateTime] = useState<string>(
    `Обновлено ${moment().format(
      "DD MMMM YYYY"
    )} в ${moment().hours()}:${moment().minute()} `
  );

  function updateData() {
    getUsers();
    setUpdateTime(
      `Обновлено ${moment().format(
        "DD MMMM YYYY"
      )} в ${moment().hours()}:${moment().minute()}`
    );
  }

  function getUsers() {
    setIsDataLoading(true);
    adminServices
      .getUsers(auth)
      .then((res: any) => {
        setUsers(res.data.data);
        setIsDataUpdated(false);
        setIsDataLoading(false);
      })
      .catch((err: any) => console.error(err));
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
              <Title level={3}>Пользователи</Title>
            </Row>
            <Row>
              <span>Полная информация о пользователях</span>
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
        <Card>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={24} lg={8}>
                    <Flex className="h-100" flexDirection="column">
                      <div>
                        <h4 className="mb-0">Недельная активность</h4>
                        <span className="text-muted">23 - 30 Янв, 2022</span>
                      </div>
                      <div className="mb-4">
                        <h1 className="font-weight-bold">
                          ~100 пользователей ежедневно
                        </h1>
                      </div>
                    </Flex>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={16}>
                    <ChartWidget
                      card={false}
                      series={weeklyActiveData.series}
                      xAxis={weeklyActiveData.categories}
                      title="Активность пользователей за неделю"
                      height={250}
                      type="bar"
                      customOptions={{ colors: "#3e82f7" }}
                      extra={undefined}
                      loading={undefined}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Card>

        <Row style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card>
              <Row justify={"space-between"}>
                <Col span={12}>
                  <Input
                    placeholder="Поиск по пользователям..."
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
                {/* <Col>
                  <Row justify={"center"}>
                    <Col>
                      <Button icon={<CloudDownloadOutlined />}>XLS</Button>
                    </Col>
                  </Row>
                </Col> */}
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card>
              <UsersTable
                data={users}
                auth={auth}
                setIsDataUpdated={setIsDataUpdated}
                isDataLoading={isDataLoading}
              />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
