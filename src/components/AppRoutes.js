import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Roles from "../views/app/roles/Roles";
import Users from "../views/app/users/Users";
import Requests from "../views/app/requests/Requests";
import Managers from "../views/app/managers/Managers";
import RequestsCategory from "../views/app/requests-category/RequestsCategory";
import Drivers from "../views/app/drivers/Drivers";
import Transport from "../views/app/transport/Transport";
import Analytic from "../views/app/analytic/Analytic";
import News from "../views/app/news/News";
import Tasks from "../views/app/tasks/Tasks";
import MapPage from "../views/app/map/MapPage";

export default function appRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/analytic" />} />
      <Route path="*" element={<Navigate to="/*" />} />
      <Route path="roles" element={<Roles />} />
      <Route path="users" element={<Users />} />
      <Route path="requests-categories" element={<RequestsCategory />} />
      <Route path="services" element={<Managers />} />
      <Route path="analytic" element={<Analytic />} />
      <Route path="transport" element={<Transport />} />
      <Route path="claims" element={<Requests />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="drivers" element={<Drivers />} />
      <Route path="news" element={<News />} />
      <Route path="heatmap" element={<MapPage />} />
    </Routes>
  );
}
