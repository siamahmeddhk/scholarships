// src/components/ModeratorRoute.jsx
import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../../context/AuthContext"; // ✅ fixed path
import useRole from "../../hook/useRole";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();
  const { role, isLoading } = useRole(user?.email);

  if (loading || isLoading) return <p>Loading...</p>;

  if (user && role === "moderator") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ModeratorRoute;
