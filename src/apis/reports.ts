import axios from "axios";
import { ReportRequestType } from "../types/reports";

const baseURL = process.env.REACT_APP_SERVER_URL;

// 신고하기
export const AddReportAPI = async (value: ReportRequestType) =>
  await axios
    .post(`${baseURL}/reports/add`, value)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { status: "rejected" };
    });

// 내 신고 보기
export const GetAllReportsByIdAPI = async (userId: number) => {
  const response = await axios.get(`${baseURL}/reports/list`, {
    params: { userId },
  });

  return response;
};

// 관리자 신고 목록 보기
export const GetAllReportsForAdminAPI = async () => {
  const response = await axios.get(`${baseURL}/reports/admin`);

  return response;
};

// 신고 처리하기
export const updateReportAPI = async (
  reportId: string,
  reportFalse: number
) => {
  console.log(reportId);
  try {
    const response = await axios.post(`${baseURL}/reports/update`, {
      reportId,
      reportFalse,
    });

    return response.data;
  } catch (error) {
    console.error(error);

    return { status: "rejected" };
  }
};
