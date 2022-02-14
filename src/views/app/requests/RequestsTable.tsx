import {
  Col,
  Row,
  Table,
  Modal,
  Typography,
  Input,
  Button,
  Form,
  Select,
  Upload,
  message,
  Tag
} from "antd";
import React from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import lib from "../../../lib/lib";
import { useSelector } from "react-redux";
import adminServices from "../../../services/admin";
import { IClaimData } from "../../../shared-interfaces/IClaimData";
import { IClaimType } from "../../../shared-interfaces/IClaimType";
const { confirm } = Modal;
const { Title } = Typography;
const { TextArea } = Input;
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
      adminServices.deleteClaim(auth, id).then((res:any) => {
        console.log(res);
        setIsDataUpdated(true);
      });
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}
interface IRequestsTableProps {
  tasks: Array<IClaimData>;
  setIsDataUpdated: any;
  isLoading: boolean;
  auth: string;
}

const RequestsTable: React.FC<IRequestsTableProps> = (_props) => {
  const [isProfileModaleVisible, setIsProfileModaleVisible] = useState(false);
  const [isEditModaleVisible, setIsEditModaleVisible] = useState(false);
  const [choosenRecord, setChoosenRecord] = useState<IClaimData>();
  const reduxData = useSelector((state:any) => state.app);
  const [imgUrl, setImgUrl] = useState("");
  const [form] = Form.useForm();

  const props = {
    name: "file",
    action: "http://localhost:3000/storage/load",
    headers: {
      ContentType: "multipart/form-data",
      authorization: `Bearer ${_props.auth}`,
    },
    onChange(info:any) {
      if (info.file.status !== "uploading") {
        console.log(info.file.response.data.url);
        setImgUrl(info.file.response.data.url);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const columns = [
    {
      title: "Номер",
      width: "30px",
      dataIndex: "id",
    },
    {
      title: "Категория",
      width: "200px",
      dataIndex: "claimType",

      render: (text:number) => {
        return <div>{lib.getClaimType(text, reduxData.claimTypes)}</div>;
      },
    },
    {
      title: "Адрес",
      dataIndex: "address",
    },

    {
      title: "Заголовок",
      dataIndex: "title",
    },
    {
      title: "Рейтинг",
      dataIndex: "rate",
      render: (data: number) => {
        return <div>{lib.ratingTag(data)}</div>
      },
    },
    {
      title: "Статус",
      dataIndex: "status",
      render: (text:number) => {
        return <div>{lib.getStatus(text)}</div>;
      },
    },
    {
      title: "Изображение",
      width: "100px",
      dataIndex: "urlPreview",

      render: (text:string) => {
        return (
          <div>
            <Button>
              <a href={text} target="blank">
                Посмотреть Изображение
              </a>
            </Button>
          </div>
        );
      },
    },
    {
      title: "Описание",
      dataIndex: "description",
      render: (text:string) => {
        if (text.length > 50) {
          return <div>{text.slice(0, 50) + "..."}</div>;
        } else return <div>{text}</div>;
      },
    },
    // {
    //   title: "Дата создания",
    //   dataIndex: "createdAt",
    // },
    // {
    //   title: "Дата последнего обновления",
    //   dataIndex: "updatedAt",
    // },
    {
      title: "Действия",
      dataIndex: "",
      width: "150px",

      render: ( record:IClaimData) => {
        return (
          <Row justify="space-between">
            <Col className="cursor-pointer text-xl" span={4}>
              <DeleteOutlined
                onClick={() =>
                  showDeleteConfirm(record.id, _props.setIsDataUpdated, _props.auth)
                }
              />
            </Col>
            <Col className="cursor-pointer text-xl" span={4}>
              <EyeOutlined
                onClick={() => {
                  setIsProfileModaleVisible(true);
                  setChoosenRecord(record);
                }}
              />
            </Col>
            <Col className="cursor-pointer text-xl" span={3}>
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

  function onFinish(values:IClaimData) {
    values.id = choosenRecord?.id!;
    values.urlPreview = `http://localhost:3000${imgUrl}`;
    adminServices.updateClaim(_props.auth, values).then((res:any) => {
      console.log(res);
      _props.setIsDataUpdated(true);
      setIsEditModaleVisible(false);
      form.resetFields();
    });
  }
  return (
    <Row>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={_props.tasks}
          scroll={{ x: 1000 }}
          loading={_props.isLoading}
        />
      </Col>
      <Modal
        visible={isProfileModaleVisible}
        onCancel={() => setIsProfileModaleVisible(false)}
        footer={null}
        width={800}
        title={`Просмотр задания №${choosenRecord?.id}`}
      >
        <Row>
          <Col span={11}>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Категория:{" "}
                  {lib.getClaimType(choosenRecord?.claimType!, reduxData.claimTypes)}
                </Title>{" "}
              </Col>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Адрес: {choosenRecord?.address}
                </Title>{" "}
              </Col>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Заголовок:
                </Title>{" "}
                <Row>
                  <Title level={4}>{choosenRecord?.title}</Title>
                </Row>
              </Col>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Статус: {lib.getStatus(choosenRecord?.statusId!)}
                </Title>{" "}
              </Col>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Рейтинг: {lib.ratingTag(choosenRecord?.rate!)}
                </Title>{" "}
              </Col>
            </Row>
          </Col>
          <Col span={11}>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Описание:
                </Title>{" "}
                <TextArea
                  readOnly
                  value={choosenRecord?.description}
                  rows={4}
                ></TextArea>
              </Col>
            </Row>
            <Row className="pt-3">
              <Col span={24}>
                <Button type="primary">
                  <a href={choosenRecord?.urlPreview} target="blank">
                    {" "}
                    Посмотреть изображение
                  </a>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
      <Modal
        visible={isEditModaleVisible}
        footer={null}
        onCancel={() => setIsEditModaleVisible(false)}
        title={`Редактирование зявки №${choosenRecord?.id}`}
        width={1000}
      >
        <Form form={form} onFinish={onFinish}>
          <Row justify="space-between">
            <Col span={11}>
              <Row>
                <Col span={24}>
                  <Form.Item name="claimType">
                    <Select placeholder="Категория">
                      {" "}
                       {reduxData.claimTypes.map((item: IClaimType) => (
                        <Option value={`${item.id}`}>{item.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="address">
                    <Input placeholder="Адрес" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="title">
                    <Input placeholder="Заголовок" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item name="rate">
                    <Input type="number" placeholder="Рейтинг" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={11}>
              <Row>
                <Col span={24}>
                  <Form.Item name="previewImageUrl">
                    <Upload {...props}>
                      <Button>Загрузить изображение</Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="description">
                    <TextArea placeholder="Описание" rows={8} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify="center">
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
          </Row>
        </Form>
      </Modal>
    </Row>
  );
};

export default RequestsTable;
