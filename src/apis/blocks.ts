import axios from "axios";
import { getCookie } from "../utils/Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

// 차단 목록 가져오기
export const fetchBlocksAPI = async (
  sortKey?: string,
  sortValue?: string,
  keyword?: string,
  search?: string
) => {
  const blocks = axios.get(
`${baseURL}/blocks?sortKey=${sortKey}&sortValue=${sortValue}&keyword=${keyword}&search=${search}`,
    {
      headers: {
        "Content-Type": "application/json",
        Access: `${localStorage.getItem("access")}`,
        Refresh: `${getCookie("refresh")}`,
      },
      withCredentials: true,
    }
  );

  return blocks;
};

// 차단 하기
export const blockUserAPI = async (blockedId: string) => {
  axios
    .post(
      `${baseURL}/blockedlist/add`,
      {
        blockedId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Access: `${localStorage.getItem("access")}`,
          Refresh: `${getCookie("refresh")}`,
        },
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err.response.data.code);
      if (err.response.data.code === 11000) {
        alert(`이미 차단한 사용자입니다.`);
      }
    });
};

// 차단 해제 하기
export const unblockUserAPI = async (blockId: string | number) => {
  const blocks = axios.post(
    `${baseURL}/blockedlist/release`,
    {
      blockId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Access: `${localStorage.getItem("access")}`,
        Refresh: `${getCookie("refresh")}`,
      },
      withCredentials: true,
    }
  );

  return blocks;
};
