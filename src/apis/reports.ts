import axios from "axios";
import { ReportRequestType } from "../types/reports";

const baseURL = process.env.REACT_APP_SERVER_URL;

export const AddReportAPI = async (value: ReportRequestType) =>
  await axios
    .post(`${baseURL}/reports/add`, value)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
