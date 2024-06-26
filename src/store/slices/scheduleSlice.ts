import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ScheduleType } from "../../types/schedules";
export interface ScheduleState {
  schedule: ScheduleType;
}

// initialState에 null 값을 넣으면 reducer 생성시 왼쪽에 옵션이 들어가서 에러가 뜸
// initialState 작성법에 대해 조금 더 공부해야 할 듯
const initialState: ScheduleState = {
  schedule: {
    metro_id: "",
    schedule_title: "",
    start_date: undefined,
    end_date: undefined,
    schedule_details: [],
  },
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    // 리셋하기
    resetSchedule: () => initialState,
    // 지역 코드 추가
    addAreaCode: (state, action: PayloadAction<string>) => {
      if (action.payload) state.schedule.metro_id = action.payload;
    },
    // 날짜 추가
    addDates: (
      state,
      action: PayloadAction<{ start: string; end: string }>
    ) => {
      if (action.payload) {
        state.schedule.start_date = action.payload.start;
        state.schedule.end_date = action.payload.end;
      }
    },
    // 제목 추가
    addTitle: (state, action: PayloadAction<string>) => {
      state.schedule.schedule_title = action.payload;
    },
  },
});

export const { addAreaCode, addDates, addTitle, resetSchedule } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
