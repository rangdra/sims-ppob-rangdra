import { useLocation, Navigate } from "react-router-dom";
import { getToken } from "../helpers/auth";

const PrivateRoute = ({ children, loginPath }: any) => {
  const isAuthenticated = getToken();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={loginPath || "/login"} state={{ from: location }} replace />
    );
  }

  return children;
};

export default PrivateRoute;
