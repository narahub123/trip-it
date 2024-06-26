import { createSlice } from "@reduxjs/toolkit";

const returnSlice = createSlice({
  name: "return",
  initialState: {
    schedules: [],
  },
  reducers: {
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },
  },
});

export const { setSchedules } = returnSlice.actions;

export default returnSlice.reducer;
