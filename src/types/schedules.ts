export interface MetroType {
  areaCode: string;
  name: string;
  description: string;
  imgUrl: string;
}

export interface ScheduleDetailType {
  schedule_order?: string;
  start_time?: string;
  end_time?: string;
  content_id?: string;
  createdAt?: Date;
}

export interface ScheduleType {
  schedule_id?: string;
  metro_id?: string;
  start_date?: string;
  end_date?: string;
  schedule_name?: string;
  schedule_detail?: ScheduleDetailType[] | [];
}
