import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlaceApiType } from "../../types/place";

export interface PlaceState {
  places: PlaceApiType[];
  status: string;
  error?: string;
}

const initialState: PlaceState = {
  places: [],
  status: "idle",
  error: undefined,
};

interface PlaceProps {
  areacode: string;
  hash: string;
  contentTypeId: string;
}

export const fetchPlaces = createAsyncThunk(
  "placeSlice/fetchPlaces",
  async ({ areacode, hash, contentTypeId }: PlaceProps) => {
    try {
      if (hash === "#link3") {
        contentTypeId = "32";
      } else if (
        hash === "#link2" &&
        contentTypeId !== "12" &&
        contentTypeId !== "14" &&
        contentTypeId !== "39"
      ) {
        contentTypeId = "1";
      }

      const url = `http://localhost:8080/places/${areacode}/${contentTypeId}`;

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPlaces.fulfilled,
        (state, action: PayloadAction<PlaceApiType[]>) => {
          state.status = "succeeded";
          state.places = action.payload;
        }
      )
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = placeSlice.actions;

export default placeSlice.reducer;
