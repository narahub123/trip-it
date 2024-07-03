export interface MetroType {
  areaCode: string;
  name: string;
  description: string;
  imgUrl: string;
}

export interface ScheduleDetailType {
  schedule_detail_id?: number;
  scheduel_id?: number;
  schedule_order: string; // column
  start_time: string;
  end_time: string;
  content_id: string;
  createdAt: string;
}

export interface ScheduleType {
  schedule_id?: string;
  metro_id?: string;
  start_date?: string;
  end_date?: string;
  schedule_title?: string;
  register_date?: string;
  user_id?: string;
  schedule_details?: ScheduleDetailType[];
}

export interface ScheduleFinal {
  schedule_id?: string;
  metro_id: string;
  start_date: string;
  end_date: string;
  schedule_name?: string;
  schedule_details?: ScheduleDetailType[];
}

export interface ScheduleReturnType {
  schedule_id: number;
  metro_id: string;
  start_date: string;
  end_date: string;
  schedule_title: string;
  register_date: string;
  user_id: string;
  schedule_details: ScheduleDetailType[];
}

export interface ScheduleDetailReturnType {
  schedule_detail_id: number;
  scheduel_id: number;
  schedule_order: string; // column
  start_time: string;
  end_time: string;
  content_id: string;
  createdAt: string;
}
