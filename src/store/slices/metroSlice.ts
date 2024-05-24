import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MetroType } from "../../types/schedules";
import { metros } from "../../data/metros";

export interface MetroState {
  metros: MetroType[];
  selectedMetro?: MetroType;
}

const initialState: MetroState = { metros };

const metroSlice = createSlice({
  name: "metro",
  initialState,
  reducers: {
    getMetro: (state, action: PayloadAction<string>) => {
      const foundMetro = state.metros.find(
        (metro) => metro.areaCode === action.payload
      );
      if (foundMetro) {
        state.selectedMetro = foundMetro; // 선택된 메트로를 상태에 저장
      }
    },
  },
});

export const { getMetro } = metroSlice.actions;

export default metroSlice.reducer;
