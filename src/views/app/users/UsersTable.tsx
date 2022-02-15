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
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import adminServices from "../../../services/admin";
import lib from "../../../lib/lib";

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
        .deleteUser(auth, id)
        .then((res: any) => {
         ;
          setIsDataUpdated(true);
        })
        .catch((err: any) => console.error(err));
    },
    onCancel() {},
  });
}
interface IUserTableProps {
  data: any;
  auth: string;
  setIsDataUpdated: any;
  isDataLoading: boolean;
}
interface iUser {
  id: number;
  name: string;
  login: string;
  roleId: number;
  cityId: number;
  isVerificated: boolean;
  rating: number;
}

const UsersTable: React.FC<IUserTableProps> = (_props) => {
  const [isProfileModaleVisible, setIsProfileModaleVisible] = useState(false);
  const [isEditModaleVisible, setIsEditModaleVisible] = useState(false);
  const [choosenRecord, setChoosenRecord] = useState<iUser>();
  const reduxData = useSelector((state: any) => state.app);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Номер ",
      width: "115px",
      dataIndex: "id",
    },
    {
      title: "Имя",
      width: "120px",
      dataIndex: "name",
    },
    {
      title: "Логин",
      dataIndex: "login",
      width: "50px",
    },

    {
      title: "Роль",
      dataIndex: "roleId",
      width: "50px",
      render: (data: number) => {
        return <div>{getRoleToUser(data)}</div>;
      },
    },
    {
      title: "Город",
      dataIndex: "cityId",
      width: "100px",
      render: (data: string) => {
        return data ?? "Донецк";
      },
    },
    {
      title: "Верефицирован",
      dataIndex: "isVerificated",
      width: "30px",

      render: (data: boolean) => {
        if (data === true) {
          return <Tag color={"green"}>Да</Tag>;
        } else {
          return <Tag color={"red"}>Нет</Tag>;
        }
      },
    },
    {
      title: "Рейтинг",
      dataIndex: "rating",
      width: "50px",

      render: (data: number) => {
        return <div>{lib.ratingTag(data)}</div>;
      },
    },
    {
      title: "Действия",
      dataIndex: "",
      width: "100px",

      render: (record: iUser) => {
        return (
          <Row>
            <Col className="cursor-pointer text-xl mr-5">
              <DeleteOutlined
                onClick={() =>
                  showDeleteConfirm(
                    record.id,
                    _props.setIsDataUpdated,
                    _props.auth
                  )
                }
              />
            </Col>
            <Col className="cursor-pointer text-xl">
              <EyeOutlined
                onClick={() => {
                  setChoosenRecord(record);
                  setIsProfileModaleVisible(true);
                }}
              />
            </Col>
            {/* <Col className="cursor-pointer text-xl" span={8}>
              <EditOutlined
                onClick={() => {
                  setChoosenRecord(record);
                  setIsEditModaleVisible(true);
                }}
              />
            </Col> */}
          </Row>
        );
      },
    },
  ];

  
  
  function getRoleToUser(role: number) {
    switch (role) {
      case 0:
        return "Администратор";
      case 1:
        return "Пользователь";

      case 2:
        return "Служебный пользователь";
      default:
        return null;
    }
  }
  function onFinish(values: iUser) {
    setIsEditModaleVisible(false);
  }

  return (
    <Row>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={_props.data}
          scroll={{ x: 1000 }}
          loading={_props.isDataLoading}
        />
      </Col>
      <Modal
        visible={isProfileModaleVisible}
        onCancel={() => setIsProfileModaleVisible(false)}
        footer={null}
        title={`Просмотр пользователя №${choosenRecord?.id}`}
      >
        <Row justify="space-between">
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
                  Роль: {getRoleToUser(choosenRecord?.roleId!)}
                </Title>{" "}
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Верефицирован:{" "}
                  {lib.verificationTag(choosenRecord?.isVerificated === true)}
                </Title>{" "}
              </Col>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Рейтинг: {lib.ratingTag(choosenRecord?.rating!)}
                </Title>{" "}
              </Col>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Рейтинг:{choosenRecord?.cityId ?? " Донецк"}
                </Title>{" "}
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
      <Modal
        visible={isEditModaleVisible}
        footer={null}
        onCancel={() => setIsEditModaleVisible(false)}
        title={`Редактирование пользователя №${choosenRecord?.id}`}
      >
        {" "}
        <Form form={form} onFinish={onFinish}>
          <Row justify="space-between">
            <Col span={11}>
              <Row>
                <Col span={24}>
                  <Form.Item name="name">
                    <Input placeholder="Имя" />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="pt-3">
                <Col span={24}>
                  <Form.Item name="login">
                    <Input placeholder="Логин" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={11}>
              <Row>
                <Col span={24}>
                  <Form.Item name="roleId">
                    <Select style={{ width: "100%" }} placeholder="Роль" />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="pt-3">
                <Col span={24}>
                  <Form.Item name="cityId">
                    <Select style={{ width: "100%" }} placeholder="Город">
                      {reduxData.cities.map((item: any) => (
                        <Option value={`${item.id}`}>{item.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item name="isVerificated">
                    <Checkbox>Верефицирован</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
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

export default UsersTable;
