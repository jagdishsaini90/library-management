import { useState } from "react";
import { useAuthContext } from "../Components/auth/authProvider";
import { axiosInstance } from "../axios/axiosIntercepters";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser, setAuthToken } = useAuthContext();
  const [success, setSuccess] = useState(false);

  const handleLogin = async (email, password) => {
    setError(null);
    setLoading(true);

    await axiosInstance({
      method: "POST",
      url: "/auth/login",
      data: JSON.stringify({
        email,
        password,
      }),
    })
      .then(async (res) => {
        setSuccess(() => true);
        setUser(() => res.data.user);
        setAuthToken(() => res.data.accessToken);
        await localStorage.setItem("userData", JSON.stringify(res.data.user));
        await localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.accessToken)
        );
      })
      .catch((error) => {
        setError(error.response.data);
      });

    setLoading(false);
  };

  return { error, loading, handleLogin, success };
};

export default useLogin;
