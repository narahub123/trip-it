export interface ReportType {
  reportId: number;
  msgId?: string;
  postId?: string;
  userId: number;
  reportedUserId: number;
  reportCate: string;
  reportDetail?: string;
  reportDate: string;
  reportFalse: number;
}