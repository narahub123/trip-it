import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Rootstate } from "../store";
import { addPlaceToColumn } from "./columnPlacesSlice";

export interface InfoType {
  distance: number;
  duration: number;
}

export interface MapColumnType {
  [key: string]: InfoType[];
}

const initialState: MapColumnType = {};

// 모빌리티에서 받아온 정보 저장하기

interface AddInfoProps {
  column: number;
  index: number;
}

// mapColumn 동적 생성하기
export const createMapColumns = createAsyncThunk(
  "mapSlice/createMapColumns",
  async (_, { getState, dispatch }) => {
    try {
      // columnPlaces의 프로퍼티에 맞게 mapColumn 생성
      const { date } = getState() as Rootstate;

      const dates = date.datesArray;

      let newMapColumns: MapColumnType = {};

      // columnPlaces_1 제외함 i를 1부터 시작함
      for (let i = 0; i < dates.length; i++) {
        const mapColumn: InfoType[] = [];

        newMapColumns[`mapColumn${i}`] = mapColumn;
      }

      // 상태 업데이트
      dispatch(updateMapColumn(newMapColumns));
    } catch (error) {
      console.error("Error creating map columns:", error);
    }
  }
);

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    updateMapColumn: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { updateMapColumn } = mapSlice.actions;

export default mapSlice.reducer;
