import { Navigate } from 'react-router';


import useRole from '../hook/useRole';
import { useAuthContext } from '../context/AuthContext';

const ModeratorRoute = ({ children }) => {
  const { user } = useAuthContext();
  const { role, isLoading } = useRole(user?.email);

  if (isLoading) return <p>Loading...</p>;

  if (role !== 'moderator') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ModeratorRoute;
