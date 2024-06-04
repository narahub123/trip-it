import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScheduleDetailType, ScheduleType } from "../../types/schedules";
import { Rootstate } from "../store";
import { DestrucDateType } from "../../pages/schedule/choice/dates/Calendar";
import { addPlaceToColumn } from "./columnPlacesSlice";
import { useDispatch } from "react-redux";
import { PlaceApiType } from "../../types/place";
import { DateDestructType } from "./dateSlice";

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
    schedule_details: [],
  },
};

// 컬럼 가져오기
// export const addScheduleDetail = createAsyncThunk(
//   "schedule/addScheduleDetail",
//   (date: DestrucDateType, { getState }) => {
//     const { columnPlaces, schedule } = getState() as Rootstate;

//     // 목표 위치가 보관함인 경우에는 저장 안함
//     if (columnPlaces.goalCol === "_1" && columnPlaces.curCol === "_1") return;
//     else if (columnPlaces.curCol !== "_1" && columnPlaces.goalCol === "_1") {
//       // schedule_detials에서 해당 장소에 대한 정보 삭제
//       removeScheduleDetail(columnPlaces.curRow);
//       return;
//     }

//     const schedule_order = columnPlaces.goalCol;

//     const content_id = columnPlaces.curRow;

//     const selectedDetail = schedule.schedule.schedule_details?.find(
//       (d) => d.content_id === content_id
//     );

//     const start_time = selectedDetail
//       ? selectedDetail.start_time
//       : new Date(date.year, date.month, date.date, 7).toISOString();
//     const end_time = selectedDetail
//       ? selectedDetail.end_time
//       : new Date(date.year, date.month, date.date, 9).toISOString();
//     const createdAt = new Date().toISOString();

//     const detail: ScheduleDetailType = {
//       schedule_order,
//       content_id,
//       start_time,
//       end_time,
//       createdAt,
//     };
//     return detail;
//   }
// );

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
    // 제목 추가
    addTitle: (state, action: PayloadAction<string>) => {
      state.schedule.schedule_name = action.payload;
    },
    // 날짜 변경
    updateStartTime: (
      state,
      action: PayloadAction<{ contendId: string; date: string; column: number }>
    ) => {
      // map 이용하기
      state.schedule.schedule_details?.map((detail) => {
        if (
          detail.schedule_order === action.payload.column.toString() &&
          detail.content_id === action.payload.contendId
        ) {
          detail.start_time = action.payload.date;
        }
        return detail;
      });
    },
    updateEndTime: (
      state,
      action: PayloadAction<{ contendId: string; date: string; column: number }>
    ) => {
      // map 이용하기
      state.schedule.schedule_details?.map((detail) => {
        if (
          detail.schedule_order === action.payload.column.toString() &&
          detail.content_id === action.payload.contendId
        ) {
          detail.end_time = action.payload.date;
        }
        return detail;
      });
      // const modifiedPlace = state.schedule.schedule_details?.find(
      //   (d) => d.content_id === action.payload.contendId
      // );
      // const restPlaces = state.schedule.schedule_details?.filter(
      //   (d) => d.content_id !== action.payload.contendId
      // );

      // if (modifiedPlace) modifiedPlace.end_time = action.payload.date;

      // if (restPlaces && modifiedPlace) {
      //   state.schedule.schedule_details = [...restPlaces, modifiedPlace];
      // }
    },

    // schedule_detail 삭제
    // removeScheduleDetail: (state, action: PayloadAction<string>) => {
    //   const newDetailArray = state.schedule.schedule_details?.filter(
    //     (detail) => detail.content_id !== action.payload
    //   );

    //   if (newDetailArray) state.schedule.schedule_details = [...newDetailArray];
    // },
    // addDetail: (
    //   state,
    //   action: PayloadAction<{
    //     column: number;
    //     place: PlaceApiType;
    //     date: DateDestructType;
    //   }>
    // ) => {
    //   const date = action.payload.date;

    //   if (state.schedule.schedule_details) {
    //     const legnth = state.schedule.schedule_details.length;
    //     state.schedule.schedule_details = [
    //       ...state.schedule.schedule_details,
    //       {
    //         schedule_order: action.payload.column.toString(),
    //         content_id: action.payload.place.contentid,
    //         start_time: new Date(
    //           date.year,
    //           date.month,
    //           date.date,
    //           7
    //         ).toISOString(),
    //         end_time: new Date(
    //           date.year,
    //           date.month,
    //           date.date,
    //           9
    //         ).toISOString(),
    //         createdAt: new Date().toISOString(),
    //       },
    //     ];
    //   } else {
    //     state.schedule.schedule_details = [
    //       {
    //         schedule_order: action.payload.column.toString(),
    //         content_id: action.payload.place.contentid,
    //         start_time: new Date(
    //           date.year,
    //           date.month,
    //           date.date,
    //           7
    //         ).toISOString(),
    //         end_time: new Date(
    //           date.year,
    //           date.month,
    //           date.date,
    //           9
    //         ).toISOString(),
    //         createdAt: new Date().toISOString(),
    //       },
    //     ];
    //   }
    // },
  },
  extraReducers: (builder) => {
    // builder.addCase(
    //   addScheduleDetail.fulfilled,
    //   (state, action: PayloadAction<ScheduleDetailType | undefined>) => {
    //     if (action.payload) {
    //       const detail = action.payload;
    //       // 디테일 목록에 추가된 것과 동일한 것이 있다면
    //       if (
    //         state.schedule.schedule_details?.findIndex(
    //           (stateDetail) => stateDetail.content_id === detail.content_id
    //         ) !== -1
    //       ) {
    //         // 동일한 것이 없는 것만 추리고
    //         const newScheduleDetails = state.schedule.schedule_details?.filter(
    //           (stateDetail) => stateDetail.content_id !== detail.content_id
    //         );
    //         // 없는 것에 추가함
    //         if (newScheduleDetails)
    //           state.schedule.schedule_details = [...newScheduleDetails, detail];
    //       } else {
    //         // 동일한 것이 없다면 추가
    //         state.schedule.schedule_details.push(detail);
    //       }
    //     }
    //   }
    // );
  },
});

export const {
  addAreaCode,
  addDates,
  // removeScheduleDetail,
  addTitle,
  updateStartTime,
  updateEndTime,
  // addDetail,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
