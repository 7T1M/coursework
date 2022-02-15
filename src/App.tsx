import {
  BrowserRouter as Router,
  Navigate,
  Route,
  RouteProps,
  Routes,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import "./css/light-theme.css";
import AuthRoutes from "./components/AuthRoutes";
import { useSelector } from "react-redux";

interface IGuardRouteProps extends Omit<RouteProps, "components"> {
  component: React.ElementType;
  auth: boolean;
}

const  PrivateRoute:React.FC<IGuardRouteProps> = ({component:Component, auth}) => {
  if (auth) {
    return <Component />;
  } else {
    return <Navigate to="/" />;
  }
}
const AuthRoute: React.FC<IGuardRouteProps> = ({component:Component, auth}) => {
  if (auth) {
    return <Navigate to="/app/" />;
  } else {
    return <Component />;
  }
}

function App() {
  const auth:string = useSelector((state: any) => state.app.authToken);
  return (
    <Router>
      <Routes>
        <Route
          path="/app/*"
          element={<PrivateRoute component={AppLayout} auth={true} />}
        />
        <Route
          path="/*"
          element={<AuthRoute component={AuthRoutes} auth={true} />}
        />

        <Route element={<h1>Page not found</h1>} path="*" />
      </Routes>
    </Router>
  );
}

export default App;