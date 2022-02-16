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
  List,
  Upload,
  message,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectRoute } from "../../../redux/sideNavSlice";
import adminServices from "../../../services/admin";
import { NewsPreview } from "./NewsPreview";
import { INews } from "./INews";
import { RootState,AppDispatch } from "../../../store";
import { useAppSelector,useAppDispatch } from "../../../redux/hooks";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
export default function News() {
  const [isModaleVisible, setIsModaleVisible] = useState<Boolean>(false);
  const [loadedNews, setLoadedNews] = useState<Array<INews>>([]);
  const [isDataUpdated, setIsDataUpdated] = useState<Boolean>(false);
  const [isListLoading, setIsListLoading] = useState<Boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const auth: string = useAppSelector((state) => state.app.authToken);
  const reduxData = useAppSelector((state) => state.app);
  const [form] = Form.useForm();
  const props = {
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
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const dispatch = useAppDispatch();
  const FormItem = Form.Item;
  useEffect(() => {
    dispatch(selectRoute("news"));
    reduxData.logger!.userChangePage("news");

    setIsListLoading(true);
    getNews();
  }, []);
  useEffect(() => {
    if (isDataUpdated) {
      getNews();
    } else return;
  }, [isDataUpdated]);

  const [updateTime, setUpdateTime] = useState<string>(
    `Обновлено ${moment().format(
      "DD MMMM YYYY"
    )} в ${moment().hours()}:${moment().minute()} `
  );
  function updateData() {
    getNews();
    setUpdateTime(
      `Обновлено ${moment().format(
        "DD MMMM YYYY"
      )} в ${moment().hours()}:${moment().minute()}`
    );
  }
  function onFinish(values: INews) {
    setIsListLoading(true);
    values.previewImageUrl = imgUrl;

    adminServices
      .createNews(auth, values)
      .then((res: any) => {
        setIsDataUpdated(true);
        setIsModaleVisible(false);
        setIsListLoading(false);
        form.resetFields();
      })
      .catch((err: any) => console.error(err));
  }
  function getNews() {
    setIsListLoading(true);
    adminServices
      .getNews(auth)
      .then((res: any) => {
        setLoadedNews(res.data.data);
        setIsDataUpdated(false);
       ;
        setIsListLoading(false);
      })
      .catch((err: any) => console.error(err));
  }

  function renderNews(news: INews) {
    return (
      <Col
        style={{ marginTop: "10px", height: "100%" }}
        span={22}
        className="cursor-pointer"
      >
        <NewsPreview
          id={news.id!}
          name={news.name}
          title={news.title}
          description={news.description}
          image={news.previewImageUrl}
          setIsDataUpdated={setIsDataUpdated}
        />
      </Col>
    );
  }

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Row justify={"space-between"} className="p-3">
          <Col span={18}>
            <Row>
              <span className="opacity-80">{updateTime} </span>
              <div className="text-2xl mx-5 leading-5 text-[#1B3452] opacity-80	 ">
                &bull;{" "}
              </div>
              <div
                className=" text-blue-700 opacity-85 cursor-pointer opacity-80"
                onClick={updateData}
              >
                Обновить
              </div>
            </Row>
            <Row style={{ marginTop: 32 }}>
              <Title level={3}>Новости</Title>
            </Row>
            <Row>
              <span>Здесь собраны все актуальные новости</span>
            </Row>
          </Col>
          {/* <Col span={4}>
            <img
              width={297}
              height={140}
              src={"/img/products-logo.png"}
              alt="product"
            ></img>
          </Col> */}
          <Col span={24}>
            <span className="text-xs text-[#1B3452] opacity-80">
              Вы также можете создать статью:
            </span>
            <Row className="mt-1">
              <Col span={8}>
                <Button onClick={() => setIsModaleVisible(true)} type="primary">
                  Создать
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="px-3" style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card>Список новостей</Card>
          </Col>
        </Row>

        <Col span={24}>
          <List
            grid={{ md: 1, lg: 2, xl: 2, xxl: 2 }}
            dataSource={loadedNews}
            renderItem={(item) => renderNews(item)}
            loading={isListLoading === true}
          ></List>
        </Col>

        <Modal
          visible={isModaleVisible === true}
          title="Создание статьи"
          footer={null}
          width={700}
          onCancel={() => setIsModaleVisible(false)}
        >
          <Form form={form} onFinish={onFinish}>
            <Row justify="space-between">
              <Col span={10}>
                <Row>
                  <Col span={24}>
                    <FormItem
                      name="name"
                      rules={[
                        { required: true, message: "Введите название статьи" },
                      ]}
                    >
                      <Input placeholder="Название" />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem
                      name="title"
                      rules={[
                        { required: true, message: "Введите заголовок статьи" },
                      ]}
                    >
                      <Input placeholder="Заголовок" />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem
                      name="cityId"
                      rules={[
                        {
                          required: true,
                          message: "Выберете актуальный для статья город",
                        },
                      ]}
                    >
                      <Select style={{ width: "100%" }} placeholder="Город">
                        {reduxData.cities?.map((item: any) => (
                          <Option value={item.id}>{item.name}</Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem
                      rules={[
                        {
                          required: true,
                          message: "Загрузите изображение",
                        },
                      ]}
                    >
                      <Upload {...props}>
                        <Button>Загрузить изображение</Button>
                      </Upload>
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={24}>
                    <FormItem
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: " Напишите описание для статьи ",
                        },
                      ]}
                    >
                      <TextArea rows={10} placeholder="Описание"></TextArea>
                    </FormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify="center" className="mt-5">
              <Button htmlType="submit" type="primary">
                Создать
              </Button>
            </Row>
          </Form>
        </Modal>
      </Col>
    </Row>
  );
}
