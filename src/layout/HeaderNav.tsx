import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { setCollapsed } from "../redux/sideNavSlice";
import { Layout, Row, Col, Button } from "antd";
import dpr from "../assets/img/logo.png";
import { setAuthToken } from "../redux/appSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Logger from "../logger/Logger";

const { Header } = Layout;
export default function HeaderNav() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const collapsed = useAppSelector((state) => state.sideNav.collapsed);
  const logger: Logger = useAppSelector((state) => state.app.logger!);
  function OnCollapse() {
    if (collapsed) dispatch(setCollapsed(false));
    else dispatch(setCollapsed(true));
  }
  function logout() {
    logger.userLogout();
    dispatch(setAuthToken(""));
    navigate("/");
  }
  return (
    <Header className="bg-white app-header dark">
      <div className="app-header-wrapper">
        <div className="flex" style={{ width: 250 }}>
          <img className="cursor-pointer" src={dpr} alt="logo" />
          <div className="logoText">ТВОЯ РЕСПУБЛИКА</div>
        </div>
        <div className="nav mt-1" onClick={OnCollapse}>
          <Row>
            <Col span={24}>
              {collapsed ? (
                <MenuFoldOutlined className="text-2xl text-[#1a3353d9]  hover:text-[#5692f8]" />
              ) : (
                <MenuUnfoldOutlined className="text-2xl text-[#1a3353d9]  hover:text-[#5692f8] " />
              )}
            </Col>
          </Row>
        </div>
        <div className="nav-right">
          <div style={{ display: "flex", marginRight: 20 }}>
            <Button
              className="mr-5"
              onClick={() => logger.downloadLog()}
              type="primary"
            >
              Скачать Лог Пользователя
            </Button>
            <Button type="primary" onClick={logout} icon={<UserOutlined />}>
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </Header>
  );
}
