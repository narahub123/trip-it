import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlaceApiType } from "../../types/place";
import { Rootstate } from "../store";
import { fetchPlace } from "./placeSlice";

export interface ColumnPlacesType {
  columnPlaces_1: PlaceApiType[];
  columnPlaces0: PlaceApiType[];
  columnPlaces1: PlaceApiType[];
  columnPlaces2: PlaceApiType[];
  columnPlaces3: PlaceApiType[];
  columnPlaces4: PlaceApiType[];
  columnPlaces5: PlaceApiType[];
  columnPlaces6: PlaceApiType[];
  columnPlaces7: PlaceApiType[];
  columnPlaces8: PlaceApiType[];
  columnPlaces9: PlaceApiType[];
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

    removeAccommoFromColumn: (
      state,
      action: PayloadAction<{ column: string; contentId: string }>
    ) => {
      const key =
        `columnPlaces${action.payload.column}` as keyof typeof state.columnPlaces;
      const columnPlaces = state.columnPlaces[key];

      const filterColumpPlaces = columnPlaces.filter(
        (place) => place.contentid !== action.payload.contentId
      );

      state.columnPlaces[key] = [...filterColumpPlaces];
    },

    removePlaceFromColumnPlaces_1: (state, action: PayloadAction<string>) => {
      state.columnPlaces.columnPlaces_1 =
        state.columnPlaces.columnPlaces_1.filter(
          (place) => place.contentid !== action.payload
        );
    },

    removePlaceFromColumn: (
      state,
      action: PayloadAction<{ column: string; index: number }>
    ) => {
      const key =
        `columnPlaces${action.payload.column}` as keyof typeof state.columnPlaces;
      const columnPlaces = state.columnPlaces[key];

      const beforeColumn = columnPlaces.slice(0, action.payload.index);
      const afterColumn = columnPlaces.slice(action.payload.index + 1);

      state.columnPlaces[key] = [...beforeColumn, ...afterColumn];
    },

    // 드래그한 장소를 기존 장소 배열에서 삭제
    removeDraggedPlace: (state) => {
      const key =
        `columnPlaces${state.curCol}` as keyof typeof state.columnPlaces;

      const curColumnPlaces = state.columnPlaces[key];

      // 선택한 장소를 제외함
      curColumnPlaces.splice(Number(state.curRow), 1);

      if (curColumnPlaces.length !== 0)
        state.columnPlaces[key] = [...curColumnPlaces];
      else state.columnPlaces[key] = [];
    },

    addDraggedPlace: (state) => {
      // 같은 컬럼이면서 이동 장소가 목표 위치랑 같지 않는 경우에 이동 장소를 지움
      if (state.curCol === state.goalCol && state.curRow !== state.goalRow) {
        columnPlacesSlice.caseReducers.removeDraggedPlace(state);
      }
      const key =
        `columnPlaces${state.goalCol}` as keyof typeof state.columnPlaces;

      console.log(state.draggedPlace);

      // 이동할 컬럼 배열
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
          } else if (
            state.curRow === state.goalRow &&
            state.curCol === state.goalCol
          ) {
            // 같은 컬럼에 같은 위치에 있는 경우
            // 않음
          } else if (state.goalRow !== "_1") {
            // 목표 위치가 최상단이 아닐 경우
            //goalRow가 이동하려는 장소의 뒤의 dropIndicator를 의미하기 때문에
            // goalRow에 해당되는 장소가 포함되어야 함
            // 목표 장소가 마지막인 배열
            const beforeColumn = goalColumnPlaces?.slice(
              0,
              Number(state.goalRow) + 1
            );

            // 목표 장소의 위의 배열
            const afterColumn = goalColumnPlaces?.slice(
              Number(state.goalRow) + 1
            );

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

    addPlaceToColumn: (
      state,
      action: PayloadAction<{
        column: number;
        place: PlaceApiType;
        order: number;
      }>
    ) => {
      const key =
        `columnPlaces${action.payload.column}` as keyof typeof state.columnPlaces;

      const columnPlaces = state.columnPlaces[key];

      const length = columnPlaces.length;

      if (action.payload.order === -1) {
        columnPlaces[length] = action.payload.place;
      }

      columnPlaces[action.payload.order] = action.payload.place;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlace.fulfilled, (state, action) => {
      const place = action.payload.place;
      const contentTypeId = place.contenttypeid;

      if (contentTypeId !== "32") state.columnPlaces.columnPlaces_1.push(place);
    });
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
  removeAccommoFromColumn,
  removePlaceFromColumnPlaces_1,
  addPlaceToColumn,
} = columnPlacesSlice.actions;

export default columnPlacesSlice.reducer;
