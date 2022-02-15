import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Col,
  Row,
  Modal,
  Form,
  Typography,
  Select,
  Input,
  Button,
  Card,
} from "antd";
import TransportTable from "./TransportTable";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectRoute } from "../../../redux/sideNavSlice";
import adminServices from "../../../services/admin";
import { setRoutes } from "../../../redux/appSlice";
import { IRoute } from "../../../shared-interfaces/IRoute";

const { Title } = Typography;
const { Option } = Select;

export default function Transport() {
  const [form] = Form.useForm();
  const auth = useSelector((state: any) => state.app.authToken);
  const dispatch = useDispatch();
  const [routes, setLocalRoutes] = useState<Array<IRoute>>([]);
  const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false);
  const [isCreateModalVisible, setIsCreateModalVisible] =
    useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const reduxData = useSelector((state: any) => state.app);

  useEffect(() => {
    dispatch(selectRoute("transport"));
    reduxData.logger.userChangePage("transport");

    getRoutes();
  }, []);
  useEffect(() => {
    if (isDataUpdated) {
      getRoutes();
    } else return;
  }, [isDataUpdated]);

  const [updateTime, setUpdateTime] = useState(
    `Обновлено ${moment().format(
      "DD MMMM YYYY"
    )} в ${moment().hours()}:${moment().minute()} `
  );
  function updateData() {
    getRoutes();
    setUpdateTime(
      `Обновлено ${moment().format(
        "DD MMMM YYYY"
      )} в ${moment().hours()}:${moment().minute()}`
    );
  }
  function getRoutes() {
    setIsDataLoading(true);
    adminServices
      .getRoutes(auth)
      .then((res:any) => {
       ;
        setLocalRoutes(res.data.data);
        setIsDataUpdated(false);
        setIsDataLoading(false);
        setRoutes(res.data.data);
      })
      .catch((err:any) => console.error(err));
  }
  function onFinish(values: IRoute) {
    adminServices
      .createRoute(auth, values)
      .then((res:any) => {
        setIsDataUpdated(true);
       ;
        setIsCreateModalVisible(false);
      })
      .catch((err:any) => console.error(err))
      .finally(() => form.resetFields());
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
              <Title level={3}>Маршруты</Title>
            </Row>
            <Row>
              <span>Полная информация о маршрутах</span>
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
              <TransportTable
                data={routes}
                setIsDataUpdated={setIsDataUpdated}
                auth={auth}
                isDataLoading={isDataLoading}
              />
            </Card>
          </Col>
        </Row>
      </Col>
      <Modal
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        title={"Создание маршрута"}
      >
        <Form form={form} onFinish={onFinish}>
          <Row>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Form.Item name="routeName">
                    <Input placeholder="Название Маршрута" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="startPointId">
                    <Select placeholder="Точка отправления">
                      {reduxData.points.map((item: any) => (
                        <Option value={`${item.id}`}>{item.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="endPointId">
                    <Select placeholder="Точка назначения">
                      {reduxData.points.map((item: any) => (
                        <Option value={`${item.id}`}>{item.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="cityId">
                    <Select placeholder="Город">
                      {reduxData.cities.map((item: any) => (
                        <Option value={`${item.id}`}>{item.name}</Option>
                      ))}
                    </Select>
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
