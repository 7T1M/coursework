import { Col, Row, Table, Tag, Modal, Typography, Form } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import httpService from "../../../services/admin";
import { IClaimType } from "../../../shared-interfaces/IClaimType";
const { confirm } = Modal;
const { Title } = Typography;

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
        .deleteClaimCategory(auth, id)
        .then((res) => {
          console.log(res);
          setIsDataUpdated(true);
        })
        .catch((err) => console.log(err));
    },
    onCancel() {},
  });
}
interface IRequestsCategoryTableProps {
  data: Array<IClaimType>;
  setIsDataUpdated: any;
  auth: string;
  isDataLoading: boolean;
}
const RequestsCategoryTable: React.FC<IRequestsCategoryTableProps> = ({
  data,
  setIsDataUpdated,
  auth,
  isDataLoading,
}) => {
  const [isProfileModaleVisible, setIsProfileModaleVisible] =
    useState<boolean>(false);
  const [choosenRecord, setChoosenRecord] = useState<IClaimType>();
  const columns = [
    {
      title: "Номер",
      width: "50px",
      dataIndex: "id",
    },
    {
      title: "Контролирующий орган",
      dataIndex: "serviceControlId",
    },
    {
      title: "Исполнительный орган",
      dataIndex: "serviceExecuteId",
    },

    {
      title: "Имя",
      dataIndex: "name",
    },
    {
      title: "Мнемоническое имя",
      dataIndex: "mnemonicName",
    },
    {
      title: "Тег",
      dataIndex: "tag",
    },
    {
      title: "Приоритет",
      dataIndex: "priority",

      render: (data: number) => {
        return priorityTag(data);
      },
    },
    {
      title: "Действия",
      dataIndex: "",
      width: "200px",

      render: (record: IClaimType) => {
        return (
          <Row>
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
          </Row>
        );
      },
    },
  ];

  function priorityTag(priority: number) {
    if (priority <= 3) {
      return <Tag color={"green"}>Низкий</Tag>;
    } else if (priority > 3 && priority <= 6) {
      return <Tag color={"orange"}>Средний</Tag>;
    } else if (priority > 6) {
      return <Tag color={"red"}>Высокий</Tag>;
    }
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
        width={800}
        title={`Просмотр категории №${choosenRecord?.id}`}
      >
        <Row justify="space-between">
          <Col span={11}>
            <Row>
              <Col span={24}>
                <Title level={3}>Контролирующий орган:</Title>

                <Row>{choosenRecord?.serviceControlId}</Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Исполнительный орган:
                </Title>
                <Row> {choosenRecord?.serviceExecuteId}</Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Название:
                </Title>
                <Row> {choosenRecord?.name}</Row>
              </Col>
            </Row>
          </Col>
          <Col span={11}>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Мнемоническое имя
                </Title>
                <Row> {choosenRecord?.mnemonicName}</Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Тег:
                </Title>
                <Row> {choosenRecord?.tag}</Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Приоритет:
                </Title>{" "}
                <Row> {priorityTag(choosenRecord?.priority)}</Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </Row>
  );
};

export default RequestsCategoryTable;
