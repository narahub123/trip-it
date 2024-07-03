import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ScheduleReturnType } from "../../types/schedules";
import { convertStringToJson } from "../../utils/convertStringToJson";
import { getCookie } from "../../utils/Cookie";
import { ReportTestType } from "../../types/reports";

const baseURL = process.env.REACT_APP_SERVER_URL;

export interface ReturnState {
  schedules: ScheduleReturnType[];
  status: string;
  error?: string;
  schedule?: ScheduleReturnType;
  reports: ReportTestType[];
}

const initialState: ReturnState = {
  schedules: [],
  status: "idle",
  reports: [],
};

// 일정 목록 받아오기
export const getSchedules = createAsyncThunk<ScheduleReturnType[]>(
  "returnSlice/getSchedules",
  async () => {
    // 일정을 받을 db 주소
    const url = `${baseURL}/mypage/schedules`;

    console.log(url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Access: `${localStorage.getItem("access")}`,
        Refresh: `${getCookie("refresh")}`,
      },
    });

    try {
      const jsonData = await response.json();

      console.log(jsonData);

      return jsonData;
    } catch (error) {
      try {
        const textData = await response.text();

        const jsonData = convertStringToJson(textData);

        return jsonData;
      } catch (error) {
        console.error(error);
      }
    }
  }
);

export interface getScheduleProps {
  scheduleId: number;
}

// 개인 일정 받아오기
export const getSchedule = createAsyncThunk(
  "returnSlice/getSchedule",
  async ({ scheduleId }: getScheduleProps) => {
    // 일정을 받을 db 주소
    const url = `${baseURL}/mypage/schedules/${scheduleId}`;

    console.log(url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Access: `${localStorage.getItem("access")}`,
        Refresh: `${getCookie("refresh")}`,
      },
    });

    try {
      const jsonData = await response.json();

      console.log(jsonData);

      return jsonData;
    } catch (error) {
      try {
        const textData = await response.text();

        const jsonData = convertStringToJson(textData);

        return jsonData;
      } catch (error) {
        console.error(error);
      }
    }
  }
);
const returnSlice = createSlice({
  name: "return",
  initialState,
  reducers: {
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },
    clearReport: (state) => {
      state.reports = [];
    },
    setReports: (state, action) => {
      state.reports = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchedules.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSchedules.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.schedules = action.payload;
      })
      .addCase(getSchedules.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      })
      .addCase(getSchedule.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSchedule.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.schedule = action.payload;
      })
      .addCase(getSchedule.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      });
  },
});

export const { setSchedules, setReports, clearReport } = returnSlice.actions;

export default returnSlice.reducer;
