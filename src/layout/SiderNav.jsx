import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import menus from "../configs/sideBardMenus";
import { Link } from "react-router-dom";
import Icon from "../custom-components/Icon";
import { Scrollbars } from "react-custom-scrollbars";
const { Sider } = Layout;

export default function SiderNav() {
  const collapsed = useSelector((state) => state.sideNav.collapsed);
  const selectedRoute = useSelector((state) => state.sideNav.selectedRoute);

  return (
    <Sider
      width={250}
      className="site-layout-background ant-layout-sider-dark side-nav"
      collapsed={collapsed}
    >
      <Scrollbars autohide>
        <Menu
          style={{
            height: "100%",
            borderRight: 0,
            paddingTop: "10%",
          }}
          mode="inline"
          defaultSelectedKeys={`${selectedRoute}`}
        >
          {menus.map((menu) => (
            <Menu.Item
              key={menu.key}
              style={{ fontSize: "15px" }}
              icon={<Icon className="text-lg" type={menu.icon} />}
            >
              <Link to={menu.path}> {menu.name} </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Scrollbars>
    </Sider>
  );
}
