import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import SiderNav from "./SiderNav";
import HeaderNav from "./HeaderNav";
import AppRoutes from "../components/AppRoutes";
import { useEffect } from "react";
import adminServices from "../services/admin";
import {
  setCities,
  setPoints,
  setRoutes,
  setClaimTypes,
  setServices,
} from "../redux/appSlice";
const { Content } = Layout;

export default function AppLayout() {
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.sideNav.collapsed);
  const auth = useSelector((state) => state.app.authToken);
  const padding = collapsed ? "80px" : "250px";

  console.log(useSelector((state) => state.app));
  useEffect(() => {
    adminServices.getCities(auth).then((res) => {
      dispatch(setCities(res.data.data));
    });
    adminServices.getPoints(auth).then((res) => {
      dispatch(setPoints(res.data.data));
    });
    adminServices.getRoutes(auth).then((res) => {
      dispatch(setRoutes(res.data.data));
    });
    adminServices
      .getClaimsTypes(auth)
      .then((res) => {
        dispatch(setClaimTypes(res.data.data));
      })
      .catch((err) => console.log(err));
    adminServices.getServices(auth).then((res) => {
      dispatch(setServices(res.data.data));
    });
  }, []);

  return (
    <div>
      <Layout style={{ height: "100vh " }}>
        <HeaderNav />
        <Layout className="app-container">
          <SiderNav />
          <Layout style={{ paddingLeft: padding }}>
            <div className="app-content overflow-x-hidden">
              <Content>
                <AppRoutes />
              </Content>
            </div>
          </Layout>
        </Layout>

        <Outlet />
      </Layout>
    </div>
  );
}
