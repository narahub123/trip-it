import axios from "axios";
import { getCookie } from "../utils/Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

// 차단 목록 가져오기
export const fetchBlocksAPI = async () => {
  const blocks = axios.get(`${baseURL}/blocks`, {
    headers: {
      "Content-Type": "application/json",
      Access: `${localStorage.getItem("access")}`,
      Refresh: `${getCookie("refresh")}`,
    },
    withCredentials: true,
  });

  console.log(blocks);

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
      console.log(response.data);
      if (!response.data) {
        window.alert(
          `차단 멤버가 추가되었지만 네트워크 문제로 확인할 수 없습니다.`
        );
      }

      window.alert("차단되었습니다.");
    })
    .catch();
};
