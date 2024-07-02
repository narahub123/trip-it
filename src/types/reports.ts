export interface ReportType {
  report_id: number;
  msg_id?: string;
  post_id?: string;
  user_id: number;
  reported_user_id: number;
  report_cate: string;
  report_detail?: string;
  report_date: string;
  report_false: number;
}
