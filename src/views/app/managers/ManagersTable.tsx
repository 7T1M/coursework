import {
  Col,
  Row,
  Table,
  Modal,
  Form,
  Typography,
  Input,
  Select,
  Button,
} from "antd";
import {  EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import React from "react";
import { IService } from "../../../shared-interfaces/IService";
const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

interface IManagersTableProps {
  data: Array<IService>;
  isDataLoading: boolean;
}

const ManagersTable: React.FC<IManagersTableProps> = ({
  data,
  isDataLoading,
}) => {
  const [isProfileModaleVisible, setIsProfileModaleVisible] =
    useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [choosenRecord, setChoosenRecord] = useState<IService>();

  const columns = [
    {
      title: "Номер",
      width: "50px",
      dataIndex: "id",
    },
    {
      title: "Имя",
      width: "300px",
      dataIndex: "name",
    },
    {
      title: "Телефон",
      dataIndex: "contactPhone",
    },

    {
      title: "Почта",
      dataIndex: "contactEmail",
    },
    {
      title: "Telegram ключ",
      dataIndex: "telegramToken",
    },
    {
      title: "Веб-сайт",
      dataIndex: "website",
    },
    {
      title: "Описание",
      dataIndex: "description",
      render: (text: string) => {
        if (text.length > 70) {
          return <div>{text.slice(0, 70) + "..."}</div>;
        } else return <div>{text}</div>;
      },
    },
    {
      title: "Тип",
      dataIndex: "serviceType",
      render: (data: number) => {
        return serviceTypeForUser(data);
      },
    },
    {
      title: "Действия",
      dataIndex: "",
      width: "200px",

      render: (record: IService) => {
        return (
          <Row justify="space-between">
            <Col className="cursor-pointer text-xl" span={8}>
              <EyeOutlined
                onClick={() => {
                  setIsProfileModaleVisible(true);
                  setChoosenRecord(record);
                }}
              />
            </Col>
            {/* <Col className="cursor-pointer text-xl" span={8}>
              <EditOutlined
                onClick={() => {
                  setIsEditModalVisible(true);
                  setChoosenRecord(record);
                }}
              />
            </Col> */}
          </Row>
        );
      },
    },
  ];

  function serviceTypeForUser(type: number) {
    if (type === 1) {
      return "Контролирующий";
    } else if (type === 2) {
      return "Исполняющий";
    }
  }

  function onFinish(values: IService) {
    console.log(values);
  }

  return (
    <Row>
      <Col span={24}>
        <Table
          columns={columns}
          //   pagination={{
          //     position: ["bottomRight"],
          //     pageSize: 250,
          //     showSizeChanger: false,
          //     total: count,
          //   }}
          dataSource={data}
          scroll={{ x: 1000 }}
          loading={isDataLoading}
        />
      </Col>
      <Modal
        visible={isProfileModaleVisible}
        onCancel={() => setIsProfileModaleVisible(false)}
        footer={null}
        width={800}
        title={`${choosenRecord?.name}`}
      >
        {" "}
        <Row justify="space-between">
          <Col span={11}>
            <Row>
              <Col span={24}>
                <Title level={3}>Название:</Title>

                <Row>{choosenRecord?.name}</Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Телефон:
                </Title>
                <Row> {choosenRecord?.contactPhone}</Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Почта:
                </Title>
                <Row> {choosenRecord?.contactEmail}</Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Тип
                </Title>
                <Row> {serviceTypeForUser(choosenRecord?.serviceType!)}</Row>
              </Col>
            </Row>
          </Col>
          <Col span={11}>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Телеграм ключ:
                </Title>
                <Row> {choosenRecord?.telegramToken}</Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Веб-сайт:
                </Title>
                <Row> {choosenRecord?.website}</Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Описание:
                </Title>
                <TextArea rows={4} value={choosenRecord?.description} readOnly />
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
      <Modal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={800}
        title={`Редактирование органа №${choosenRecord?.id} `}
      >
        <Form onFinish={onFinish}>
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
                  {" "}
                  <Form.Item name="description">
                    <TextArea placeholder="Описание" rows={8} />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center">
                <Col span={12}>
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
};

export default ManagersTable;
