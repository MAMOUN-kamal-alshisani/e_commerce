import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireAuth = ({child}) => {
  const token = new Cookies()?.get('user')
  const location = useLocation();
  console.log(token.user);
  
  return token.user !== undefined ? (
     <Outlet />
  ) : (
    <Navigate to={"/signin"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
