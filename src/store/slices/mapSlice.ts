import { createSlice } from "@reduxjs/toolkit";

export interface InfoType {
  distance: number;
  duration: number;
}

export interface MapColumnType {
  [key: string]: InfoType[];
}

const initialState = {};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
});

export const {} = mapSlice.actions;

export default mapSlice.reducer;
