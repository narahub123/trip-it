import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  curMonth,
  dateMidFormatter,
  destrucDate,
  monthAgo,
  monthLater,
} from "../../utils/date";

export interface DateDestructType {
  year: number;
  month: number;
  date: number;
}

export interface DateState {
  base: string;
  leftMonth: DateDestructType;
  rightMonth: DateDestructType;
  start?: string;
  end?: string;
}

const today = dateMidFormatter(new Date());

const initialState: DateState = {
  base: today.toDateString(),
  leftMonth: destrucDate(curMonth(today)),
  rightMonth: destrucDate(monthLater(today)),
};

const dateSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    plusMonth: (state) => {
      const nextMonth = monthLater(new Date(state.base));
      return {
        ...state,
        base: nextMonth.toDateString(),
        leftMonth: destrucDate(curMonth(nextMonth)),
        rightMonth: destrucDate(monthLater(nextMonth)),
      };
    },
    minusMonth: (state) => {
      const beforeMonth = monthAgo(new Date(state.base));
      return {
        ...state,
        base: beforeMonth.toDateString(),
        leftMonth: destrucDate(curMonth(beforeMonth)),
        rightMonth: destrucDate(monthLater(beforeMonth)),
      };
    },
    addStart: (state, action: PayloadAction<string>) => {
      const date = action.payload;
      state.start = date;
    },
    addEnd: (state, action: PayloadAction<string>) => {
      const date = action.payload;
      state.end = date;
    },
  },
});

export const { plusMonth, minusMonth, addStart, addEnd } = dateSlice.actions;

export default dateSlice.reducer;
