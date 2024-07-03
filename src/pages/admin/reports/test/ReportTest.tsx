import { LuSiren } from "react-icons/lu";
import "./reportTest.css";
import { AddReportAPI } from "../../../../apis/reports";
import { reports } from "../../../../data/test";
import { useState } from "react";

const ReportTest = () => {
  const [msg, setMsg] = useState("");
  const handleReport = async () => {
    const value = reports[0];
    const { reportId, ...rest } = value;

    const response = await AddReportAPI(rest);

    setMsg(response.status);
  };
  return (
    <div className="reportTest">
      <p title="신고하기" onClick={handleReport}>
        <LuSiren />
      </p>
      {msg}
    </div>
  );
};

export default ReportTest;
