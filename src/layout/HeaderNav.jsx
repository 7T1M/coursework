import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCollapsed } from "../redux/sideNavSlice";
import { Layout, Row, Col, Button } from "antd";
import dpr from "../assets/img/ur-dpr75.png";
import { setAuthToken } from "../redux/appSlice";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;
export default function HeaderNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const collapsed = useSelector((state) => state.sideNav.collapsed);

  function OnCollapse() {
    if (collapsed) dispatch(setCollapsed(false));
    else dispatch(setCollapsed(true));
  }
  function logout() {
    dispatch(setAuthToken(""));
    navigate("/");
  }
  return (
    <Header className="bg-white app-header dark">
      <div className="app-header-wrapper">
        <div className="logo" style={{ width: 250 }}>
          <img classname="cursor-pointer" src={dpr} alt="logo" />
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
            <Button type="primary" onClick={logout} icon={<UserOutlined />}>
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </Header>
  );
}
