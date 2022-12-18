import { useState } from "react";
import { useAuthContext } from "../Components/auth/authProvider";
import { axiosInstance } from "../axios/axiosIntercepters";

const useRegister = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser, setAuthToken } = useAuthContext();
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e, email, password, name) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter all the details");
      return;
    }

    setError(null);
    setLoading(true);

    await axiosInstance({
      method: "POST",
      url: "/auth/signup",
      data: JSON.stringify({
        email,
        password,
        name,
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
        if (
          error.response.data === "Error: User already exist!" ||
          error.response.data === "Error: Please provide credentials"
        )
          setError(error.response.data);
        else {
          setError(error.message);
        }
      });

    setLoading(false);
  };

  return { error, loading, handleRegister, success };
};

export default useRegister;
