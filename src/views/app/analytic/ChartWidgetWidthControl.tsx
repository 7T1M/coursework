import { Card, Checkbox, Col, Row } from "antd";
import moment from "moment";
import ChartWidget from "../../../components";
import { claims } from "./data";
import "moment/locale/ru";
import { get as getDashboardChartOptions } from "./AnalyticDashboardOptions";

const ChartWidgetWidthControl = () => {

  function getChartData(): Array<any>{
    let data:Array<any> = [];
    
    data = claims.filter(v => v.name === "Высокой")
    
    return data
  }
  

  moment.locale("ru");
  const checkboxDiv = {
    border: "1px solid #EDF2F9",
    borderRadius: "8px",
  };
  return (
    <Col xs={24} sm={24} md={24} lg={18}>
      <Card className="control-chart p-1">
        <Row className="card-title flex justify-between ">
          <div>Динамика заявок:</div>
        </Row>
        <Row>
          {/* <div className="radio-group-container">
            <Radio.Group>
              <Radio.Button value="top">Рубли</Radio.Button>
              <Radio.Button value="bottom">Товары</Radio.Button>
              <Radio.Button value="left">% выкупа</Radio.Button>
            </Radio.Group>
          </div> */}
          <Col style={checkboxDiv} className="p-2">
            <Row justify="center">
              <Col>
                <span className="checkbox-text">Приоритет заявок:</span>
              </Col>
              <Col className="mt-px">
                <Checkbox className="red" value="chartA">
                  Высокий
                </Checkbox>
                <Checkbox className="yellow" value="chartB">
                  Средний
                </Checkbox>
                <Checkbox className="green" value="chartC">
                  Низкий
                </Checkbox>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <ChartWidget
        customOptions={getDashboardChartOptions()}
        series={getChartData()}
        height={400} extra={undefined} loading={undefined}      />
    </Col>
  );
};
export default ChartWidgetWidthControl;
