/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivateRoute = ({ children, roles }) => {
  const cookies = new Cookies();
  let token = cookies.get("token");
  let userId = cookies.get("userId");
  console.log("====================================");
  console.log(token);
  console.log(userId);
  console.log("====================================");

  if (token) {
    if (userId && roles.includes(userId.role)) {
      return children;
    } else {
      if (["admin", "chef de laboratoire"].includes(userId.role)) {
        return <Navigate replace to="/" />;
      } else {
        return <Navigate replace to="/demandes" />;
      }
    }
  } else {
    return <Navigate replace to="/login" />;
  }
};

export default PrivateRoute;
