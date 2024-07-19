import axios from "axios";
import { getCookie } from "../utils/Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

export const fetchSchedulesAPI = async () => {
  const schedules = axios.get(`${baseURL}/mypage/schedules`, {
    headers: {
      "Content-Type": "application/json",
      Access: `${localStorage.getItem("access")}`,
      Refresh: `${getCookie("refresh")}`,
    },
    withCredentials: true,
  });

  return schedules;
};
