import drivers from "./data";
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
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import adminServices from "../../../services/admin";
import { useSelector } from "react-redux";
 import lib from "../../../lib/lib"
import { IDriver } from "../../../shared-interfaces/IDriver";
import { RootState } from "../../../store";
import React from "react";
const { Option } = Select;
const { Title } = Typography;
const { confirm } = Modal;
function showDeleteConfirm(id: number, updateData: any, auth: string) {
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
        .deleteDriver(auth, id)
        .then((res:any) => {
        
          updateData(true);
        })
        .catch((err:any) => console.error(err));
    },
    onCancel() {},
  });
}

interface IDriversTableProps {
  data: Array<IDriver>;
  setIsDataUpdated: any;
  isDataLoading: boolean;
  auth: string;
}

const DriversTable: React.FC<IDriversTableProps> = ({
  data,
  setIsDataUpdated,
  auth,
  isDataLoading,
}) => {
  const [isProfileModaleVisible, setIsProfileModaleVisible] = useState(false);
  const [isEditModaleVisible, setIsEditModaleVisible] = useState(false);
  const [choosenRecord, setChoosenRecord] = useState<IDriver>();
  const reduxData = useSelector((state: RootState) => state.app);
  const [form] = Form.useForm();


  const columns = [
    {
      title: "Номер",
      width: "50px",
      dataIndex: "id",
    },
    {
      title: "Имя",
      width: "100px",
      dataIndex: "name",

      render: (data:string,record: IDriver) => {
        return <span>{record.firstName + " " + record.lastName}</span>;
      },
    },
    {
      title: "Маршрут",
      width: "30px",
      dataIndex: "routeId",
      render: (data: number) => {
        return <div>{lib.getRoute(data, reduxData.routes)}</div>;
      },
    },

    {
      title: "Город",
      dataIndex: "cityId",
      width: "200px",
      render: (data: number) => {
        return <div>{lib.getCity(data, reduxData.cities)}</div>;
      },
    },

    {
      title: "Номер телефона",
      dataIndex: "phone",
      width: "200px",
    },
    {
      title: "Действия",
      dataIndex: "",
      width: "30px",

      render: (record: IDriver) => {
        return (
          <Row justify="space-between">
            <Col className="cursor-pointer text-xl" span={8}>
              <DeleteOutlined
                onClick={() => showDeleteConfirm(record.id!, setIsDataUpdated, auth)}
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
  function onFinish(values:IDriver) {
    values.id = choosenRecord?.id!;
    adminServices
      .updateDriver(auth, values)
      .finally(() => {
        setIsDataUpdated(true);
        setIsEditModaleVisible(false);
        form.resetFields();
      })
      .catch((err:any) => console.error(err));

    // adminServices.
  }

  //https://www.google.ru/maps/@48.0077235,37.8246693,15.25z
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
        title={`Просмотр водителя №${choosenRecord?.id}`}
      >
        <Row>
          <Col span={24}>
            <Title className="inline-block" level={3}>
              Имя: {choosenRecord?.firstName}
            </Title>{" "}
          </Col>
          <Col span={24}>
            <Title className="inline-block" level={3}>
              Фамилия: {choosenRecord?.lastName}
            </Title>{" "}
          </Col>
          <Col span={24}>
            <Title className="inline-block" level={3}>
              Маршрут: {choosenRecord?.routeId}
            </Title>{" "}
          </Col>
          <Col span={24}>
            <Title className="inline-block" level={3}>
              Город: {choosenRecord?.cityId}
            </Title>{" "}
          </Col>
          <Col span={24}>
            <Title className="inline-block" level={3}>
              Номер телефона: {choosenRecord?.phone}
            </Title>{" "}
          </Col>
        </Row>
      </Modal>
      <Modal
        visible={isEditModaleVisible}
        onCancel={() => setIsEditModaleVisible(false)}
        footer={null}
        width={800}
        title={`Редактирование водителя №${choosenRecord?.id} `}
      >
        <Form form={form} onFinish={onFinish}>
          <Row>
            <Col span={24}>
              <Row>
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
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="routeId">
                    <Select placeholder="Маршрут">
                      {reduxData.routes.map((item: any) => (
                        <Option value={`${item.id}`}>{item.routeName}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="cityId">
                    <Select placeholder="Город">
                      {reduxData.cities.map((item:any) => (
                        <Option value={`${item.id}`}>{item.name}</Option>
                      ))}
                    </Select>
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
};

export default DriversTable;
