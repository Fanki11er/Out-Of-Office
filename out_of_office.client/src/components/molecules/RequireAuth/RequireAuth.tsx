import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { routerPaths } from "../../../router/routerPaths";

const { root } = routerPaths;

const RequireAuth = () => {
  const { user } = useAuth();

  //return user ? <Outlet /> : <Navigate to={root} />;
  return <Outlet />;
};

export default RequireAuth;
