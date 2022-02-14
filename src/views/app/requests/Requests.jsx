import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Input,
  Card,
  Select,
  Typography,
  Upload,
  Button,
} from "antd";
import { UploadOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import RequestsTable from "./RequestsTable";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectRoute } from "../../../redux/sideNavSlice";
import { ExcelRenderer } from "react-excel-renderer";
import adminServices from "../../../services/admin";

import tasks from "./data";
const { Title } = Typography;
const { Option } = Select;

export default function Requests() {
  const [claims, setClaims] = useState();
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.app.authToken);


  useEffect(() => {
    dispatch(selectRoute("claims"));
    getClaims();
  }, []);
  const [updateTime, setUpdateTime] = useState(
    `Обновлено ${moment().format(
      "DD MMMM YYYY"
    )} в ${moment().hours()}:${moment().minute()} `
  );
  function updateData() {
    getClaims();
    setUpdateTime(
      `Обновлено ${moment().format(
        "DD MMMM YYYY"
      )} в ${moment().hours()}:${moment().minute()}`
    );
  }
  function getClaims() {
    setIsLoading(true);
    adminServices.getClaims(auth).then((res:any) => {
      console.log(res);
      setClaims(res.data.data);
      setIsLoading(false);
      setIsDataUpdated(false);
    });
  }
  useEffect(() => {
    if (isDataUpdated) {
      updateData();
    } else return;
  }, [isDataUpdated]);

  // function fileHandler(event) {
  //   let fileObj = event.target.files[0];
  //   console.log(fileObj);
  //   //just pass the fileObj as parameter
  //   ExcelRenderer(fileObj, (err, resp) => {
  //     if (err:any) {
  //       console.log(err);
  //     } else {
        
  //       const tempData = [];
  //       for (let i = 1; i < resp.rows.length; i++) {
  //         adminServices
  //           .createClaim(auth, {
  //             claimType: resp.rows[i][0],
  //             description: resp.rows[i][1],
  //             address: resp.rows[i][2],

  //             title: resp.rows[i][3],
  //           })
  //           .then((res:any) => {
  //             console.log(res);
  //             setIsDataUpdated(true);
  //           })
  //           .catch((err:any) => console.log(err));
  //       }
  //       //setTasksData(tasksData.concat(tempData));
  //     }
  //     document.getElementById("file").value = "";
      
  //   });
  // }
  
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
              <Title level={3}>Заявки</Title>
            </Row>
            <Row>
              <span>Полная информация о заявках</span>
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
                {/* <Col>
                  <Row justify={"center"}>
                    <Col className="mt-1">
                      <input
                      
                        type="file"
                        name="file"
                        id="file"
                        class="inputfile"
                        onChange={(e) => fileHandler(e)}
                        hidden
                      />
                      <Button type="primary">
                        <label for="file">Excel</label>
                      </Button>
                    </Col>
                  </Row>
                </Col>{" "} */}
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card>
              <RequestsTable
                setIsDataUpdated={setIsDataUpdated}
                auth={auth}
                isLoading={isLoading}
                tasks={claims}
              />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
