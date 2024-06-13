import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  CalculateDuration,
  curMonth,
  dateMidFormatter,
  destrucDate,
  monthAgo,
  monthLater,
} from "../../utils/date";
import { DestrucDateType } from "../../pages/schedule/choice/dates/Calendar";

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
  datesArray: DestrucDateType[];
}

const today = dateMidFormatter(new Date());

const initialState: DateState = {
  base: today.toDateString(),
  leftMonth: destrucDate(curMonth(today)),
  rightMonth: destrucDate(monthLater(today)),
  datesArray: [],
};

const dateSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    // 리셋하기
    resetDates: () => initialState,
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

      if (state.start && date) {
        const dates = CalculateDuration(state.start, date);

        state.datesArray = dates;
      }
    },
  },
});

export const { plusMonth, minusMonth, addStart, addEnd, resetDates } =
  dateSlice.actions;

export default dateSlice.reducer;
