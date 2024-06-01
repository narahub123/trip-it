import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScheduleDetailType, ScheduleType } from "../../types/schedules";
import { Rootstate } from "../store";
import { DestrucDateType } from "../../pages/schedule/choice/dates/Calendar";

export interface ScheduleState {
  schedule: ScheduleType;
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

// 컬럼 가져오기
export const addScheduleDetail = createAsyncThunk(
  "schedule/addScheduleDetail",
  (date: DestrucDateType, { getState }) => {
    const { columnPlaces, schedule } = getState() as Rootstate;

    // 목표 위치가 보관함인 경우에는 저장 안함
    if (columnPlaces.goalCol === "_1" && columnPlaces.curCol === "_1") return;
    else if (columnPlaces.curCol !== "_1" && columnPlaces.goalCol === "_1") {
      // schedule_detials에서 해당 장소에 대한 정보 삭제
      removeScheduleDetail(columnPlaces.curRow);
      return;
    }
    const schedule_order = columnPlaces.goalCol;
    const content_id = columnPlaces.curRow;

    const selectedDetail = schedule.schedule.schedule_details?.find(
      (d) => d.content_id === content_id
    );

    const start_time = selectedDetail
      ? selectedDetail.start_time
      : new Date(date.year, date.month, date.date, 7).toISOString();
    const end_time = selectedDetail
      ? selectedDetail.end_time
      : new Date(date.year, date.month, date.date, 9).toISOString();
    const createdAt = new Date().toISOString();

    const detail = {
      schedule_order,
      content_id,
      start_time,
      end_time,
      createdAt,
    };
    return detail;
  }
);

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
    addTitle: (state, action: PayloadAction<string>) => {
      state.schedule.schedule_name = action.payload;
    },
    // schedule_detail 삭제
    removeScheduleDetail: (state, action: PayloadAction<string>) => {
      const newDetailArray = state.schedule.schedule_details?.filter(
        (detail) => detail.content_id !== action.payload
      );

      if (newDetailArray) state.schedule.schedule_details = [...newDetailArray];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      addScheduleDetail.fulfilled,
      (state, action: PayloadAction<ScheduleDetailType | undefined>) => {
        if (action.payload) {
          const detail = action.payload;

          if (
            state.schedule.schedule_details?.findIndex(
              (stateDetail) => stateDetail.content_id === detail.content_id
            ) !== -1
          ) {
            const newScheduleDetails = state.schedule.schedule_details?.filter(
              (stateDetail) => stateDetail.content_id !== detail.content_id
            );

            if (newScheduleDetails)
              state.schedule.schedule_details = [...newScheduleDetails, detail];
          } else {
            state.schedule.schedule_details.push(detail);
          }
        }
      }
    );
  },
});

export const { addAreaCode, addDates, removeScheduleDetail, addTitle } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
