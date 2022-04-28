import {
  Col,
  Row,
  Table,
  Modal,
  Input,
  Button,
  Form,
  Select,
  Upload,
  message,
  Empty,
} from "antd";
import React, { useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import lib from "../../../lib/lib";
import { useSelector } from "react-redux";
import adminServices from "../../../services/admin";
import { IClaimData } from "../../../shared-interfaces/IClaimData";
import { IClaimType } from "../../../shared-interfaces/IClaimType";
import { ColumnType } from "antd/es/table";
import { useAppSelector } from "../../../redux/hooks";
import Logger from "../../../logger/Logger";
import tasksStatus from "../../../models/taskStatus";
const { confirm } = Modal;
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
      adminServices.deleteClaim(auth, id).then(() => {
        setIsDataUpdated(true);
      });
    },
    onCancel() {},
  });
}
interface IRequestsTableProps {
  claims: IClaimData[];
  setIsDataUpdated: React.Dispatch<boolean>;
  isLoading: boolean;
  auth: string;
  pageSize: number;
  setPageSize: React.Dispatch<number>;
}

const RequestsTable: React.FC<IRequestsTableProps> = (_props) => {
  const [isEditModaleVisible, setIsEditModaleVisible] = useState(false);
  const [choosenRecord, setChoosenRecord] = useState<IClaimData>(
    _props.claims[0]
  );
  const reduxData = useSelector((state: any) => state.app);
  const [imgUrl, setImgUrl] = useState("");
  const [form] = Form.useForm();
  const logger: Logger = useAppSelector((state) => state.app.logger!);

  useEffect(() => {
    form.setFieldsValue(choosenRecord);
  }, [choosenRecord]);
  const props = {
    name: "file",
    action: "http://api.rep2u.ru/storage/load",
    headers: {
      ContentType: "multipart/form-data",
      authorization: `Bearer ${_props.auth}`,
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        setImgUrl(info.file.response.data.url);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const columns: ColumnType<IClaimData>[] = [
    {
      title: "Номер",
      width: "30px",
      dataIndex: "id",
    },
    {
      title: "Категория",
      width: "200px",
      dataIndex: "claimType",

      render: (id: number) => {
        return <div>{lib.getInstanceName(id, reduxData.claimTypes)}</div>;
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
        return <div>{lib.ratingTag(data)}</div>;
      },
    },
    {
      title: "Статус",
      dataIndex: "status",
      width: "100px",
      render: (text: number) => {
        return <div>{lib.getStatus(text)}</div>;
      },
    },
    {
      title: "Изображение",
      width: "150px",
      dataIndex: "urlPreview",

      render: (url: string) => {
        return <img src={url} width={150} height={100} alt="" />;
      },
    },
    {
      title: "Описание",
      dataIndex: "description",
      render: (text: string) => {
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
      width: "200px",

      render: (record: IClaimData) => {
        return (
          <Row justify="center" className="text-center">
            <Col className="cursor-pointer text-xl">
              <DeleteOutlined
                onClick={() => {
                  logger.userDeleteRecord("claims", record.title);
                  showDeleteConfirm(
                    record.id,
                    _props.setIsDataUpdated,
                    _props.auth
                  );
                }}
              />
            </Col>

            <Col className="cursor-pointer text-xl ml-5">
              <EditOutlined
                onClick={() => {
                  console.debug(record);
                  record.status = String(record.status);
                  console.debug(record);
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

  function onFinish(values: IClaimData) {
    values.id = choosenRecord?.id!;
    values.urlPreview =
      imgUrl !== "" ? `http://api.rep2u.ru${imgUrl}` : undefined;
    adminServices.updateClaim(_props.auth, values).then(() => {
      _props.setIsDataUpdated(true);
      setIsEditModaleVisible(false);
      form.resetFields();
      logger.userEditRecord("claims", values.title);
    });
  }

  function closeEditModal() {
    setIsEditModaleVisible(false);

    form.resetFields();
  }

  return (
    <Row>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={_props.claims}
          scroll={{ x: 1000 }}
          loading={_props.isLoading}
          locale={{ emptyText: <Empty description="Тут ничего нет :(" /> }}
          pagination={{
            pageSize: _props.pageSize,
            onChange: (page, pageSize) => {
              _props.setPageSize(pageSize);
            },
          }}
        />
      </Col>

      <Modal
        visible={isEditModaleVisible}
        footer={null}
        onCancel={closeEditModal}
        title={choosenRecord?.title}
        width={1000}
      >
        <Form form={form} onFinish={onFinish} initialValues={choosenRecord}>
          <Row justify="space-between">
            <Col span={11}>
              <Row>
                <Col span={24}>
                  <Form.Item name="claimType">
                    <Select placeholder="Категория">
                      {reduxData.claimTypes.map((item: IClaimType) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
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
                <Col span={24}>
                  <Form.Item name="status">
                    <Select placeholder="Статус">
                      {Object.keys(tasksStatus).map((item) => (
                        <Option key={item} value={item}>
                          {lib.getStatus(Number(item))}
                        </Option>
                      ))}
                    </Select>
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
