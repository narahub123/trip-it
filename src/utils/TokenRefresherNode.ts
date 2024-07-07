import axios from "axios";
import { removeCookie } from "./Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

const refreshAPIForNode = axios.create({
  baseURL: `${baseURL}`,
  withCredentials: true,
});

let logoutMessageDisplayed = false;

refreshAPIForNode.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { code } = error.response.data;

    if (code === "logout" && !logoutMessageDisplayed) {
      logoutMessageDisplayed = true;
      localStorage.clear();
      removeCookie("refresh");
      removeCookie("refresh_token");
      removeCookie("access_token");
      window.alert("토큰이 만료되어 자동으로 로그아웃 되었습니다.");

      return Promise.reject(code);
    }
  }
);

export default refreshAPIForNode;
