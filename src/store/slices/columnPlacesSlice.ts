import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlaceApiType } from "../../types/place";
import { Rootstate } from "../store";

export interface ColumnPlacesType {
  columnPlaces_1: PlaceApiType[];
  columnPlaces0?: PlaceApiType[];
  columnPlaces1?: PlaceApiType[];
  columnPlaces2?: PlaceApiType[];
  columnPlaces3?: PlaceApiType[];
  columnPlaces4?: PlaceApiType[];
  columnPlaces5?: PlaceApiType[];
  columnPlaces6?: PlaceApiType[];
  columnPlaces7?: PlaceApiType[];
  columnPlaces8?: PlaceApiType[];
  columnPlaces9?: PlaceApiType[];
}

interface columnPlacesState {
  columnPlaces: ColumnPlacesType;
  draggedPlace?: PlaceApiType;
  curRow: string;
  curCol: string;
  goalRow: string;
  goalCol: string;
}

const initialState: columnPlacesState = {
  columnPlaces: {
    columnPlaces_1: [],
    columnPlaces0: [],
    columnPlaces1: [],
    columnPlaces2: [],
    columnPlaces3: [],
    columnPlaces4: [],
    columnPlaces5: [],
    columnPlaces6: [],
    columnPlaces7: [],
    columnPlaces8: [],
    columnPlaces9: [],
  },

  curRow: "_1",
  curCol: "_1",
  goalRow: "_1",
  goalCol: "_1",
};

// selectedPlaces의 정보를 가져와서 첫 컬럼에 넣기
export const fetchSelectedPlaces = createAsyncThunk(
  "columnPlaces/fetchSelectedPlaces",
  async (_, { getState }) => {
    const { place } = getState() as Rootstate;
    const selectedPlaces = place.selectedPlaces;

    return selectedPlaces;
  }
);

const columnPlacesSlice = createSlice({
  name: "columnPlaces",
  initialState,
  reducers: {
    setcurRow: (state, action: PayloadAction<string>) => {
      state.curRow = action.payload;
    },
    setcurCol: (state, action: PayloadAction<string>) => {
      state.curCol = action.payload;
    },
    setGoalRow: (state, action: PayloadAction<string>) => {
      state.goalRow = action.payload;
    },
    setGoalCol: (state, action: PayloadAction<string>) => {
      state.goalCol = action.payload;
    },
    setDraggedPlace: (
      state,
      action: PayloadAction<{ curRow: string; curCol: string }>
    ) => {
      console.log(action.payload.curRow);
      console.log(action.payload.curCol);

      const key =
        `columnPlaces${action.payload.curCol}` as keyof typeof state.columnPlaces;

      if (!(key in state.columnPlaces)) {
        console.error(`Key ${key} does not exist in columnPlaces`);
        return;
      }

      const curcolumnPlaces = state.columnPlaces[key];

      const draggedPlace = curcolumnPlaces?.find(
        (place) => place.contentid === action.payload.curRow
      );

      state.draggedPlace = draggedPlace;
    },

    removeDraggedPlace: (state) => {
      const key =
        `columnPlaces${state.curCol}` as keyof typeof state.columnPlaces;

      const curColumnPlaces = state.columnPlaces[key];
      // draggedPlace를 제외한 배열
      const filteredCurColumn = curColumnPlaces?.filter(
        (place) => place.contentid !== state.curRow
      );

      if (filteredCurColumn) state.columnPlaces[key] = [...filteredCurColumn];
    },

    removePlaceFromColumn: (
      state,
      action: PayloadAction<{ column: string; contentId: string }>
    ) => {
      const key =
        `columnPlaces${action.payload.column}` as keyof typeof state.columnPlaces;
      const columnPlaces = state.columnPlaces[key];
      console.log(key);
      console.log(columnPlaces);

      const filteredColumnPlaces = columnPlaces?.filter(
        (place) => place.contentid !== action.payload.contentId
      );

      if (filteredColumnPlaces)
        state.columnPlaces[key] = [...filteredColumnPlaces];
    },

    addDraggedPlace: (state) => {
      console.log(state.goalRow);

      // 같은 컬럼이면서 이동 장소가 목표 위치랑 같지 않는 경우에 이동 장소를 지움
      if (state.curCol === state.goalCol && state.curRow !== state.goalRow) {
        columnPlacesSlice.caseReducers.removeDraggedPlace(state);
      }
      const key =
        `columnPlaces${state.goalCol}` as keyof typeof state.columnPlaces;

      const goalColumnPlaces = state.columnPlaces[key];
      // draggedPlace를 배열에 추가
      if (state.draggedPlace)
        if (!goalColumnPlaces) {
          // 목표 배열에 요소가 없는 경우
          state.columnPlaces[key] = [state.draggedPlace];
          // 목표 배열에 요소가 있는 경우
        } else {
          if (state.goalRow === "_1") {
            // 목표 위치가 최상단일 경우
            state.columnPlaces[key] = [state.draggedPlace, ...goalColumnPlaces];
          } else if (state.curRow === state.goalRow) {
            console.log("hi");
          } else if (state.goalRow !== "_1") {
            console.log("here");

            // 목표 위치가 최상단이 아닐 경우
            // 목표 위치 찾기:
            const index = goalColumnPlaces?.findIndex(
              (place) => place.contentid === state.goalRow
            );
            //goalRow가 이동하려는 장소의 뒤의 dropIndicator를 의미하기 때문에
            // goalRow에 해당되는 장소가 포함되어야 함
            // 목표 장소가 마지막인 배열
            const beforeColumn = goalColumnPlaces?.slice(0, index + 1);

            // 목표 장소의 위의 배열
            const afterColumn = goalColumnPlaces?.slice(index + 1);

            state.columnPlaces[key] = [
              ...beforeColumn,
              state.draggedPlace,
              ...afterColumn,
            ];
          }
        }
    },

    dragInColumn: (state) => {
      columnPlacesSlice.caseReducers.addDraggedPlace(state);
    },

    dragBtwColumn: (state) => {
      columnPlacesSlice.caseReducers.addDraggedPlace(state);
      columnPlacesSlice.caseReducers.removeDraggedPlace(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchSelectedPlaces.fulfilled,
      (state, action: PayloadAction<PlaceApiType[] | undefined>) => {
        if (action.payload) {
          state.columnPlaces.columnPlaces_1 = [...action.payload];
        } else {
          state.columnPlaces.columnPlaces_1 = [];
        }
      }
    );
  },
});

export const {
  setcurRow,
  setcurCol,
  setGoalRow,
  setGoalCol,
  setDraggedPlace,
  dragInColumn,
  dragBtwColumn,
  removePlaceFromColumn,
} = columnPlacesSlice.actions;

export default columnPlacesSlice.reducer;
