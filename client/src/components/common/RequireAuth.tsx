import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { JSX } from "react";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isLogin);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children; // Render the children component if authenticated
};

export default RequireAuth;
