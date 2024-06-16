import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    // MapColum 초기화
    clearMapColumn: () => initialState,
    updateMapColumn: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 모빌리티에서 받아 온 정보를 추가하기
    setInfoToMapColumn: (
      state,
      action: PayloadAction<{ column: number; info: InfoType; index: number }>
    ) => {
      const { column, info, index } = action.payload;
      state[`mapColumn${column - 1}`][index] = info;
    },
  },
  extraReducers: (builder) => {},
});

export const { updateMapColumn, setInfoToMapColumn, clearMapColumn } =
  mapSlice.actions;

export default mapSlice.reducer;
