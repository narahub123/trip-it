import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MetroType } from "../../types/schedules";
import { metros } from "../../data/metros";
import * as Hangul from "hangul-js";

export interface MetroState {
  metros: MetroType[];
  selectedMetro?: MetroType;
  filteredMetros?: MetroType[];
}

const initialState: MetroState = { metros: metros };

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
    filteredMetros: (state, action: PayloadAction<string>) => {
      const filteredMetros = state.metros.filter(
        (metro) => Hangul.search(metro.name, action.payload) === 0
      );
      if (filteredMetros) {
        state.filteredMetros = filteredMetros;
      }
    },
  },
});

export const { getMetro, filteredMetros } = metroSlice.actions;

export default metroSlice.reducer;
