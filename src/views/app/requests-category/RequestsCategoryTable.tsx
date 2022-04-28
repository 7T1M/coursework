import { Col, Row, Table, Tag, Modal, Empty } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import adminServices from "../../../services/admin";
import { IClaimType } from "../../../shared-interfaces/IClaimType";
import lib from "../../../lib/lib";
import { useAppSelector } from "../../../redux/hooks";
import { ColumnType } from "antd/es/table";
import { AxiosError } from "axios";
import Logger from "../../../logger/Logger";
const { confirm } = Modal;

function showDeleteConfirm(
  id: number,
  setIsDataUpdated: React.Dispatch<boolean>,
  auth: string
) {
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
        .deleteClaimCategory(auth, id)
        .then(() => {
          setIsDataUpdated(true);
        })
        .catch((err: AxiosError) => console.error(err));
    },
    onCancel() {},
  });
}
interface IRequestsCategoryTableProps {
  data: IClaimType[];
  setIsDataUpdated: React.Dispatch<boolean>;
  auth: string;
  isDataLoading: boolean;
  pageSize: number;
  setPageSize: React.Dispatch<number>;
}
const RequestsCategoryTable: React.FC<IRequestsCategoryTableProps> = ({
  data,
  setIsDataUpdated,
  auth,
  isDataLoading,
  setPageSize,
  pageSize,
}) => {
  const logger: Logger = useAppSelector((state) => state.app.logger!);
  const reduxData = useAppSelector((state) => state.app);
  const columns: ColumnType<IClaimType>[] = [
    {
      title: "Номер",
      width: "50px",
      dataIndex: "id",
    },
    {
      title: "Контролирующий орган",
      dataIndex: "serviceControlId",
      render: (data: number) => {
        return <span>{lib.getInstanceName(data, reduxData.services)}</span>;
      },
    },
    {
      title: "Исполнительный орган",
      dataIndex: "serviceExecuteId",
      render: (data: number) => {
        return <span>{lib.getInstanceName(data, reduxData.services)}</span>;
      },
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
        return <div className="text-center">{priorityTag(data)}</div>;
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
                onClick={() => {
                  logger.userDeleteRecord("claim types", record.name);
                  showDeleteConfirm(record.id!, setIsDataUpdated, auth);
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
      return <Tag color={"green"}>{priority}</Tag>;
    } else if (priority > 3 && priority <= 6) {
      return <Tag color={"orange"}>{priority}</Tag>;
    } else if (priority > 6) {
      return <Tag color={"red"}>{priority}</Tag>;
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
          locale={{ emptyText: <Empty description="Тут ничего нет :(" /> }}
          pagination={{
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPageSize(pageSize);
            },
          }}
        />
      </Col>
    </Row>
  );
};

export default RequestsCategoryTable;
