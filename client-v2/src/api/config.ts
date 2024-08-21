import axios from "axios";

export const USER_LOGIN = "https://checkmateapi20240716235602.azurewebsites.net/api/User/login";
export const USER_REGISTER = "User/register";
export const USER_REFRESH = "User/refresh";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});
