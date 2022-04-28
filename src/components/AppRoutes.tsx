import React, { FC } from "react";
import { Route, Routes, Navigate, RouteProps } from "react-router-dom";
import UserRole from "../models/userRole";
import menus from "../configs/Routes";
import IAppRoute from "../shared-interfaces/IAppRoute";
import { useAppSelector } from "../redux/hooks";

interface IRoleGuardRouteProps extends Omit<RouteProps, "component"> {
  component: React.ElementType;
  userRole: UserRole;
  acceptableRoles: UserRole[];
}

const RoleGuardRoute: FC<IRoleGuardRouteProps> = ({
  component: Component,
  userRole,
  acceptableRoles,
}) => {
  if (acceptableRoles.includes(userRole)) {
    return <Component />;
  }
  return <Navigate to="*" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/news" />} />
      <Route path="*" element={<Navigate to="/*" />} />
      {menus.map((route: IAppRoute) => {
        return <Route path={route.path} element={<route.component />} />;
      })}
    </Routes>
  );
};

export default AppRoutes;
