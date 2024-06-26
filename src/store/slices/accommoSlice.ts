import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DestrucDateType } from "../../pages/schedule/choice/dates/Calendar";
import { Rootstate } from "../store";
import { CalculateDuration } from "../../utils/date";

export interface AccommoState {
  items: {
    index: number;
    contentId: string;
    date: DestrucDateType;
    inserted: boolean; // 이미지 삽입 여부
  }[];
  curItem?: number;
  selected: boolean;
}

const initialState: AccommoState = {
  items: [],
  selected: false,
};

// accommoModal 내에 컬럼 개수
export const calcItems = createAsyncThunk(
  "accommoSlice/calcItems",
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
      inserted: false,
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
    setCurItem: (state, action: PayloadAction<number>) => {
      state.curItem = action.payload;
    },
    setSelected: (state, action: PayloadAction<boolean>) => {
      state.selected = action.payload;
    },
    clearInserted: (state) => {
      const items = state.items;
      const newItems = items.map((item) => ({
        ...item,
        inserted: false,
      }));

      accommoSlice.caseReducers.setItems(state, {
        payload: newItems,
        type: "setItems",
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(calcItems.fulfilled, (state, action) => {});
  },
});

export const { setItems, setCurItem, setSelected, clearInserted } =
  accommoSlice.actions;

export default accommoSlice.reducer;
