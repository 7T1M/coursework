import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Input, Card, Select, Typography } from "antd";
import RequestsTable from "./RequestsTable";
import moment from "moment";
import { useEffect } from "react";
import { selectRoute } from "../../../redux/sideNavSlice";
import adminServices from "../../../services/admin";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { IClaimData } from "../../../shared-interfaces/IClaimData";
const { Title } = Typography;
const { Option } = Select;

export default function Requests() {
  const [claims, setClaims] = useState<IClaimData[]>([]);
  const [data, setData] = useState<IClaimData[]>();
  const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.app.authToken);

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
  function searchInDataTableData(str: string) {
    return claims.filter((claim) =>
      claim.title.toLocaleLowerCase().includes(str.toLowerCase())
    );
  }
  function setSearchFilter(query: string): void {
    setData(searchInDataTableData(query));
  }
  function getClaims() {
    setIsLoading(true);
    adminServices.getClaims(auth).then((res) => {
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
                        value={pageSize}
                        onChange={(e) => setPageSize(e)}
                      >
                        <Option value={10}>Показывать по 10шт.</Option>
                        <Option value={20}>Показывать по 20шт.</Option>
                        <Option value={50}>Показывать по 50шт.</Option>
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
              <RequestsTable
                setIsDataUpdated={setIsDataUpdated}
                auth={auth}
                isLoading={isLoading}
                claims={data ?? claims}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
