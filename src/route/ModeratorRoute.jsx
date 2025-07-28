import { Navigate } from "react-router";
import useRole from "../hook/useRole";
import { useAuthContext } from "../context/AuthContext";

const ModeratorRoute = ({ children }) => {
  const { user } = useAuthContext();
  const { role, isLoading } = useRole(user?.email);

  if (isLoading) return <p>Loading...</p>;

  // ✅ Allow moderator and admin
  if (role === "moderator" || role === "admin") {
    return children;
  }

  return <Navigate to="/" />;
};

export default ModeratorRoute;
