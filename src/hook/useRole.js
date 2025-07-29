import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useRole = (email, userData) => {
  const queryClient = useQueryClient();

  const { data: user = {}, isLoading } = useQuery({
    queryKey: ["role", email],
    queryFn: async () => {
      try {
        const res = await axios.get(`https://s-server-two.vercel.app/users/${email}`);
        return res.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // User not found, create user in backend with default role
          await axios.post(`https://s-server-two.vercel.app/users`, {
            email,
            name: userData?.displayName || "New User",
            role: "user",
            photoURL: userData?.photoURL || "",
          });
          // After adding user, refetch data
          return queryClient.fetchQuery(["role", email], () =>
            axios.get(`https://s-server-two.vercel.app/users/${email}`).then((res) => res.data)
          );
        }
        throw error;
      }
    },
    enabled: !!email,
  });

  return { role: user.role, isLoading };
};

export default useRole;
