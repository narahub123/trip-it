import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ColumnPlaceType, PlaceApiType } from "../../types/place";
import { Rootstate } from "../store";
import { fetchPlace } from "./placeSlice";
import { DestrucDateType } from "../../pages/schedule/choice/dates/Calendar";
import { destrucDate } from "../../utils/date";

export interface ColumnPlacesType {
  [key: string]: ColumnPlaceType[];
}

interface columnPlacesState {
  columnPlaces: ColumnPlacesType;
  draggedPlace?: ColumnPlaceType;
  curRow: string;
  curCol: string;
  goalRow: string;
  goalCol: string;
  [key: string]: any;
}

const initialState: columnPlacesState = {
  columnPlaces: {
    columnPlaces_1: [],
  },

  curRow: "_1",
  curCol: "_1",
  goalRow: "_1",
  goalCol: "_1",
};

interface RemoveProps {
  column: string;
  index: number;
}

// 장소를 columnPlaces 배열에서 제거
export const removePlaceFromColumn = createAsyncThunk(
  "columnPlacesSlice/removePlaceFromColumn",
  async ({ column, index }: RemoveProps, { getState, dispatch }) => {
    const { columnPlaces } = getState() as Rootstate;
    const key =
      `columnPlaces${column}` as keyof typeof columnPlaces.columnPlaces;

    const colPlaces = columnPlaces.columnPlaces[key];

    const contentId = colPlaces[index].contentid;

    const beforeColumn = colPlaces.slice(0, index);
    const afterColumn = colPlaces.slice(index + 1);

    const newColumnPlaces = {
      ...columnPlaces,
      columnPlaces: {
        ...columnPlaces.columnPlaces,
        [key]: [...beforeColumn, ...afterColumn],
      },
    };

    dispatch(setColumnPlaces(newColumnPlaces));
    // dispatch(combineColumnPlaces(contentId));

    return newColumnPlaces;
  }
);

// columnPlaces 배열을 동적으로 생성하기
export const createColumnPlaces = createAsyncThunk(
  "columnPlacesSlice/createColumnPlaces",
  async (_, { getState, dispatch }) => {
    try {
      const { date } = getState() as Rootstate;

      const dates = date.datesArray;

      let newColumnPlaces: ColumnPlacesType = {
        columnPlaces_1: [],
      };

      for (let i = 0; i < dates.length; i++) {
        const columnPlaces: ColumnPlaceType[] = [];

        newColumnPlaces[`columnPlaces${i}`] = columnPlaces;
      }

      dispatch(updateColumnPlaces(newColumnPlaces));
    } catch (error) {
      console.log(`Error creating columnPlaces`, error);
    }
  }
);

const columnPlacesSlice = createSlice({
  name: "columnPlaces",
  initialState,
  reducers: {
    // columnPlaces 초기화하기
    clearColumnPlaces: (state) => initialState,
    // columnPlaces 동적 생성
    updateColumnPlaces: (state, action) => {
      state.columnPlaces = action.payload;
    },
    // columnPlaces_1 초기화하기
    clearColumnPlaces_1: (state) => {
      const columnPlaces_1 = state.columnPlaces[`columnPlaces_1`];
      // columnPlaces_1에서 숙소만 고름
      const accommos = columnPlaces_1.filter(
        (place) => place.contenttypeid === "32"
      );

      // columnPlaces에서 columnPlaces_1에 포함된 장소 삭제

      state.columnPlaces[`columnPlaces_1`] = [];
    },

    // 특정 장소를 columnPlaces 객체에서 일괄 삭제하기
    clearPlaceFromAllColumnPlaces: (state, action) => {
      const contentId = action.payload;

      const keys = Object.keys(state.columnPlaces);

      for (const key of keys) {
        // columnPlaces_1은 제외하는 경우
        // if (key === "columnPlaces_1") continue;

        const colPlaces = state.columnPlaces[key];

        const filteredColumnPlaces = colPlaces.filter(
          (place) => place.contentid !== contentId
        );

        state.columnPlaces[key] = filteredColumnPlaces;
      }
    },

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

    setColumnPlaces: (state, action) => {
      state.columnPlaces = action.payload;
    },

    updateStartTime: (
      state,
      action: PayloadAction<{
        column: number;
        row: number;
        hour: string;
        minute: string;
      }>
    ) => {
      const key =
        `columnPlaces${action.payload.column}` as keyof typeof state.columnPlaces;

      const curcolumnPlaces = state.columnPlaces[key];

      const place = curcolumnPlaces[action.payload.row];

      const date = destrucDate(new Date(place.start_time));

      const start = new Date(
        date.year,
        date.month,
        date.date,
        Number(action.payload.hour),
        Number(action.payload.minute)
      ).toISOString();

      state.columnPlaces[key][action.payload.row] = {
        ...place,
        start_time: start,
      };
    },

    updateEndTime: (
      state,
      action: PayloadAction<{
        column: number;
        row: number;
        hour: string;
        minute: string;
      }>
    ) => {
      const key =
        `columnPlaces${action.payload.column}` as keyof typeof state.columnPlaces;

      const curcolumnPlaces = state.columnPlaces[key];

      const place = curcolumnPlaces[action.payload.row];

      const date = destrucDate(new Date(place.end_time));

      const end = new Date(
        date.year,
        date.month,
        date.date,
        Number(action.payload.hour),
        Number(action.payload.minute)
      ).toISOString();

      state.columnPlaces[key][action.payload.row] = {
        ...place,
        end_time: end,
      };
    },

    clearAccommoFromColumnPlaces_1: (state) => {
      const columnPlaces = state.columnPlaces[`columnPlaces_1`];

      const filterColumpPlaces = columnPlaces.filter(
        (place) => place.contenttypeid !== "32"
      );

      state.columnPlaces[`columnPlaces_1`] = [...filterColumpPlaces];
    },

    // 숙소 페어를 columnPlaces에서 삭제
    removeAccommosFromColumnPlaces: (
      state,
      action: PayloadAction<{ accommoColumn: number }>
    ) => {
      // 삭제하려는 숙소의 accommoColumn을 검색해서 해당 컬럼과 다음 컬럼에서
      // 해당 번호를 갖은 숙소를 삭제
      // 해당 컬럼 키
      const curKey =
        `columnPlaces${action.payload.accommoColumn}` as keyof typeof state.columnPlaces;
      // 해당 컬럼
      const curColumnPlaces = state.columnPlaces[curKey];
      // 해당 숙소를 제외한 배열
      const filterCurCol = curColumnPlaces.filter(
        (place) => place.accommoColumn !== action.payload.accommoColumn
      );

      // 해당 컬럼에 새 배열 할당
      state.columnPlaces[curKey] = filterCurCol;

      // 다음 컬럼 키
      const nextKey = `columnPlaces${
        action.payload.accommoColumn + 1
      }` as keyof typeof state.columnPlaces;
      // 다음 컬럼
      const nextColumPlaces = state.columnPlaces[nextKey];
      // 해당 숙소를 제외한 배열
      const filterNextCol = nextColumPlaces.filter(
        (place) => place.accommoColumn !== action.payload.accommoColumn
      );
      // 해당 컬럼에 새 배열 할당
      state.columnPlaces[nextKey] = filterNextCol;
    },

    // 숙소 페어를 columnPlaces에서 삭제하기
    // removeAccommosFromColumnPlaces: (
    //   state,
    //   action: PayloadAction<{ column: number; contentId: string }>
    // ) => {
    //   // 해당 컬럼
    //   const key1 =
    //     `columnPlaces${action.payload.column}` as keyof typeof state.columnPlaces;
    //   const columnPlaces1 = state.columnPlaces[key1];

    //   // 다음 컬럼
    //   const key2 = `columnPlaces${
    //     action.payload.column + 1
    //   }` as keyof typeof state.columnPlaces;
    //   const columnPlaces2 = state.columnPlaces[key2];

    //   // 해당 컬럼에서는 가장 나중 숙소를 삭제
    //   // 해당 컬럼에 있는 숙소 인덱스 찾기
    //   const accommos1 = [];

    //   // contentId를 가진 장소를 인덱스 배열에 추가
    //   for (let i = 0; i < columnPlaces1.length; i++) {
    //     const columnPlace = columnPlaces1[i];
    //     if (columnPlace.contentid === action.payload.contentId) {
    //       accommos1.push(i);
    //     }
    //   }

    //   console.log(accommos1);

    //   // 인덱스 배열의 길이가 1인 경우
    //   if (accommos1.length === 1) {
    //     columnPlaces1.splice(accommos1[0], 1);
    //     state.columnPlaces[key1] = [...columnPlaces1];
    //   }
    //   // 인덱스 배열의 길이가 2인 경우
    //   else {
    //     console.log(action.payload.column);

    //     let filteredPlaces1;
    //     if (action.payload.column !== 0) {
    //       columnPlaces1.splice(accommos1[1], 1);
    //     } else {
    //       columnPlaces1.splice(accommos1[1], 1);
    //       columnPlaces1.splice(accommos1[0], 1);
    //     }

    //     state.columnPlaces[key1] = columnPlaces1;
    //     console.log(filteredPlaces1);
    //   }

    //   // 다음 컬럼에서는 가장 먼저 숙소를 삭제
    //   // 가장 첫 숙소를 제거하는 것이기 때문에 findIndex 사용해도 됨
    //   const index = columnPlaces2.findIndex(
    //     (place) => place.contentid === action.payload.contentId
    //   );

    //   columnPlaces2.splice(index, 1);

    //   state.columnPlaces[key2] = columnPlaces2;
    // },

    removePlaceFromColumnPlaces_1: (state, action: PayloadAction<number>) => {
      const columnPlaces_1 = state.columnPlaces[`columnPlaces_1`];

      columnPlaces_1.splice(action.payload, 1);

      state.columnPlaces[`columnPlaces_1`] = columnPlaces_1;
    },

    removePlaceFromColumnPlaces_1ByContentId: (
      state,
      action: PayloadAction<string>
    ) => {
      const columnPlaces_1 = state.columnPlaces[`columnPlaces_1`];

      const filteredColumnPlaces_1 = columnPlaces_1.filter(
        (place) => place.contentid !== action.payload
      );

      state.columnPlaces[`columnPlaces_1`] = filteredColumnPlaces_1;
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

    addDraggedPlace: (state, action?: PayloadAction<DestrucDateType>) => {
      // 같은 컬럼이면서 이동 장소가 목표 위치랑 같지 않는 경우에 이동 장소를 지움
      if (state.curCol === state.goalCol && state.curRow !== state.goalRow) {
        columnPlacesSlice.caseReducers.removeDraggedPlace(state);
      }
      const key =
        `columnPlaces${state.goalCol}` as keyof typeof state.columnPlaces;

      const date = action?.payload || destrucDate(new Date());
      const start = new Date(date.year, date.month, date.date, 7).toISOString();
      const end = new Date(date.year, date.month, date.date, 9).toISOString();

      // 이동할 컬럼 배열
      const goalColumnPlaces = state.columnPlaces[key];
      // draggedPlace를 배열에 추가
      if (state.draggedPlace)
        if (!goalColumnPlaces) {
          // 목표 배열에 요소가 없는 경우
          state.columnPlaces[key] = [
            { ...state.draggedPlace, start_time: start, end_time: end },
          ];
          // 목표 배열에 요소가 있는 경우
        } else {
          if (state.goalRow === "_1") {
            // 목표 위치가 최상단일 경우
            state.columnPlaces[key] = [
              { ...state.draggedPlace, start_time: start, end_time: end },
              ...goalColumnPlaces,
            ];
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
              { ...state.draggedPlace, start_time: start, end_time: end },
              ...afterColumn,
            ];
          }
        }
    },

    dragInColumn: (state) => {
      columnPlacesSlice.caseReducers.addDraggedPlace(state);
    },

    dragBtwColumn: (
      state,
      action: PayloadAction<DestrucDateType | undefined>
    ) => {
      const date = action.payload;
      if (date) {
        columnPlacesSlice.caseReducers.addDraggedPlace(state, {
          payload: date,
          type: "dragBtwColumn",
        });
      } else {
        columnPlacesSlice.caseReducers.addDraggedPlace(state);
      }
      columnPlacesSlice.caseReducers.removeDraggedPlace(state);
    },

    // columnPlaces에 장소 추가할 때 사용
    addPlaceToColumn: (
      state,
      action: PayloadAction<{
        column: string;
        place: PlaceApiType;
        order: number;
        date?: DestrucDateType;
        accommoColumn: number;
      }>
    ) => {
      const key =
        `columnPlaces${action.payload.column}` as keyof typeof state.columnPlaces;

      const columnPlaces = state.columnPlaces[key];

      const date = action.payload.date || destrucDate(new Date());

      const start = new Date(
        date?.year,
        date?.month,
        date?.date,
        7
      ).toISOString();
      const end = new Date(
        date?.year,
        date?.month,
        date?.date,
        9
      ).toISOString();

      const place = {
        ...action.payload.place,
        start_time: start,
        end_time: end,
        accommoColumn:
          action.payload.place.contenttypeid === "32"
            ? action.payload.accommoColumn
            : -1,
      };

      if (action.payload.order === 0) {
        state.columnPlaces[key] = [place, ...columnPlaces];
      }

      if (action.payload.order === -1) {
        state.columnPlaces[key] = [...columnPlaces, place];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlace.fulfilled, (state, action) => {
        if (!action.payload.addPlaceToColumnPlaces_1) return;
        // 숙소가 아닌 경우
        // 장소를 columnPlaces배열에 추가할 때 start_time, end_time을 추가해서
        // 타입을 PlaceApiType에서 ColumnPlaceType으로 변경

        const date = destrucDate(new Date());

        const start = new Date(
          date.year,
          date.month,
          date.date,
          7
        ).toISOString();

        const end = new Date(date.year, date.month, date.date, 9).toISOString();

        const place = {
          ...action.payload.place,
          start_time: start,
          end_time: end,
          accommoColumn: -1,
        };

        const contentTypeId = place.contenttypeid;

        if (contentTypeId !== "32")
          state.columnPlaces.columnPlaces_1.push(place);
      })
      .addCase(removePlaceFromColumn.fulfilled, (state, action) => {
        state.columnPlaces = action.payload.columnPlaces;
      });
  },
});

export const {
  clearColumnPlaces_1,
  clearAccommoFromColumnPlaces_1,
  clearPlaceFromAllColumnPlaces,
  setcurRow,
  setcurCol,
  setGoalRow,
  setGoalCol,
  setDraggedPlace,
  dragInColumn,
  dragBtwColumn,
  removePlaceFromColumnPlaces_1,
  removePlaceFromColumnPlaces_1ByContentId,
  addPlaceToColumn,
  setColumnPlaces,
  updateStartTime,
  updateEndTime,
  clearColumnPlaces,
  removeAccommosFromColumnPlaces,
  updateColumnPlaces,
} = columnPlacesSlice.actions;

export default columnPlacesSlice.reducer;
