import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "./useAuthState";

export const WithAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuthState();
  const location = useLocation();

  if (user === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
