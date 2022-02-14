import { Card, Col, Divider, Tooltip } from "antd";
import React from "react";
const RightInfoWidget = () => {
  return (
    <Col xs={24} sm={24} md={24} lg={6}>
      <Card className="right-info-widget-card">
        <div className="right-info-widget-title">
          Статистика работы министерства 
        </div>
        <div className="d-flex right-info-widget-value">
          <span>330</span>
         
        </div>
        <div>
          <span className="right-info-widget-description">
             общее количество заявок
          </span>
        </div>
        <Divider />
        <div className="right-info-widget-title">
          <span>В работе</span>
          <Tooltip
            placement="topLeft"
            title="tooltip"
          >
             <img style={{ cursor: "pointer" }} src="/img/others/mdi_info.svg" alt="" /> 
          </Tooltip>
        </div>
        <div className="d-flex right-info-widget-value">
          <span>17 заявок</span>
        </div>
        
        <Divider />
        <div className="right-info-widget-title">
          <span>Процент Выполнения</span>
          <Tooltip
            placement="topLeft"
            title="tooltip"
          >
            {/* <img style={{ cursor: "pointer" }} src="/img/others/mdi_info.svg" /> */}
          </Tooltip>
        </div>
        <div className="d-flex right-info-widget-value">
          <span>97%</span>
          <div className="pl-3"> <img src="/img/others/trending-up.svg" alt=""/></div>
        </div>
        <div>
          <span className="right-info-widget-description">Это отличный показатель</span>
        </div>
      </Card>
    </Col>
  );
};

export default RightInfoWidget;
