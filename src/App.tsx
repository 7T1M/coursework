import {
  BrowserRouter as Router,
  Navigate,
  Route,
  RouteProps,
  Routes,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AuthRoutes from "./components/AuthRoutes";
import { useAppSelector } from "./redux/hooks";

interface IGuardRouteProps extends Omit<RouteProps, "components"> {
  component: React.ElementType;
  auth: boolean;
}

const PrivateRoute: React.FC<IGuardRouteProps> = ({
  component: Component,
  auth,
}) => {
  if (auth) {
    return <Component />;
  } else {
    return <Navigate to="/" />;
  }
};
const AuthRoute: React.FC<IGuardRouteProps> = ({
  component: Component,
  auth,
}) => {
  if (auth) {
    return <Navigate to="/app/" />;
  } else {
    return <Component />;
  }
};

function App() {
  const auth: string = useAppSelector((state) => state.app.authToken);
  return (
    <Router>
      <Routes>
        <Route
          path="/app/*"
          element={<PrivateRoute component={AppLayout} auth={auth !== ""} />}
        />
        <Route
          path="/*"
          element={<AuthRoute component={AuthRoutes} auth={auth !== ""} />}
        />

        <Route element={<h1>Page not found</h1>} path="*" />
      </Routes>
    </Router>
  );
}

export default App;
