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
import { useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import httpService from "../../../services/admin";
import { useSelector } from "react-redux";
import { getCity } from "../../../lib/getCity";
import { getPoint } from "../../../lib/getPoint";
import { IRoute } from "../../../shared-interfaces/IRoute";
import React from "react";

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
      httpService
        .deleteRoute(auth, id)
        .then((res) => {
          console.log(res);
          setIsDataUpdated(true);
        })
        .catch((err) => console.log(err));
    },
    onCancel() {
      console.log("Cancel");
    },
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
  const reduxData = useSelector((state: any) => state.app);
  const [form] = Form.useForm();

  const columns = [
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
    // {
    //   title: "Водители",
    //   dataIndex: "drivers",

    //   render: (data, record) => {
    //     return <span> {data}</span>;
    //   },
    // },

    {
      title: "Точка отправления",
      dataIndex: "startPointId",
      width: "150px",
      render: (text: number) => {
        return <div>{getPoint(text, reduxData.points)}</div>;
      },
    },
    {
      title: "Точка назначения",
      dataIndex: "endPointId",
      width: "150px",
      render: (text:number) => {
        return <div>{getPoint(text, reduxData.points)}</div>;
      },
    },
    {
      title: "Город",
      dataIndex: "cityId",
      render: (data: number) => {
        return <div>{getCity(data, reduxData.cities)}</div>;
      },
    },
    {
      title: "Действия",
      dataIndex: "",
      width: "200px",
      render: ( record:IRoute) => {
        return (
          <Row justify="space-between">
            <Col className="cursor-pointer text-xl" span={8}>
              <DeleteOutlined
                onClick={() =>
                  showDeleteConfirm(record.id!, setIsDataUpdated, auth)
                }
              />
            </Col>
            <Col className="cursor-pointer text-xl" span={8}>
              <EyeOutlined
                onClick={() => {
                  setIsProfileModaleVisible(true);
                  setChoosenRecord(record);
                }}
              />
            </Col>
            <Col className="cursor-pointer text-xl" span={8}>
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


  function onFinish(values:IRoute) {
    values.id = choosenRecord?.id;
    httpService
      .updateRoute(auth, values)
      .finally(() => {
        setIsEditModaleVisible(false);
        setIsDataUpdated(true);
        form.resetFields();
      })
      .catch((err) => console.log(err));
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
        visible={isProfileModaleVisible}
        onCancel={() => setIsProfileModaleVisible(false)}
        footer={null}
        title={`Просмотр маршрута №${choosenRecord?.id}`}
      >
        <Row>
          <Col span={24}>
            <Title className="inline-block" level={3}>
              Маршрут: {choosenRecord?.routeName}
            </Title>{" "}
          </Col>
          <Col span={24}>
            <Title className="inline-block" level={3}>
              Точка отправления: {choosenRecord?.startPointId}
            </Title>{" "}
          </Col>
          <Col span={24}>
            <Title className="inline-block" level={3}>
              Точка назначения: {choosenRecord?.endPointId}
            </Title>{" "}
          </Col>
          <Col span={24}>
            <Title className="inline-block" level={3}>
              Город: {choosenRecord?.cityId}
            </Title>{" "}
          </Col>
        </Row>
      </Modal>
      <Modal
        visible={isEditModaleVisible}
        onCancel={() => setIsEditModaleVisible(false)}
        footer={null}
        title={`Редактирование маршрута №${choosenRecord?.id}`}
      >
        <Form onFinish={onFinish}>
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
                      {/* {reduxData.points.map((item) => (
                        <Option value={`${item.id}`}>{item.name}</Option>
                      ))} */}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="endPointId">
                    <Select placeholder="Точка назначения">
                      {/* {reduxData.points.map((item) => (
                        <Option value={`${item.id}`}>{item.name}</Option>
                      ))} */}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="cityId">
                    <Select placeholder="Город">
                      {/* {reduxData.cities.map((item) => (
                        <Option value={`${item.id}`}>{item.name}</Option>
                      ))} */}
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
