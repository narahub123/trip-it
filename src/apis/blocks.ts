import axios from "axios";
import { getCookie } from "../utils/Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

export const fetchBlocksAPI = async () => {
  const blocks = axios.get(`${baseURL}/admin/blocks`, {
    headers: {
      "Content-Type": "application/json",
      Access: `${localStorage.getItem("access")}`,
      Refresh: `${getCookie("refresh")}`,
    },
    withCredentials: true,
  });

  return blocks;
};
