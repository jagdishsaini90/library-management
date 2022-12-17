import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("userData"))
  );

  const [, setAuthToken] = useState(() =>
    JSON.parse(localStorage.getItem("accessToken"))
  );

  const logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    setUser(() => null);
    setAuthToken(() => null);
  };

  const values = {
    user,
    setUser,
    logout,
    setAuthToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
