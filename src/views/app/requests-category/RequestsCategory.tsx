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
  Modal,
  Form,
  Tag,
} from "antd";
import RequestsCategoryTable from "./RequestsCategoryTable";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectRoute } from "../../../redux/sideNavSlice";
import adminServices from "../../../services/admin";
import { setClaimTypes } from "../../../redux/appSlice";
import { IClaimType } from "../../../shared-interfaces/IClaimType";
import { AppDispatch, RootState } from "../../../store";
const { Title } = Typography;
const { Option } = Select;

export default function RequestsCategory() {
  const [form] = Form.useForm();
  const auth = useSelector((state: RootState) => state.app.authToken);
  const [categories, setCategories] = useState<Array<IClaimType>>([]);
  const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false);
  const [isCreateClaimModalVisible, setIsCreateClaimModalVisible] =
    useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const logger = useSelector((state: RootState) => state.app.logger!);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(selectRoute("requests-categories"));
    logger.userChangePage("requests-categories");

    getCategories();
  }, []);
  useEffect(() => {
    if (isDataUpdated) {
      getCategories();
    }
  }, [isDataUpdated]);

  const [updateTime, setUpdateTime] = useState<string>(
    `Обновлено ${moment().format(
      "DD MMMM YYYY"
    )} в ${moment().hours()}:${moment().minute()} `
  );
  function updateData() {
    getCategories();
    setUpdateTime(
      `Обновлено ${moment().format(
        "DD MMMM YYYY"
      )} в ${moment().hours()}:${moment().minute()}`
    );
  }
  function getCategories() {
    setIsDataLoading(true);
    adminServices.getClaimCategories(auth).then((res: any) => {
      setIsDataUpdated(false);
      setCategories(res.data.data);
      setIsDataLoading(false);
      setClaimTypes(res.data.data);
    });
  }
  function createClaimType(data: IClaimType) {
    adminServices
      .createClaimType(auth, data)
      .then((res: any) => {
        setIsDataUpdated(true);
        setIsCreateClaimModalVisible(false);
        form.resetFields();
      })
      .catch((err: any) => console.error(err));
  }
  function priorityTag(priority: number) {
    if (priority <= 3) {
      return <Tag color={"green"}>Низкий</Tag>;
    } else if (priority > 3 && priority <= 6) {
      return <Tag color={"orange"}>Средний</Tag>;
    } else if (priority > 6) {
      return <Tag color={"red"}>Высокий</Tag>;
    }
  }
  function onFinish(values: IClaimType) {
    values.priority = parseInt(values.priority);
    createClaimType(values);
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
              <Title level={3}>Категории заявок</Title>
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
                <Col>
                  <Button
                    onClick={() => setIsCreateClaimModalVisible(true)}
                    type="primary"
                  >
                    Создать
                  </Button>
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
              <RequestsCategoryTable
                data={categories}
                setIsDataUpdated={setIsDataUpdated}
                auth={auth}
                isDataLoading={isDataLoading}
              />
            </Card>
          </Col>
        </Row>
      </Col>
      <Modal
        visible={isCreateClaimModalVisible}
        footer={null}
        width={800}
        onCancel={() => setIsCreateClaimModalVisible(false)}
        title={`Создание категории`}
      >
        <Form form={form} onFinish={onFinish}>
          <Row>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Form.Item name="serviceExecuteId">
                    <Select placeholder="Контролирующий орган">
                      <Option value="1">1</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="serviceControlId">
                    <Select placeholder="Контролирующий орган">
                      <Option value="1">1</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="name">
                    <Input placeholder="Название" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="mnemonicName">
                    <Input placeholder="Мнемоническое имя" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="tag">
                    <Input placeholder="Тэг" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="priority">
                    <Select placeholder="Приоритет">
                      <Option value="1">{priorityTag(1)}</Option>
                      <Option value="5">{priorityTag(5)}</Option>
                      <Option value="10">{priorityTag(10)}</Option>
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
