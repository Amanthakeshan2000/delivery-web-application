import axios from "axios";

export const USER_LOGIN = "User/login";
export const USER_REFRESH = "User/refresh";

export default axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
});
