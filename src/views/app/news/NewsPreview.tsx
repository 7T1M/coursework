import React, { useState } from "react";
import {
  Row,
  Col,
  Input,
  Card,
  Select,
  Typography,
  Button,
  Modal,
  Form,
  Divider,
  Upload,
  message,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import adminServices from "../../../services/admin";
import { INews } from "./INews";
import { IEditNewsData } from "./IEditNewsData";
import { RootState } from "../../../store";
import { useAppSelector,useAppDispatch } from "../../../redux/hooks";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface INewsPreviewProps {
  id: number;
  name: string;
  description: string;
  image: string;
  setIsDataUpdated: any;
  title: string;
}

export const NewsPreview: React.FC<INewsPreviewProps> = (_props) => {
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const auth = useAppSelector((state) => state.app.authToken);
  const reduxData = useAppSelector((state) => state.app);
  const [form] = Form.useForm();
  let text: string = "";
  if (_props.description) {
    text = _props.description;
    if (text.length > 100) text = _props.description.slice(0, 100) + "...";
  }

  function handleDeleteClick() {
    adminServices
      .deleteNews(auth, _props.id)
      .finally(() => {
        _props.setIsDataUpdated(true);
      })
      .catch((err:any) => console.error(err));
  }

  function onFinish(values: IEditNewsData) {
    values.id = _props.id;
    values.previewImageUrl = imgUrl === "" ? undefined : imgUrl;
    adminServices
      .updateNews(auth, values)
      .finally(() => {
        _props.setIsDataUpdated(true);
        setIsEditModalVisible(false);
        form.resetFields();
      })
      .catch((err:any) => console.error(err));
  }
  const uploadProps = {
    name: "file",
    action: "http://localhost:3000/storage/load",
    headers: {
      ContentType: "multipart/form-data",
      authorization: `Bearer ${auth}`,
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        setImgUrl(`http://localhost:3000${info.file.response.data.url}`);
      }
    },
  };

  return (
    <Row gutter={16}>
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
        style={{
          boxShadow: "0px 15px 50px 0px rgb(14 17 51 / 10%)",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Row justify="space-between" style={{ height: "180px" }}>
          <Col span={8} onClick={() => setIsInfoModalVisible(true)}>
            <img
              style={{ width: "100%", maxHeight: "180px" }}
              src={_props.image}
              alt=""
            ></img>
          </Col>
          <Col span={14} onClick={() => setIsInfoModalVisible(true)}>
            <Row>
              <Col>
                <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {_props.name}
                </div>
                <div style={{ fontWeight: "500", fontSize: "17px" }}>
                  {_props.title}
                </div>
                <div style={{ color: "gray" }}>{text}</div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="end">
          <Col className="mr-5" span={3}>
            <a onClick={() => setIsEditModalVisible(true)}>Изменить</a>
          </Col>
          <Col span={3}>
            <a onClick={handleDeleteClick} style={{ color: "red" }}>
              Удалить
            </a>
          </Col>
        </Row>
      </Col>
      <Modal
        visible={isInfoModalVisible}
        onCancel={() => setIsInfoModalVisible(false)}
        footer={null}
        width={800}
        title={`${_props.title}`}
      >
        <Row>
          <Col span={24}>
            <div>
              <img style={{ width: "100%" }} src={_props.image} alt="" />
            </div>
            <Row>
              <Col span={24}>
                <Divider />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className="p-5 text-lg">{_props.description}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
      <Modal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={800}
        title={`Изменение новости №${_props.id}`}
      >
        <Form form={form} onFinish={onFinish}>
          <Row>
            <Col span={24}>
              <Row justify="space-between">
                <Col span={11}>
                  <Form.Item name="name">
                    <Input placeholder="Имя" />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name="title">
                    <Input placeholder="Название" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col span={11}>
                  <Form.Item>
                    <Upload {...uploadProps}>
                      <Button>Загрузить изображение</Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name="cityId">
                    <Select placeholder="Город">
                      {reduxData.cities.map((item : any) => (
                        <Option value={`${item.id}`}>{item.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center">
                <Col span={12}>
                  <Form.Item name="description">
                    <TextArea rows={8} placeholder="Описание" />
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
