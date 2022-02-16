import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Input,
  Card,
  Select,
  Typography,
  Modal,
  Form,
  Button,
} from "antd";
import DriversTable from "./DriversTable";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectRoute } from "../../../redux/sideNavSlice";
import adminServices from "../../../services/admin";
import { IDriver } from "../../../shared-interfaces/IDriver";
import { RootState, AppDispatch } from "../../../store";
const { Title } = Typography;
const { Option } = Select;

export default function Drivers() {
  const [form] = Form.useForm();

  const auth = useSelector((state: RootState) => state.app.authToken);
  const dispatch: AppDispatch = useDispatch();
  const [drivers, setDrivers] = useState<Array<IDriver>>([]);
  const [updateData, setUpdateData] = useState<boolean>(false);
  const [isCreateModalVisible, setIsCreateModalVisible] =
    useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const reduxData = useSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(selectRoute("drivers"));
    reduxData.logger!.userChangePage("drivers");

    getDrivers();
  }, []);
  useEffect(() => {
    if (updateData) {
      getDrivers();
      setUpdateData(false);
    } else return;
  }, [updateData]);

  const [updateTime, setUpdateTime] = useState(
    `Обновлено ${moment().format(
      "DD MMMM YYYY"
    )} в ${moment().hours()}:${moment().minute()} `
  );
  function dateUpdateData() {
    setUpdateTime(
      `Обновлено ${moment().format(
        "DD MMMM YYYY"
      )} в ${moment().hours()}:${moment().minute()}`
    );
  }
  function getDrivers() {
    setIsDataLoading(true);
    adminServices
      .getDrivers(auth)
      .then((res: any) => {
        const data: Array<IDriver> = res.data.data;
       
        setDrivers(data);
        dateUpdateData();
        setIsDataLoading(false);
       
      })
      .catch((err: any) => console.error(err));
  }

  function onFinish(values: IDriver) {
    adminServices
      .createDriver(auth, values)
      .finally(() => {
        setUpdateData(true);
        setIsCreateModalVisible(false);
        form.resetFields();
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
                onClick={dateUpdateData}
              >
                Обновить
              </div>
            </Row>
            <Row style={{ marginTop: 32 }}>
              <Title level={3}>Водители</Title>
            </Row>
            <Row>
              <span>Полная информация о водителях</span>
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
                <Button
                  type="primary"
                  onClick={() => setIsCreateModalVisible(true)}
                >
                  Создать
                </Button>
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
              <DriversTable
                auth={auth}
                setIsDataUpdated={setUpdateData}
                data={drivers}
                isDataLoading={isDataLoading}
              />{" "}
            </Card>
          </Col>
        </Row>
      </Col>
      <Modal
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        width={800}
        title={`Добавление водителя`}
      >
        <Form onFinish={onFinish}>
          <Row>
            <Col span={24}>
              {/* <Row>
                <Col span={12}>
                  <Form.Item name="firstName">
                    <Input placeholder="Имя" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="lastName">
                    <Input placeholder="Фамилия" />
                  </Form.Item>
                </Col>
              </Row> */}
              <Row justify="space-between">
                <Col span={11}>
                  <Form.Item name="routeId">
                    <Select placeholder="Маршрут">
                      {reduxData.routes.map((item: any) => (
                        <Option value={`${item.id}`}>{item.routeName}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name="firstName">
                    <Input placeholder="Имя" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col span={11}>
                  <Form.Item name="cityId">
                    <Select placeholder="Город">
                      {reduxData.cities.map((item: any) => (
                        <Option value={`${item.id}`}>{item.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name="lastName">
                    <Input placeholder="Фамилия" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="phone">
                    <Input type="number" placeholder="Номер телефона" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center">
                <Button htmlType="submit" type="primary">
                  Сохранить
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Row>
  );
}
