import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DestrucDateType } from "../../pages/schedule/choice/dates/Calendar";
import { Rootstate } from "../store";
import { CalculateDuration } from "../../utils/date";

export interface AccommoState {
  items: {
    index: number;
    contentId: string;
    date: DestrucDateType;
  }[];
  curColumn?: number;
  selected: boolean;
}

const initialState: AccommoState = {
  items: [],
  selected: false,
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

    const items = filteredDates.map((date, index) => ({
      date: date,
      contentId: "",
      index: index,
    }));

    dispatch(setItems(items));
  }
);

const accommoSlice = createSlice({
  name: "accommo",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setCurColumn: (state, action: PayloadAction<number>) => {
      state.curColumn = action.payload;
    },
    setSelected: (state, action: PayloadAction<boolean>) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(calcColumns.fulfilled, (state, action) => {});
  },
});

export const { setItems, setCurColumn, setSelected } = accommoSlice.actions;

export default accommoSlice.reducer;
