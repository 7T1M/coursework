import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import "./css/light-theme.css";
import AuthRoutes from "./components/AuthRoutes";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, auth }) {
  if (auth) {
    return <Component />;
  } else {
    return <Navigate to="/" />;
  }
}
function AuthRoute({ component: Component, auth }) {
  if (auth) {
    return <Navigate to="/app/" />;
  } else {
    return <Component />;
  }
}

function App() {
  const auth = useSelector((state) => state.app.authToken);
  return (
    <Router>
      <Routes>
        <Route
          path="/app/*"
          element={<PrivateRoute component={AppLayout} auth={auth !== ""} />}
        />
        <Route path="/*" element={<AuthRoute component={AuthRoutes} auth={auth !== ""} />} />

        <Route element={<h1>Page not found</h1>} path="*" />
      </Routes>
    </Router>
  );
}

export default App;
