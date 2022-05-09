import {
  Col,
  Row,
  Table,
  Modal,
  Form,
  Typography,
  Select,
  Input,
  Button,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import adminServices from "../../../services/admin";
import lib from "../../../lib/lib";
import { IRoute } from "../../../shared-interfaces/IRoute";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";

import IPoint from "../../../shared-interfaces/IPoint";
import ICity from "../../../shared-interfaces/ICity";
import { ColumnType } from "antd/es/table";
const { confirm } = Modal;
const { Title } = Typography;
const { Option } = Select;
function showDeleteConfirm(id: number, setIsDataUpdated: any, auth: string) {
  confirm({
    title: "Вы уверены что хотите удалить эту запись?",
    icon: <ExclamationCircleOutlined />,
    content: "это действие необратимо",
    okText: "Да",
    okType: "danger",
    cancelText: "Нет",
    centered: true,
    onOk() {
      adminServices
        .deleteRoute(auth, id)
        .then(() => {
          setIsDataUpdated(true);
        })
        .catch((err: any) => console.error(err));
    },
    onCancel() {},
  });
}

interface ITransportTableProps {
  data: Array<IRoute>;
  setIsDataUpdated: any;
  isDataLoading: boolean;
  auth: string;
}

const TransportTable: React.FC<ITransportTableProps> = ({
  data,
  setIsDataUpdated,
  auth,
  isDataLoading,
}) => {
  const [isProfileModaleVisible, setIsProfileModaleVisible] =
    useState<boolean>(false);
  const [isEditModaleVisible, setIsEditModaleVisible] =
    useState<boolean>(false);
  const [choosenRecord, setChoosenRecord] = useState<IRoute>();
  const reduxData = useAppSelector((state) => state.app);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(choosenRecord);
  }, [choosenRecord]);

  const columns: ColumnType<IRoute>[] = [
    {
      title: "Номер",
      width: "115px",
      dataIndex: "id",
    },
    {
      title: "Маршрут",
      width: "30px",
      dataIndex: "routeName",
    },

    {
      title: "Точка отправления",
      dataIndex: "startPointId",
      width: "150px",
      render: (text: number) => {
        return <div>{lib.getInstanceName(text, reduxData.points)}</div>;
      },
    },
    {
      title: "Точка назначения",
      dataIndex: "endPointId",
      width: "150px",
      render: (text: number) => {
        return <div>{lib.getInstanceName(text, reduxData.points)}</div>;
      },
    },
    {
      title: "Город",
      dataIndex: "cityId",
      render: (data: number) => {
        return <div>{lib.getInstanceName(data, reduxData.cities)}</div>;
      },
    },
    {
      title: "Действия",
      dataIndex: "",
      width: "200px",
      render: (record: IRoute) => {
        return (
          <Row justify="space-around">
            <Col className="cursor-pointer text-xl">
              <DeleteOutlined
                onClick={() =>
                  showDeleteConfirm(record.id!, setIsDataUpdated, auth)
                }
              />
            </Col>
            <Col className="cursor-pointer text-xl">
              <EditOutlined
                onClick={() => {
                  setIsEditModaleVisible(true);
                  setChoosenRecord(record);
                }}
              />
            </Col>
          </Row>
        );
      },
    },
  ];

  function onFinish(values: IRoute) {
    values.id = choosenRecord?.id;
    adminServices
      .updateRoute(auth, values)
      .finally(() => {
        setIsEditModaleVisible(false);
        setIsDataUpdated(true);
        form.resetFields();
      })
      .catch((err: any) => console.error(err));
  }

  return (
    <Row>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1000 }}
          loading={isDataLoading}
        />
      </Col>

      <Modal
        visible={isEditModaleVisible}
        onCancel={() => setIsEditModaleVisible(false)}
        footer={null}
        title={`Редактирование маршрута №${choosenRecord?.id}`}
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
                      {reduxData.points.map((item: IPoint) => (
                        <Option key={item.id} value={`${item.id}`}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="endPointId">
                    <Select placeholder="Точка назначения">
                      {reduxData.points.map((item: IPoint) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="cityId">
                    <Select placeholder="Город">
                      {reduxData.cities.map((item: ICity) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
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
};

export default TransportTable;
