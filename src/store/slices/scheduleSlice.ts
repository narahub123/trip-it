import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ScheduleDetailType, ScheduleType } from "../../types/schedules";

export interface ScheduleState {
  schedule: ScheduleType;
  schedule_detail?: ScheduleDetailType;
}

// initialState에 null 값을 넣으면 reducer 생성시 왼쪽에 옵션이 들어가서 에러가 뜸
// initialState 작성법에 대해 조금 더 공부해야 할 듯
const initialState: ScheduleState = {
  schedule: {
    metro_id: "",
    schedule_name: "",
    start_date: undefined,
    end_date: undefined,
  },
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    // 지역 코드 추가
    addAreaCode: (state, action: PayloadAction<string>) => {
      console.log(action.payload);

      if (action.payload) state.schedule.metro_id = action.payload;
    },
    // 날짜 추가
    addDates: (
      state,
      action: PayloadAction<{ start: string; end: string }>
    ) => {
      console.log(action.payload);
      if (action.payload) {
        state.schedule.start_date = action.payload.start;
        state.schedule.end_date = action.payload.end;
      }
    },
  },
});

export const { addAreaCode, addDates } = scheduleSlice.actions;

export default scheduleSlice.reducer;
