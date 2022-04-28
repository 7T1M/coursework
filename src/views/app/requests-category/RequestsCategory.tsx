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
import { useEffect } from "react";
import { selectRoute } from "../../../redux/sideNavSlice";
import adminServices from "../../../services/admin";
import { setClaimTypes } from "../../../redux/appSlice";
import { IClaimType } from "../../../shared-interfaces/IClaimType";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { IService } from "../../../shared-interfaces/IService";

const { Title } = Typography;
const { Option } = Select;

export default function RequestsCategory() {
  const [form] = Form.useForm();
  const auth = useAppSelector((state) => state.app.authToken);
  const [categories, setCategories] = useState<Array<IClaimType>>([]);
  const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false);
  const [isCreateClaimModalVisible, setIsCreateClaimModalVisible] =
    useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [data, setData] = useState<IClaimType[]>();
  const reduxData = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(selectRoute("requests-categories"));

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
      .then(() => {
        setIsDataUpdated(true);
        setIsCreateClaimModalVisible(false);
        form.resetFields();
      })
      .catch((err: Error) => console.error(err));
  }

  function onFinish(values: IClaimType) {
    values.priority = parseInt(values.priority);
    createClaimType(values);
  }
  function searchInDataTableData(str: string) {
    return categories.filter((category) =>
      category.name.toLocaleLowerCase().includes(str.toLowerCase())
    );
  }
  function setSearchFilter(query: string): void {
    setData(searchInDataTableData(query));
  }
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Row justify={"space-between"} className="p-3">
          <Col span={18}>
            <Row>
              <span className="opacity-80">{updateTime} </span>
              <div className="text-2xl mx-3 mt-px leading-5 text-[#1B3452] opacity-80	 ">
                &bull;{" "}
              </div>
              <div
                className=" text-blue-700 opacity-85 cursor-pointer opacity-70 hover:opacity-100"
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
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card>
              <Row justify={"space-between"}>
                <Col span={12}>
                  <Input
                    placeholder="Поиск по имени..."
                    prefix={<SearchOutlined className="site-form-item-icon" />}
                    onChange={(e) => setSearchFilter(e.target.value)}
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
                      <Select
                        style={{ width: "100%" }}
                        defaultValue={10}
                        value={pageSize}
                        onChange={(e) => setPageSize(e)}
                      >
                        <Option value={10}>Показывать по 10шт.</Option>
                        <Option value={20}>Показывать по 20шт.</Option>
                        <Option value={50}>Показывать по 50шт.</Option>
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
              <RequestsCategoryTable
                data={data ?? categories}
                setIsDataUpdated={setIsDataUpdated}
                auth={auth}
                isDataLoading={isDataLoading}
                pageSize={pageSize}
                setPageSize={setPageSize}
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
                    <Select placeholder="Исполнительный орган">
                      {reduxData.services.map((service: IService) => (
                        <Option key={service.id!} value={service.id}>
                          {service.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="serviceControlId">
                    <Select placeholder="Контролирующий орган">
                      {reduxData.services.map((service: IService) => (
                        <Option key={service.id!} value={service.id}>
                          {service.name}
                        </Option>
                      ))}
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
              {/* <Row>
                <Col span={12}>
                  <Form.Item name="priority">
                    <Select placeholder="Приоритет">
                      {[...Array(10).keys()].map((priority: number) => (
                        <Option key={priority} value={priority + 1}>
                          {priorityTag(priority + 1)}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row> */}
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
