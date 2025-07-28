import { Navigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuthContext();
  if (!user || user.role !== "admin") {
     return children;
  }
  
  return <Navigate to="/" />;
 
};

export default AdminRoute;
