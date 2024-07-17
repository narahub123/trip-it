import axios from "axios";
import { getCookie } from "../utils/Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

// 차단 목록 가져오기
export const fetchBlocksAPI = async (
  sortKey?: string,
  sortValue?: string,
  keyword?: string,
  search?: string,
  limit?: number,
  page?: number
) => {
  const blocks = axios.get(
    // `${baseURL}/block/user?sortKey=${sortKey}&sortValue=${sortValue}`, // 마이페이지
    `${baseURL}/blocks?sortKey=${sortKey}&sortValue=${sortValue}&keyword=${keyword}&search=${search}&limit=${limit}&page=${page}`,
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
// export const blockUserAPI = async (nickname: string) => {
export const blockUserAPI = async (blockedId: string) => {
  await axios
    .post(
      // `${baseURL}/block/add`, // spring
      `${baseURL}/blockedlist/add`, // nodejs
      {
        // nickname
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
      console.log(err.response.data.message);
      if (err.response.data.code === 11000) {
        alert(`이미 차단한 사용자입니다.`);
      }
      if (err.response.data.code === "1") {
        alert("자기 자신을 차단할 수 없습니다.");
      }
      if (err.response.data.code === "2") {
        alert("이미 차단한 사용자입니다.");
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
