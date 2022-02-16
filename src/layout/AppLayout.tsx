import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import SiderNav from "./SiderNav";
import HeaderNav from "./HeaderNav";
import AppRoutes from "../components/AppRoutes";
import { useEffect } from "react";
import adminServices from "../services/admin";
import Logger from "../logger/Logger";
import { RootState, AppDispatch } from "../store";
import {
  setCities,
  setPoints,
  setRoutes,
  setClaimTypes,
  setServices,
  setLogger,
  setAuthToken,
} from "../redux/appSlice";
import { IAppState, ILoggerObject } from "../shared-interfaces/IAppState";
import { useAppSelector,useAppDispatch } from "../redux/hooks";

const { Content } = Layout;

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const collapsed = useAppSelector((state) => state.sideNav.collapsed);
  const auth = useAppSelector((state) => state.app.authToken);
  const padding = collapsed ? "80px" : "250px";
  const logger: IAppState | ILoggerObject = useSelector(
    (state: RootState) => state.app.logger!
  );
  if (logger instanceof Logger) {
  } else {
    if (!logger) {
      dispatch(setAuthToken(""));
      navigate("/");
    }
    const newLogger = new Logger(logger.userName, logger.logText);
    dispatch(setLogger(newLogger));
  }
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
      .catch((err) => console.error(err));
    adminServices.getServices(auth).then((res) => {
      dispatch(setServices(res.data.data));
    });
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
