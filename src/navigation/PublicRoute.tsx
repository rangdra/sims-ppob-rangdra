import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import { getToken } from "../helpers/auth";

export interface IProps {
  children: ReactElement;
}

const PublicRoute: React.FC<IProps> = ({ children }) => {
  const isAuthenticated = getToken();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default PublicRoute;
