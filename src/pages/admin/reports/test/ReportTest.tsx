import { LuSiren } from "react-icons/lu";
import "./reportTest.css";
import {
  AddReportAPI,
  GetAllReportsByIdAPI,
  GetAllReportsForAdminAPI,
} from "../../../../apis/reports";
import { reports } from "../../../../data/test";
import { useEffect, useState } from "react";
import { ReportTestType } from "../../../../types/reports";

const value = reports[4];
const userId = 1;
const ReportTest = () => {
  const [msg, setMsg] = useState("");
  const [reports, setReports] = useState<ReportTestType[]>([]);

  useEffect(() => {
    // GetAllReportsByIdAPI(userId)
    //   .then((response) => {
    //     console.log(response.data);
    //     return setReports(response.data);
    //   })
    //   .catch((error) => console.log(error));
    GetAllReportsForAdminAPI()
      .then((res) => {
        return setReports(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleReport = async () => {
    const { reportId, ...rest } = value;

    const response = await AddReportAPI(rest);

    console.log(response);

    setMsg(response.status);
  };
  return (
    <>
      <div className="reportTest">
        <p title="신고하기" onClick={handleReport}>
          <LuSiren />
        </p>
        {msg}
      </div>
      <div className="report-list">
        <ul>
          {reports.map((report) => (
            <li key={report._id}>
              <span>{report.reportCate}</span>
              <span>{report.userId}</span>
              <span>{report.reportedUserId}</span>
              <span>{report.msgId || report.postId}</span>
              <span>{report.reportDetail}</span>
              <span>{report.reportDate}</span>
              <span>{report.reportFalse}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ReportTest;
