import { createSlice } from "@reduxjs/toolkit";
import BackModal from "../../pages/schedule/BackModal";

export interface UiState {
  backToggle: boolean;
}

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    BackToggle: false,
  },
  reducers: {
    setBackToggle: (state) => {
      state.BackToggle = !state.BackToggle;
    },
  },
});

export const { setBackToggle } = uiSlice.actions;

export default uiSlice.reducer;
