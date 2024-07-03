export const reportList = {
  R1: "음란",
  R2: "폭력",
  R3: "욕설",
  R4: "기타",
};

export const reportFalsy = ["대기중", "처리완료", "허위신고", "중복신고"];

export const reportsHeaders = {
  "신고 종류": "reportCate",
  신고자: "userId",
  대상자: "reportedUserId",
  "신고 글/메시지": "postId" || "msgId",
  "신고 상세": "reportDetail",
  "신고 날짜": "reportDate",
  "처리 여부": "reportFalse",
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
