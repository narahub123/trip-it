import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlaceApiType } from "../../types/place";
import { ScheduleType } from "../../types/schedules";
import { Rootstate, store } from "../store";

export interface PlaceState {
  places: PlaceApiType[];
  status: string;
  error?: string;
  contentIds?: string[];
}

const initialState: PlaceState = {
  places: [],
  status: "idle",
  error: undefined,
  contentIds: [],
};

interface PlacesProps {
  hash: string;
  contentTypeId: string;
  pageNo: number;
}

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
      });
  },
});

export const { clearPlaces, addContentId, clearContentId, removeContentId } =
  placeSlice.actions;

export default placeSlice.reducer;
