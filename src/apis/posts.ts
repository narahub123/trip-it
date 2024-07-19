import axios from "axios";
import { getCookie } from "../utils/Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

// 모집글 목록 가져오기(관리자)
// export const fetchPostsAPI = async () => {
//   const posts = await axios.get(`${baseURL}/admin/posts`, {
//     headers: {
//       "Content-Type": "application/json",
//       Access: `${localStorage.getItem("access")}`,
//       Refresh: `${getCookie("refresh")}`,
//     },
//     withCredentials: true,
//   });

//   console.log("받은 데이터", posts);

//   return posts;
// };

// 모집글 목록 가져오기(마이페이지)
export const fetchPostsAPI = async () => {
  const posts = await axios.get(`${baseURL}/mypage/postList`, {
    headers: {
      "Content-Type": "application/json",
      Access: `${localStorage.getItem("access")}`,
      Refresh: `${getCookie("refresh")}`,
    },
    withCredentials: true,
  });

  console.log("받은 데이터", posts);

  return posts;
};

// 모집글 삭제
export const DeletePostAPI = async (postId: number) => {
  const posts = await axios.post(`${baseURL}/mypage/postList/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Access: `${localStorage.getItem("access")}`,
      Refresh: `${getCookie("refresh")}`,
    },
    withCredentials: true,
  });

  console.log("받은 데이터", posts);

  return posts;
};
