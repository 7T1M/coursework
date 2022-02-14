import React from "react";
import {
  Col,
  Row,
  Table,
  Tag,
  Modal,
  Typography,
  Button,
  Input,
  Select,
  Checkbox,
  Form,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";

import { useSelector } from "react-redux";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import httpService from "../../../services/admin";
import { getStatus } from "../../../lib/getStatus";
import { getService } from "../../../lib/getService";
import status from "../../../constants/status";
import taskTypes from "../../../constants/taskTypes";
import TextArea from "antd/lib/input/TextArea";
import { ITask } from "../../../shared-interfaces/ITask";

const { confirm } = Modal;
const { Title } = Typography;
const { Option } = Select;

interface ITasksTableProps {
  data: Array<ITask>;
  setIsDataUpdated: any;
  isLoading: boolean;
}

const TasksTable: React.FC<ITasksTableProps> = (_props) => {
  const [isProfileModaleVisible, setIsProfileModaleVisible] =
    useState<boolean>(false);
  const [isEditModaleVisible, setIsEditModaleVisible] =
    useState<boolean>(false);
  const [choosenRecord, setChoosenRecord] = useState<ITask>();
  const reduxData = useSelector((state: any) => state.app);
  const auth: string = reduxData.authToken;
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Номер ",
      width: "115px",
      dataIndex: "id",
    },
    {
      title: "Номер заявки",
      width: "120px",
      dataIndex: "claimId",
    },
    {
      title: "Орган",
      dataIndex: "serviceId",
      width: "50px",
      render: (data: string, record: ITask) => {
        return <div>{getService(data, reduxData.services)}</div>;
      },
    },

    {
      title: "Категория",
      dataIndex: "typeId",
      width: "50px",
      render: (data: number) => {
        if (data === 0) {
          return "Контролирующий";
        } else {
          return "Исполнительный";
        }
      },
    },
    {
      title: "Рейтинг",
      dataIndex: "rate",
      width: "50px",

      render: (data: number) => {
        if (data) {
          if (data < 33) {
            return <Tag color={"red"}>{data}</Tag>;
          } else if (data >= 33 && data < 66) {
            return <Tag color={"yellow"}>{data}</Tag>;
          } else if (data >= 66) {
            return <Tag color={"green"}>{data}</Tag>;
          }
        } else {
          return "Нет рейтинга ";
        }
      },
    },
    {
      title: "Статус",
      dataIndex: "statusId",
      width: "100px",
      render: (text: number) => {
        return <div>{getStatus(text)}</div>;
      },
    },
    {
      title: "Действия",
      dataIndex: "",
      width: "100px",

      render: (record: ITask) => {
        return (
          <Row justify="space-between">
            <Col className="cursor-pointer text-xl" span={8}>
              <EditOutlined
                onClick={() => {
                  setChoosenRecord(record);
                  setIsEditModaleVisible(true);
                }}
              />
            </Col>
          </Row>
        );
      },
    },
  ];

  function verificationTag(status: string) {
    if (status === "Да") {
      return <Tag color={"green"}>{status}</Tag>;
    } else {
      return <Tag color={"red"}>{status}</Tag>;
    }
  }
  function ratingTag(rate: number) {
    if (rate < 33) {
      return <Tag color={"red"}>{rate}</Tag>;
    } else if (rate >= 33 && rate < 66) {
      return <Tag color={"yellow"}>{rate}</Tag>;
    } else if (rate >= 66) {
      return <Tag color={"green"}>{rate}</Tag>;
    }
  }
  function onFinish(values:ITask) {
    values.id = choosenRecord?.id!;
    console.log(values);
    httpService.updateTask(auth, values).then((res) => {
      _props.setIsDataUpdated(true);
      setIsEditModaleVisible(false);
      form.resetFields();
    });
  }

  function renderServices() {
    // return reduxData.services.map((elem, index) => {
    //   return <Option value={elem.id}>{elem.name}</Option>;
    // });
  }

  function renderStatuses() {
    return status.map((elem, index) => {
      return <Option value={elem.id}>{elem.name}</Option>;
    });
  }

  function renderTaskTypes() {
    return taskTypes.map((elem, index) => {
      return <Option value={elem.id}>{elem.name}</Option>;
    });
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
          dataSource={_props.data}
          loading={_props.isLoading}
          scroll={{ x: 1000 }}
        />
      </Col>
      <Modal
        visible={isProfileModaleVisible}
        onCancel={() => setIsProfileModaleVisible(false)}
        footer={null}
        title={`Просмотр пользователя №${choosenRecord?.id}`}
      >
        {/* <Row justify="space-between">
          <Col span={11}>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Имя: {choosenRecord?.name}
                </Title>{" "}
              </Col>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Логин: {choosenRecord?.login}
                </Title>{" "}
              </Col>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Роль: {choosenRecord?.role}
                </Title>{" "}
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Верефицирован: {verificationTag(choosenRecord?.verified)}
                </Title>{" "}
              </Col>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Рейтинг: {ratingTag(choosenRecord?.rating)}
                </Title>{" "}
              </Col>
            </Row>
          </Col>
        </Row> */}
      </Modal>
      <Modal
        visible={isEditModaleVisible}
        footer={null}
        onCancel={() => setIsEditModaleVisible(false)}
        title={`Редактирование задания №${choosenRecord?.id}`}
      >
        {" "}
        <Form form={form} onFinish={onFinish}>
          <Row justify="space-between">
            <Col span={11}>
              <Row>
                <Col span={24}>
                  <Form.Item name="claimId">
                    <Input placeholder="ID заявки" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item name="serviceId">
                    <Select placeholder="Выберите орган">
                      {/* {renderServices()} */}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={11}>
              <Row>
                <Col span={24}>
                  <Form.Item name="typeId">
                    <Select placeholder="Выберите тип задания">
                      {renderTaskTypes()}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item name="rate">
                    <Input placeholder="Укажите рейтинг" type="number"></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="statusId">
                <Select placeholder="Укажите статус задания">
                  {renderStatuses()}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ marginTop: "10px" }}>
              <Form.Item name="explanation">
                <TextArea rows={8} placeholder="Укажите объяснение" />
              </Form.Item>
            </Col>
            <Col span={24} style={{ marginTop: "10px" }}>
              <Form.Item name="description">
                <TextArea rows={8} placeholder="Укажите описание" />
              </Form.Item>
            </Col>
          </Row>
          <Row className="pt-5" justify="center">
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
          </Row>
        </Form>
      </Modal>
    </Row>
  );
};

export default TasksTable;
