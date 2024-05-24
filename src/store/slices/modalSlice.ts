import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    active: false,
  },

  reducers: {
    setActive: (state) => {
      state.active = !state.active;
    },
  },
});

export const { setActive } = modalSlice.actions;

export default modalSlice.reducer;
