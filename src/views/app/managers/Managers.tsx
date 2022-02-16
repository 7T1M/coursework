import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Input,
  Card,
  Select,
  Typography,
  Button,
  Form,
  Modal,
} from "antd";
import ManagersTable from "./ManagersTable";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectRoute } from "../../../redux/sideNavSlice";
import adminServices from "../../../services/admin";
import { IService } from "../../../shared-interfaces/IService";
import Logger from "../../../logger/Logger";
import { RootState, AppDispatch } from "../../../store";
import { useAppSelector,useAppDispatch } from "../../../redux/hooks";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function Managers() {
  const [form] = Form.useForm();
  const auth = useAppSelector((state) => state.app.authToken);
  const [managers, setManagers] = useState<Array<IService>>([]);
  const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false);
  const [isCreateModalVisible, setIsCreateModalVisible] =
    useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const logger: Logger = useAppSelector((state) => state.app.logger!);
  useEffect(() => {
    dispatch(selectRoute("managers"));
    logger.userChangePage("managers");

    getServices();
  }, []);

  useEffect(() => {
    if (isDataUpdated) {
      getServices();
      setIsDataUpdated(false);
    } else return;
  }, [isDataUpdated]);

  const [updateTime, setUpdateTime] = useState<string>(
    `Обновлено ${moment().format(
      "DD MMMM YYYY"
    )} в ${moment().hours()}:${moment().minute()} `
  );
  function updateData() {
    getServices();
    setUpdateTime(
      `Обновлено ${moment().format(
        "DD MMMM YYYY"
      )} в ${moment().hours()}:${moment().minute()}`
    );
  }
  function getServices() {
    setIsDataLoading(true);
    adminServices
      .getServices(auth)
      .then((res: any) => {
        setManagers(res.data.data);
        setIsDataLoading(false);
      })
      .catch((err: any) => console.error(err));
  }

  function onFinish(values: IService) {
    adminServices
      .createService(auth, values)
      .finally(() => {
        setIsDataUpdated(true);
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
                onClick={updateData}
              >
                Обновить
              </div>
            </Row>
            <Row style={{ marginTop: 32 }}>
              <Title level={3}>Органы</Title>
            </Row>
            <Row>
              <span>Полная информация о заявках</span>
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
              <ManagersTable data={managers} isDataLoading={isDataLoading} />
            </Card>
          </Col>
        </Row>
      </Col>
      <Modal
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        width={800}
        title={`Создание нового органа`}
      >
        <Form form={form} onFinish={onFinish}>
          <Row>
            <Col span={24}>
              <Row justify="space-between">
                <Col span={11}>
                  <Form.Item name="name">
                    <Input placeholder="Имя" />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name="contactPhone">
                    <Input type="number" placeholder="Номер телефона" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col span={11}>
                  <Form.Item name="contactEmail">
                    <Input placeholder="Почта" />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name="telegramToken">
                    <Input placeholder="Телеграм ключ" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col span={11}>
                  <Form.Item name="website">
                    <Input placeholder="Веб-сайт" />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name="serviceType">
                    <Select placeholder="Тип">
                      {" "}
                      <Option value="1">Контролирующий</Option>{" "}
                      <Option value="2">Исполняющий</Option>{" "}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center">
                <Col span={11}>
                  {" "}
                  <Form.Item name="description">
                    <TextArea placeholder="Описание" rows={16} />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center">
                <Button htmlType="submit" type="primary">
                  Добавить
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Row>
  );
}
