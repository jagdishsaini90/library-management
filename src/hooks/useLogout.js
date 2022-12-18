import { useState } from "react";
import { axiosInstance } from "../axios/axiosIntercepters";
import { useAuthContext } from "../Components/auth/authProvider";

const useLogout = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser, setAuthToken } = useAuthContext();

  const handleLogout = async () => {
    setLoading(() => true);
    await axiosInstance({
      method: "GET",
      url: "/auth/logout",
    })
      .then(() => {
        localStorage.removeItem("userData");
        localStorage.removeItem("accessToken");
        setUser(() => null);
        setAuthToken(() => null);
      })
      .catch((err) => setError(err.message));
    setLoading(() => false);
  };

  return { loading, error, handleLogout };
};

export default useLogout;
