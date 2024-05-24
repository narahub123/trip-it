export interface MetroType {
  areaCode: string;
  name: string;
  description: string;
  imgUrl: string;
}

export interface ScheduleDetailType {
  schedule_order?: string;
  start_time?: Date;
  end_time?: Date;
  content_id?: string;
  content_type_id?: string;
  createdAt?: Date;
}

export interface ScheduleType {
  schedule_id?: string;
  metro_id?: string;
  start_date?: Date;
  end_date?: Date;
  schedule_name?: string;
  schedule_detail?: ScheduleDetailType[] | [];
}
