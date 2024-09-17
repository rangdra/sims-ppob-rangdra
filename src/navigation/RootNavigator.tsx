import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Home from "../screens/home";
import PrivateRoute from "./PrivateRoute";
import Topup from "../screens/topup";
import Paid from "../screens/services/Paid";
import Profile from "../screens/profile";
import Transaction from "../screens/transaction";

const RootNavigator: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute loginPath="/login">
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/top-up"
          element={
            <PrivateRoute loginPath="/login">
              <Topup />
            </PrivateRoute>
          }
        />
        <Route
          path="/service/:code"
          element={
            <PrivateRoute loginPath="/login">
              <Paid />
            </PrivateRoute>
          }
        />

        <Route
          path="/akun"
          element={
            <PrivateRoute loginPath="/login">
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/akun/edit"
          element={
            <PrivateRoute loginPath="/login">
              <Profile isEdit={true} />
            </PrivateRoute>
          }
        />

        <Route
          path="/transaction"
          element={
            <PrivateRoute loginPath="/login">
              <Transaction />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigator;
