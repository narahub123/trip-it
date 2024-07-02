export const reportList = {
  R1: "음란",
  R2: "폭력",
  R3: "욕설",
  R4: "기타",
};

export const reportFalsy = ["대기중", "처리완료", "허위신고", "중복신고"];

export const reportsHeaders = {
  "신고 종류": "report_cate",
  신고자: "user_id",
  대상자: "reported_user_id",
  "신고 글/메시지": "post_id" || "msg_id",
  "신고 상세": "report_detail",
  "신고 날짜": "report_date",
  "처리 여부": "report_false",
};

export const reportName = (report: string) => {
  const reportname =
    reportList[`${report.toUpperCase()}` as keyof typeof reportList];
  return reportname;
};

export const reportResult = (report: number) => {
  const result = reportFalsy[report];

  return result;
};
