export interface ReportRequestType {
  msgId?: string;
  postId?: string;
  userId: number;
  reportedUserId: number;
  reportCate: string;
  reportDetail: string;
  reportDate: string;
  reportFalse: number;
}
export interface ReportTestType extends ReportRequestType {
  _id: string;
}

export interface ReportType extends ReportRequestType {
  reportId: number;
}
