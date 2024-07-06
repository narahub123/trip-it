import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

// 관리자 신고 목록 보기
export const GetAllReportsAPI = async (page?: number, limit?: number) => {
  const response = await axios.get(
    `${baseURL}/reports/admin/test?page=${page}&limit=${limit}`
  );

  return response;
};
