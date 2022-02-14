import { Col, Row, Table } from "antd";
// import { useState } from "react";
import roles from "./data";
// const { Title } = Typography;
// const { TextArea } = Input;
// function showDeleteConfirm() {
//   confirm({
//     title: "Вы уверены что хотите удалить эту запись?",
//     icon: <ExclamationCircleOutlined />,
//     content: "это действие необратимо",
//     okText: "Да",
//     okType: "danger",
//     cancelText: "Нет",
//     centered: "yes",
//     onOk() {
//       console.log("OK");
//     },
//     onCancel() {
//       console.log("Cancel");
//     },
//   });
// }

const ProductsDatatable = () => {
  // const [isProfileModaleVisible, setIsProfileModaleVisible] = useState(false);
  // const [isEditModaleVisible, setIsEditModaleVisible] = useState(false);
  // const [choosenRecord, setChoosenRecord] = useState({});
  const columns = [
    {
      title: "Номер",
      width: "50px",
      dataIndex: "id",
      sorter: {
        compare: (a, b) => {
          if (a.key === "total-system" || b.key === "total-system") {
            return 0;
          }

          return a.nmid - b.nmid;
        },
        multiple: 3,
      },
    },
    {
      title: "Название",
      width: "100px",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => {
          if (a.key === "total-system" || b.key === "total-system") {
            return 0;
          }

          return a.article - b.article;
        },
        multiple: 3,
      },
      render: (text, record) => {
        return <span>{record.name}</span>;
      },
    },
    {
      title: "Описание",
      dataIndex: "description",
      width: "300px",

      render: (data, record) => {
        return <span> {record.description}</span>;
      },
    },

    // {
    //   title: "Действия",
    //   dataIndex: "",
    //   width: "30px",
    //   render: (data, record) => {
    //     return (
    //       <Row justify="space-between">
    //         <Col className="cursor-pointer text-xl" span={10}>
    //           <DeleteOutlined onClick={showDeleteConfirm} />
    //         </Col>
    //         <Col className="cursor-pointer text-xl" span={10}>
    //           <EyeOutlined
    //             onClick={() => {
    //               setIsProfileModaleVisible(true);
    //               setChoosenRecord(record);
    //             }}
    //           />
    //         </Col>
    //         <Col className="cursor-pointer text-xl">
    //           <EditOutlined
    //             onClick={() => {
    //               setIsEditModaleVisible(true);
    //               setChoosenRecord(record);
    //             }}
    //           />
    //         </Col>
    //       </Row>
    //     );
    //   },
    // },
  ];



  return (
    <Row>
      <Col span={24}>
        <Table
          columns={columns}
         
          dataSource={roles.roles}
          scroll={{ x: 1000 }}
        />
      </Col>
      {/* <Modal
        visible={isProfileModaleVisible}
        onCancel={() => setIsProfileModaleVisible(false)}
        footer={null}
        title={`Просмотр роли №${choosenRecord.id}`}
      >
        <Row justify="space-between">
          <Col span={11}>
            <Row>
              <Col span={24}>
                <Title className="inline-block" level={3}>
                  Название: {choosenRecord.name}
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
                  value={choosenRecord.description}
                  rows={4}
                ></TextArea>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
      <Modal
        visible={isEditModaleVisible}
        onCancel={() => {
          setIsEditModaleVisible(false);
        }}
        footer={null}
        title={`Редактирование роли №${choosenRecord.id}`}
      >
        <Row justify="space-between">
          <Col span={11}>
            <Row>
              <Col span={24}>
                <Input placeholder="Название" value={choosenRecord.name} />
                <Row className="pl-2 pt-1">
                  <span className="text-xs text-[#1B3452] opacity-80">
                    Вы можете изменить Название роли
                  </span>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={11}>
            <Row>
              <Col span={24}>
                <TextArea
                  readOnly
                  value={choosenRecord.description}
                  rows={4}
                ></TextArea>
                <Row className="pl-2 pt-1">
                  <span className="text-xs text-[#1B3452] opacity-80">
                    Вы можете изменить Описание роли
                  </span>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="center" className="pt-5">
          <Button type="primary">Сохранить</Button>
        </Row>
      </Modal> */}
    </Row>
  );
};

export default ProductsDatatable;
