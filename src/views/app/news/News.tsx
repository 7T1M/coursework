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
} from "antd";
import moment from "moment";
import { useEffect } from "react";
import { selectRoute } from "../../../redux/sideNavSlice";
import adminServices from "../../../services/admin";
import { NewsPreview } from "./NewsPreview";
import { INews } from "./INews";
import { SearchOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import ICity from "../../../shared-interfaces/ICity";
import newsPrioritys from "../../../models/newsPriority";
import newsTypes from "../../../models/newsType";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function News() {
  const [isModaleVisible, setIsModaleVisible] = useState<Boolean>(false);
  const [loadedNews, setLoadedNews] = useState<Array<INews>>([]);
  const [isDataUpdated, setIsDataUpdated] = useState<Boolean>(false);
  const [isListLoading, setIsListLoading] = useState<Boolean>(false);
  const [data, setData] = useState<INews[]>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const auth: string = useAppSelector((state) => state.app.authToken);
  const reduxData = useAppSelector((state) => state.app);
  const [pageSize, setPageSize] = useState<number>(4);
  const [form] = Form.useForm();
  const props = {
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

  const dispatch = useAppDispatch();
  const FormItem = Form.Item;

  function searchInDataTableData(str: string) {
    return loadedNews.filter((news) =>
      news.title.toLocaleLowerCase().includes(str.toLowerCase())
    );
  }
  function setSearchFilter(query: string): void {
    setData(searchInDataTableData(query));
  }
  useEffect(() => {
    dispatch(selectRoute("news"));

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
      .then(() => {
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
          cityId={news.cityId}
          priority={news.priority}
          type={news.type}
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
              <div className="text-2xl mx-3 mt-px leading-5 text-[#1B3452] opacity-80	 ">
                &bull;{" "}
              </div>
              <div
                className=" text-blue-700 opacity-85 cursor-pointer opacity-70 hover:opacity-100"
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
            <Row className="mt-5">
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
            <Card>
              <Row justify={"space-between"}>
                <Col span={12}>
                  <Input
                    placeholder="Поиск по заголовку..."
                    prefix={<SearchOutlined className="site-form-item-icon" />}
                    onChange={(e) => setSearchFilter(e.target.value)}
                  />
                </Col>
                <Col span={7}>
                  <Row justify={"center"}>
                    <Col style={{ width: "100%" }}>
                      <Select
                        style={{ width: "100%" }}
                        defaultValue={4}
                        value={pageSize}
                        onChange={(e) => setPageSize(e)}
                      >
                        <Option value={4}>Показывать по 4шт.</Option>
                        <Option value={8}>Показывать по 8шт.</Option>
                        <Option value={12}>Показывать по 12шт.</Option>
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Col span={24}>
          <List
            grid={{ md: 1, lg: 2, xl: 2, xxl: 2 }}
            dataSource={data ?? loadedNews}
            renderItem={(item) => renderNews(item)}
            loading={isListLoading === true}
            pagination={{ pageSize: pageSize }}
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
                        {reduxData.cities?.map((item: ICity) => (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem
                      name="priority"
                      rules={[
                        {
                          required: true,
                          message: "Укажите приоритет новости",
                        },
                      ]}
                    >
                      <Select style={{ width: "100%" }} placeholder="Приоритет">
                        {Object.keys(newsPrioritys).map((item) => (
                          <Option key={item} value={item}>
                            {newsPrioritys[item]}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: "Укажите тип новости",
                        },
                      ]}
                    >
                      <Select style={{ width: "100%" }} placeholder="Тип">
                        {Object.keys(newsTypes).map((item) => (
                          <Option key={item} value={item}>
                            {newsTypes[item]}
                          </Option>
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
