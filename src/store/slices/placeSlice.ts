import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlaceApiType } from "../../types/place";
import { Rootstate } from "../store";
import { convertStringToJson } from "../../utils/convertStringToJson";
import { combineColumnPlaces } from "./columnPlacesSlice";

export interface ContentIdsType {
  contentId: string;
  column?: number;
}

export interface PlaceState {
  places: PlaceApiType[];
  status: string;
  error?: string;
  selectedPlaces: PlaceApiType[];
  place?: PlaceApiType;
  modal?: boolean;
  accomoModal?: boolean;
  isEnd: boolean;
  pageNo: number;
  columns: Array<{ contentId: string; column: number; date: string }>;
}

const initialState: PlaceState = {
  places: [],
  status: "idle",
  error: undefined,
  selectedPlaces: [],
  modal: false,
  accomoModal: false,
  isEnd: false,
  pageNo: 1,
  columns: [],
};

interface PlacesProps {
  hash: string;
  contentTypeId: string;
  pageNo: number;
}

interface PlaceSearchProps extends PlacesProps {
  keyword: string;
}

interface PlaceProps {
  contentId: string;
  addToSelectedPlaces?: boolean;
}

// 지역 코드로 장소들 불러오기
export const fetchPlaces = createAsyncThunk(
  "placeSlice/fetchPlaces",
  async ({ hash, contentTypeId, pageNo = 1 }: PlacesProps, { getState }) => {
    //다른 slice의 값 가져오기
    const { schedule } = getState() as Rootstate;

    const areacode = schedule.schedule.metro_id || "1";

    try {
      if (hash === "#step3") {
        contentTypeId = "32";
      } else if (
        hash === "#step2" &&
        contentTypeId !== "12" &&
        contentTypeId !== "14" &&
        contentTypeId !== "39"
      ) {
        contentTypeId = "1";
      }

      const url = `http://localhost:8080/places/${areacode}/${contentTypeId}/${pageNo.toString()}`;
      // const url = `http://172.16.1.147:8080/home/test/${areacode}/${pageNo}`;
      console.log(url);

      const response = await fetch(url);

      // console.log(response);

      // url를 변경하는 경우 try문은 지워야 함
      try {
        const jsonData = await response.json();

        return jsonData;
      } catch (error) {
        try {
          const textData = await response.text();
          console.log(textData);

          const jsonData: PlaceApiType[] | [] = convertStringToJson(textData);

          console.log(jsonData);

          return jsonData;
        } catch (error) {}
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// 컨텐츠아이디로 장소 불러오기
export const fetchPlace = createAsyncThunk<
  {
    place: PlaceApiType;
    addToSelectedPlaces: boolean;
  },
  PlaceProps
>(
  "placeSlice/fetchPlace",
  async ({ contentId, addToSelectedPlaces = false }: PlaceProps) => {
    try {
      const url = `http://localhost:8080/places/${contentId}`;

      const response = await fetch(url);
      const jsonData = await response.json();

      const place = jsonData[0];

      return { place: place, addToSelectedPlaces };
    } catch (error) {
      console.log(error);
      return { place: undefined, addToSelectedPlaces: false };
    }
  }
);

// 키워드로 장소들 불러오기
export const fetchSearchedPlaces = createAsyncThunk(
  "placeSlice/fetchSearchedPlaces",
  async (
    { keyword, hash, contentTypeId, pageNo = 1 }: PlaceSearchProps,
    { getState }
  ) => {
    //다른 slice의 값 가져오기
    const { schedule } = getState() as Rootstate;

    // console.log(keyword);

    const areacode = schedule.schedule.metro_id || "1";

    try {
      if (hash === "#step3") {
        contentTypeId = "32";
      } else if (
        hash === "#step2" &&
        contentTypeId !== "12" &&
        contentTypeId !== "14" &&
        contentTypeId !== "39"
      ) {
        contentTypeId = "1";
      }

      const url = `http://localhost:8080/places/search/${areacode}/${contentTypeId}/${keyword}/${pageNo.toString()}`;
      console.log(url);

      const response = await fetch(url);
      // console.log(response);

      const jsonData = await response.json();
      // console.log("결과", jsonData);

      return jsonData;
    } catch (error) {
      console.log(error);
    }
  }
);

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    clearPlaces: (state) => {
      state.places = [];
    },

    clearSelectedPlaces: (state) => {
      state.selectedPlaces = [];
    },
    clearPageNo: (state) => {
      state.pageNo = 1;
    },
    addPageNo: (state) => {
      state.pageNo += 1;
    },

    addSelectedPlace: (state, action: PayloadAction<PlaceApiType>) => {
      // 장소의 중복 여부 확인
      const place = state.selectedPlaces.findIndex(
        (place) => place.contentid === action.payload.contentid
      );

      if (place === -1) state.selectedPlaces?.push(action.payload);
    },

    // selectedPlaces에서 제거
    removeSelectedPlace: (state, action: PayloadAction<string>) => {
      if (state.selectedPlaces) {
        state.selectedPlaces = state.selectedPlaces.filter(
          (selectedPlace) => selectedPlace.contentid !== action.payload
        );
      }
    },
    modalToggle: (state) => {
      state.modal = !state.modal;
    },
    accommoToggle: (state) => {
      state.accomoModal = !state.accomoModal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPlaces.fulfilled,
        (state, action: PayloadAction<PlaceApiType[] | undefined>) => {
          state.status = "succeeded";

          console.log("결과", action.payload);

          if (action.payload === undefined) action.payload = [];
          if (action.payload === null) {
            state.status = "connection-error";
            action.payload = [];
          }

          if (action.payload.length < 8) {
            state.isEnd = true;
          } else {
            state.isEnd = false;
          }

          if (state.places == null || state.places.length === 0) {
            state.places = action.payload;
          } else {
            state.places = [...state.places, ...action.payload];
          }
        }
      )
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPlace.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPlace.fulfilled,
        (
          state,
          action: PayloadAction<{
            place: PlaceApiType;
            addToSelectedPlaces: boolean;
          }>
        ) => {
          state.status = "succeeded";

          state.place = action.payload.place;

          if (action.payload.addToSelectedPlaces) {
            state.selectedPlaces.push(action.payload.place);
          }
        }
      )
      .addCase(fetchPlace.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSearchedPlaces.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSearchedPlaces.fulfilled,
        (state, action: PayloadAction<PlaceApiType[]>) => {
          state.status = "succeeded";

          if (action.payload.length < 8) {
            state.isEnd = true;
          } else {
            state.isEnd = false;
          }

          if (state.places == null || state.places.length === 0) {
            state.places = action.payload;
          } else {
            state.places = [...state.places, ...action.payload];
          }
        }
      )
      .addCase(fetchSearchedPlaces.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.places = [];
      })
      // 삭제된 장소가 columnPlaces 배열들에 존재하는지 여부를 확인하고
      // 존재하지 않는 경우 selectedPlaces에서 삭제함
      .addCase(
        combineColumnPlaces.fulfilled,
        (state, action: PayloadAction<{ contentId: string }>) => {
          console.log(action.payload.contentId);

          if (
            action.payload.contentId !== "" ||
            action.payload.contentId.length !== 0
          ) {
            const newSelectedPlaces = state.selectedPlaces.filter(
              (place) => place.contentid !== action.payload.contentId
            );

            state.selectedPlaces = [...newSelectedPlaces];

            return;
          }

          return;
        }
      );
  },
});

export const {
  clearPlaces,
  clearSelectedPlaces,
  addSelectedPlace,
  removeSelectedPlace,
  modalToggle,
  accommoToggle,
  addPageNo,
  clearPageNo,
} = placeSlice.actions;

export default placeSlice.reducer;
