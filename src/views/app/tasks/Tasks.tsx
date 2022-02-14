import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Input,
  Card,
  Select,
  Typography,
} from "antd";
import TasksTable from "./TasksTable";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectRoute } from "../../../redux/sideNavSlice";
import adminServices from "../../../services/admin";
import { ITask } from "../../../shared-interfaces/ITask";
const { Title } = Typography;
const { Option } = Select;

export default function Tasks() {
  const [tasksData, setTasksData] = useState<Array<ITask>>([]);
  const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = useSelector((state:any) => state.app.authToken);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectRoute("tasks"));
    getTasks();
  }, []);
  const [updateTime, setUpdateTime] = useState<string>(
    `Обновлено ${moment().format(
      "DD MMMM YYYY"
    )} в ${moment().hours()}:${moment().minute()} `
  );
  function updateData() {
    getTasks();
    setUpdateTime(
      `Обновлено ${moment().format(
        "DD MMMM YYYY"
      )} в ${moment().hours()}:${moment().minute()}`
    );
  }

  useEffect(() => {
    if (isDataUpdated) {
      updateData();
    } else return;
  }, [isDataUpdated]);

  function getTasks() {
    setIsLoading(true);
    adminServices.getTasks(auth).then((res:any) => {
      console.log(res);
      setTasksData(res.data.data);
      setIsLoading(false);
      setIsDataUpdated(false);
    });
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
              <Title level={3}>Задания</Title>
            </Row>
            <Row>
              <span>Полная информация о заданиях</span>
            </Row>
          </Col>
          <Col span={4}></Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card>
              <Row justify={"space-between"}>
                <Col span={12}>
                  <Input
                    placeholder="Поиск по артикулу..."
                    prefix={<SearchOutlined className="site-form-item-icon" />}
                  />
                </Col>
                <Col span={7}>
                  <Row justify={"center"}>
                    <Col style={{ width: "100%" }}>
                      <Select style={{ width: "100%" }} defaultValue={250}>
                        <Option value={250}>Показывать по 250шт.</Option>
                        <Option value={500}>Показывать по 500шт.</Option>
                        <Option value={1000}>Показывать по 1000шт.</Option>
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card>
              <TasksTable
                data={tasksData}
                setIsDataUpdated={setIsDataUpdated}
                isLoading={isLoading}
              />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
