import React, { useEffect } from "react";
import { Col, Row, Table, Modal, Button, Input, Select, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";

import adminServices from "../../../services/admin";
import lib from "../../../lib/lib";

import serviceTypes from "../../../models/serviceTypes";
import TextArea from "antd/lib/input/TextArea";
import { ITask } from "../../../shared-interfaces/ITask";
import { IService } from "../../../shared-interfaces/IService";
import { useAppSelector } from "../../../redux/hooks";
import tasksStatus from "../../../models/taskStatus";
import { ColumnType } from "antd/es/table";

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
  const reduxData = useAppSelector((state) => state.app);
  const auth: string = reduxData.authToken;
  const [form] = Form.useForm();

  const columns: ColumnType<ITask>[] = [
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
      title: "Исполнительный орган",
      dataIndex: "serviceId",
      width: "50px",
      render: (data: number, record: ITask) => {
        return <div>{lib.getInstanceName(data, reduxData.services)}</div>;
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
      title: "Статус",
      dataIndex: "statusId",
      width: "100px",
      render: (text: number) => {
        return <div>{lib.getStatus(text)}</div>;
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

  useEffect(() => {
    form.setFieldsValue(choosenRecord);
  }, [choosenRecord]);

  function onFinish(values: ITask) {
    values.id = choosenRecord?.id!;
    adminServices.updateTask(auth, values).then((res: any) => {
      _props.setIsDataUpdated(true);
      setIsEditModaleVisible(false);
      form.resetFields();
    });
  }

  function renderServices() {
    return reduxData.services.map((elem: IService) => {
      return (
        <Option key={elem.id} value={elem.id}>
          {elem.name}
        </Option>
      );
    });
  }
  function renderStatuses() {
    return Object.keys(tasksStatus).map((key) => {
      return (
        <Option key={key} value={tasksStatus[key]}>
          {tasksStatus[key]}
        </Option>
      );
    });
  }

  function renderserviceTypes() {
    return Object.keys(serviceTypes).map((key) => {
      return (
        <Option key={key} value={key}>
          {serviceTypes[key]}
        </Option>
      );
    });
  }

  return (
    <Row>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={_props.data}
          loading={_props.isLoading}
          scroll={{ x: 1000 }}
        />
      </Col>

      <Modal
        visible={isEditModaleVisible}
        footer={null}
        onCancel={() => setIsEditModaleVisible(false)}
        title={`Редактирование задания №${choosenRecord?.id}`}
      >
        {" "}
        <Form form={form} onFinish={onFinish}>
          <Row justify="space-between">
            <Col span={24}>
              <Form.Item name="serviceId">
                <Select placeholder="Выберите орган">{renderServices()}</Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="typeId">
                <Select placeholder="Выберите тип задания">
                  {renderserviceTypes()}
                </Select>
              </Form.Item>
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
