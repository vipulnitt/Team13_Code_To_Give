import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn&&( !document.cookie.includes("counselorToken")||!document.cookie.includes("token"))) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRoute;