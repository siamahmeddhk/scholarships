
import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);

// ✅ Export this custom hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

