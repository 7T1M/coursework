import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";
import SiderNav from "./SiderNav";
import HeaderNav from "./HeaderNav";
import AppRoutes from "../components/AppRoutes";
import { useEffect } from "react";
import adminServices from "../services/admin";
import {
  setCities,
  setClaimTypes,
  setServices,
  setLogger,
  setAuthToken,
} from "../redux/appSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Logger from "../logger/Logger";

const { Content } = Layout;

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.sideNav.collapsed);
  const auth = useAppSelector((state) => state.app.authToken);
  const logger: Logger | undefined = useAppSelector(
    (state) => state.app.logger
  );
  const location = useLocation();
  useEffect(() => {
    if (logger instanceof Logger) {
      logger.userChangePage(location.pathname.split("/")[2]);
    }
  }, [location]);
  const padding = collapsed ? "80px" : "250px";

  useEffect(() => {
    adminServices.getCities(auth).then((res) => {
      dispatch(setCities(res.data.data));
    });

    adminServices
      .getClaimsTypes(auth)
      .then((res) => {
        dispatch(setClaimTypes(res.data.data));
      })
      .catch((err) => console.error(err));
    adminServices.getServices(auth).then((res) => {
      dispatch(setServices(res.data.data));
    });
    if (logger === undefined) {
      dispatch(setAuthToken(""));
    }
    if (!(logger instanceof Logger)) {
      const newLogger = new Logger(logger!.userName, logger!.logText);
      dispatch(setLogger(newLogger));
      console.debug(newLogger);
    }
  }, []);

  return (
    <div>
      <a id="fileDownload" className="hidden" />
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
