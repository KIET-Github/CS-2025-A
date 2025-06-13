import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token"); // ✅ Check if user is authenticated
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
