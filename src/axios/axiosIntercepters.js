import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

let accessToken = JSON.parse(localStorage.getItem("accessToken"));

const baseURL = "http://localhost:8000/api/v1";
export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (req) => {
  accessToken = JSON.parse(localStorage.getItem("accessToken"));

  if (!accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
    return req;
  }

  const response = jwt_decode(accessToken);

  const isExpired = dayjs.unix(response.exp).diff(dayjs()) < 1;

  if (isExpired) {
    await axios({
      url: `${baseURL}/auth/token/refresh`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })
      .then((res) => {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.accessToken)
        );
        accessToken = res.data.accessToken;
      })
      .catch((error) => {
        window.location.replace = "/login";
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        console.log(error.message);
      });
  }
  req.headers.Authorization = `Bearer ${accessToken}`;

  return req;
});
