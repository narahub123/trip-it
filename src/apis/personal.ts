import axios from "axios";
import { getCookie } from "../utils/Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

// 개인정보 받기
export const fetchPersonalAPI = async () => {
  const response = await axios.get(`${baseURL}/mypage/personal`, {
    headers: {
      "Content-Type": "application/json",
      Access: `${localStorage.getItem("access")}`,
      Refresh: `${getCookie("refresh")}`,
    },
    withCredentials: true,
  });

  return response;
};

// 비번 업데이트
export const personallUpdataAPI = async (password: string) => {
  const response = await axios.post(
    `${baseURL}/mypage/personal/update`,
    { password },
    {
      headers: {
        "Content-Type": "application/json",
        Access: `${localStorage.getItem("access")}`,
        Refresh: `${getCookie("refresh")}`,
      },
      withCredentials: true,
    }
  );

  return response;
};
