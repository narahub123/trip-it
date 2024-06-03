import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DestrucDateType } from "../../pages/schedule/choice/dates/Calendar";
import { Rootstate } from "../store";
import { CalculateDuration } from "../../utils/date";

export interface AccommoState {
  columns: {
    index: number;
    contentId: string;
    date: DestrucDateType;
  }[];
}

const initialState: AccommoState = {
  columns: [],
};

// accommoModal 내에 컬럼 개수
export const calcColumns = createAsyncThunk(
  "accommoSlice/calcColumns",
  async (_, { getState, dispatch }) => {
    const { schedule } = getState() as Rootstate;

    const dates =
      schedule.schedule.start_date &&
      schedule.schedule.end_date &&
      CalculateDuration(
        schedule.schedule.start_date,
        schedule.schedule.end_date
      );

    if (!dates) {
      return undefined;
    }

    const filteredDates = dates.slice(0, dates.length - 1);

    const columns = filteredDates.map((date, index) => ({
      date: date,
      contentId: "",
      column: index,
    }));

    dispatch(setColumns(columns));
  }
);

const accommoSlice = createSlice({
  name: "accommo",
  initialState,
  reducers: {
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(calcColumns.fulfilled, (state, action) => {});
  },
});

export const { setColumns } = accommoSlice.actions;

export default accommoSlice.reducer;
