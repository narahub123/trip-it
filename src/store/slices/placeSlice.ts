import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlaceApiType } from "../../types/place";
import { ScheduleType } from "../../types/schedules";
import { Rootstate, store } from "../store";

export interface PlaceState {
  places: PlaceApiType[];
  status: string;
  error?: string;
  contentIds?: string[];
  selectedPlaces?: PlaceApiType[];
  place?: PlaceApiType;
  modal?: boolean;
  isEnd: boolean;
}

const initialState: PlaceState = {
  places: [],
  status: "idle",
  error: undefined,
  contentIds: [],
  modal: false,
  isEnd: false,
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
  info: boolean;
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
      console.log(url);

      const response = await fetch(url);
      const jsonData = await response.json();

      return jsonData;
    } catch (error) {
      console.log(error);
    }
  }
);

// 컨텐츠아이디로 장소 불러오기
export const fetchPlace = createAsyncThunk<
  {
    places: PlaceApiType[];
    info: boolean;
  },
  PlaceProps
>("placeSlice/fetchPlace", async ({ contentId, info = false }: PlaceProps) => {
  try {
    const url = `http://localhost:8080/places/${contentId}`;

    const response = await fetch(url);
    const jsonData = await response.json();

    return { places: jsonData, info };
  } catch (error) {
    console.log(error);
    return { places: [], info: false };
  }
});

// 키워드로 장소들 불러오기
export const fetchSearchedPlaces = createAsyncThunk(
  "placeSlice/fetchSearchedPlaces",
  async (
    { keyword, hash, contentTypeId, pageNo = 1 }: PlaceSearchProps,
    { getState }
  ) => {
    //다른 slice의 값 가져오기
    const { schedule } = getState() as Rootstate;

    console.log(keyword);

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
      console.log(response);

      const jsonData = await response.json();
      console.log("결과", jsonData);

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
    clearContentId: (state) => {
      state.contentIds = [];
    },
    clearSelectedPlaces: (state) => {
      state.selectedPlaces = [];
    },
    addContentId: (state, action: PayloadAction<string>) => {
      if (state.contentIds)
        state.contentIds = [...state.contentIds, action.payload];
      else state.contentIds = [action.payload];
    },
    removeContentId: (state, action: PayloadAction<string>) => {
      if (state.contentIds) {
        state.contentIds = state.contentIds.filter(
          (contentId) => contentId !== action.payload
        );
      }
    },
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPlaces.fulfilled,
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
          action: PayloadAction<{ places: PlaceApiType[]; info: boolean }>
        ) => {
          state.status = "succeeded";
          console.log(action.payload.info);
          if (!action.payload.info) {
            if (state.selectedPlaces) {
              state.selectedPlaces = [
                ...state.selectedPlaces,
                ...action.payload.places,
              ];
            } else {
              state.selectedPlaces = [...action.payload.places];
            }
          } else {
            state.place = action.payload.places[0];
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
      });
  },
});

export const {
  clearPlaces,
  addContentId,
  clearContentId,
  removeContentId,
  clearSelectedPlaces,
  removeSelectedPlace,
  modalToggle,
} = placeSlice.actions;

export default placeSlice.reducer;
