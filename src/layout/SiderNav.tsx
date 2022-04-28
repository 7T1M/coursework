import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import menus from "../configs/Routes";
import { Link } from "react-router-dom";
import Icon from "../custom-components/Icon";
import { RootState } from "../store";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

const { Sider } = Layout;

export default function SiderNav() {
  const collapsed = useAppSelector((state) => state.sideNav.collapsed);
  const selectedRoute = useAppSelector((state) => state.sideNav.selectedRoute);

  return (
    <Sider
      width={250}
      className="site-layout-background ant-layout-sider-dark side-nav overflow-auto"
      collapsed={collapsed}
    >
      <Menu
        style={{
          height: "100%",
          borderRight: 0,
          paddingTop: "10%",
        }}
        mode="inline"
        defaultSelectedKeys={[selectedRoute]}
      >
        {menus.map((menu) => (
          <Menu.Item
            key={menu.key}
            style={{ fontSize: "15px" }}
            icon={<Icon className="text-lg" name={menu.icon} />}
          >
            <Link to={menu.path}> {menu.name} </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}
