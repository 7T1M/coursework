import React, { useState } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Modal,
  Form,
  Divider,
  Upload,
} from "antd";
import adminServices from "../../../services/admin";
import { IEditNewsData } from "./IEditNewsData";
import { useAppSelector } from "../../../redux/hooks";
import ICity from "../../../shared-interfaces/ICity";
import newsPrioritys from "../../../models/newsPriority";
import newsTypes from "../../../models/newsType";
import Logger from "../../../logger/Logger";

const { Option } = Select;
const { TextArea } = Input;

interface INewsPreviewProps {
  id: number;
  name: string;
  description: string;
  image: string;
  setIsDataUpdated: any;
  title: string;
  cityId: number;
  priority: number;
  type: number;
}

export const NewsPreview: React.FC<INewsPreviewProps> = (_props) => {
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState(_props.image);
  const auth = useAppSelector((state) => state.app.authToken);
  const reduxData = useAppSelector((state) => state.app);
  const logger: Logger = useAppSelector((state) => state.app.logger!);
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
        logger.userDeleteRecord("news", _props.title);
      })
      .catch((err: any) => console.error(err));
  }

  function onFinish(values: IEditNewsData) {
    values.id = _props.id;
    values.previewImageUrl = imgUrl;

    adminServices
      .updateNews(auth, values)
      .finally(() => {
        _props.setIsDataUpdated(true);
        setIsEditModalVisible(false);
        form.resetFields();
        logger.userEditRecord("news", values.title);
      })
      .catch((err: any) => console.error(err));
  }
  const uploadProps = {
    name: "file",
    action: "http://api.rep2u.ru/storage/load",
    headers: {
      ContentType: "multipart/form-data",
      authorization: `Bearer ${auth}`,
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        setImgUrl(`http://api.rep2u.ru${info.file.response.data.url}`);
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
          <Col className="mr-5">
            <span
              onClick={() => setIsEditModalVisible(true)}
              className="text-blue-600"
            >
              Изменить
            </span>
          </Col>
          <Col>
            <span onClick={handleDeleteClick} className="text-red-600">
              Удалить
            </span>
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
                    <Input placeholder="Имя" defaultValue={_props.name} />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name="title">
                    <Input placeholder="Название" defaultValue={_props.title} />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col span={11}>
                  <Form.Item name="priority">
                    <Select
                      placeholder="Приоритет"
                      defaultValue={String(_props.priority)}
                    >
                      {Object.keys(newsPrioritys).map((key) => (
                        <Option key={key} value={key}>
                          {newsPrioritys[key]}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name="type">
                    <Select
                      placeholder="Тип"
                      defaultValue={String(_props.type)}
                    >
                      {Object.keys(newsTypes).map((key) => (
                        <Option key={key} value={key}>
                          {newsTypes[key]}
                        </Option>
                      ))}
                    </Select>
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
                    <Select placeholder="Город" defaultValue={_props.cityId}>
                      {reduxData.cities.map((item: ICity) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="description">
                <TextArea
                  rows={12}
                  className="w-full "
                  placeholder="Описание"
                  defaultValue={_props.description}
                />
              </Form.Item>

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
