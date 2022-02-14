import { Card, Col, Row, Tooltip } from "antd";
import React from "react";

const StatisticByProducts = () => {
  const exampleData = {
    countA: 3,
    countB: 5,
    countC: 9,
    assortA: 27.6,
    assortB: 34.5,
    assortC: 37.9,
    percentA: 80,
    percentB: 15,
    percentC: 5,
  };

  /*
    docRef.get().then(function (doc) {
        if (doc.exists) {
            if (doc.data().checkNow) {

            }
            console.log(store.getState().analytic)
        }
    });
    */

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Card>
          <div className="card-title d-flex justify-content-between align-items-start">
            <span>Статистика по заявкам</span>
            <div className="d-flex align-items-center">
              <Tooltip
                placement="topLeft"
                title="tooltip"
              >
                <img
                  width={24}
                  style={{ cursor: "pointer" }}
                  src="/img/others/mdi_info.svg"
                  alt=""
                />
              </Tooltip>
            </div>
          </div>
          <Row className="w-100">
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <div className="product-stat">
                <div className="product-stat-main">
                  <span className="text-big-blue">{exampleData.countA}</span>
                  <img
                    className="product-stat-category"
                    src="/img/others/a-category.svg"
                    alt=""
                  />
                  <span className="normal-weight-title">
                    — наиболее важные заявки;
                  </span>
                </div>
                <div className="product-stat-description">
                  <span className="normal-weight-description-gray w-100">
                    {exampleData.assortA}% — от общего количества;
                  </span>
                  <span className="normal-weight-description-gray w-100">
                    процент выполнения - {exampleData.percentA}%;
                  </span>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <div className="product-stat">
                <div className="product-stat-main">
                  <span className="text-big-blue">{exampleData.countB}</span>
                  <img
                    className="product-stat-category"
                    src="/img/others/b-category.svg"
                    alt=""
                  />
                  <span className="normal-weight-title">
                    — заявки средней важности;
                  </span>
                </div>
                <div className="product-stat-description">
                  <span className="normal-weight-description-gray w-100">
                    {exampleData.assortB}% — от общего количества;
                  </span>
                  <span className="normal-weight-description-gray w-100">
                    процент выполнения - {exampleData.percentB}%;
                  </span>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <div className="product-stat">
                <div className="product-stat-main">
                  <span className="text-big-blue">{exampleData.countC}</span>
                  <img
                    className="product-stat-category"
                    src="/img/others/c-category.svg"
                    alt=""
                  />
                  <span className="normal-weight-title">
                    — наименее важные заявки;
                  </span>
                </div>
                <div className="product-stat-description">
                  <span className="normal-weight-description-gray w-100">
                    {exampleData.assortC}% — от общего количества;
                  </span>
                  <span className="normal-weight-description-gray w-100">
                  процент выполнения - {exampleData.percentC}%;
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticByProducts;
