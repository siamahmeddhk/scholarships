// hooks/useRole.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useRole = (email) => {
  const { data: user = {}, isLoading } = useQuery({
    queryKey: ['role', email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/${email}`);
      return res.data;
    },
    enabled: !!email
  });

  return { role: user.role, isLoading };
};

export default useRole;
