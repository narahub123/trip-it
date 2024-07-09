import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlaceApiType } from "../../types/place";
import { Rootstate } from "../store";
import { convertStringToJson } from "../../utils/convertStringToJson";
import axios from "axios";
// import { combineColumnPlaces } from "./columnPlacesSlice";

export interface ContentIdsType {
  contentId: string;
  column?: number;
}

export interface PlaceState {
  places: PlaceApiType[];
  status: string;
  error?: string;
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
  addPlaceToColumnPlaces_1?: boolean; // columnPlaces_1 추가 여부
}

const baseURL = process.env.REACT_APP_SERVER_URL;

// 지역 코드로 장소들 불러오기
export const fetchPlaces = createAsyncThunk(
  "placeSlice/fetchPlaces",
  async ({ hash, contentTypeId, pageNo = 1 }: PlacesProps, { getState }) => {
    //다른 slice의 값 가져오기
    const { schedule } = getState() as Rootstate;

    const metroId = schedule.schedule.metro_id || "1";

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

      // const url = `${baseURL}/places/${areacode}/${contentTypeId}/${pageNo.toString()}`;
      const url = `${baseURL}/home/apiList/${metroId}/${pageNo}/${contentTypeId}`;

      console.log(url);

      // const response = await fetch(url);
      const res = await axios.get(url);

      const response = res.data;
      // console.log(response);

      // url를 변경하는 경우 try문은 지워야 함
      try {
        const jsonData = await response.json();

        console.log(jsonData);

        return jsonData;
      } catch (error) {
        console.log("여기");

        try {
          const jsonData: PlaceApiType[] | [] = convertStringToJson(response);

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
    addPlaceToColumnPlaces_1: boolean;
  },
  PlaceProps
>(
  "placeSlice/fetchPlace",
  async ({ contentId, addPlaceToColumnPlaces_1 = true }: PlaceProps) => {
    try {
      // const url = `${baseURL}/places/${contentId}`;
      const url = `${baseURL}/home/apiDetail/${contentId}`;

      // nodejs
      // const response = await fetch(url);

      // const jsonData = await response.json();

      // const place = jsonData[0];

      // spring
      const res = await axios.get(url);

      const response = res.data;

      console.log(response);
      const place = response;

      // 숙소가 아니면 추가 : 장소 추가 버튼을 눌렀을 때를 의미
      const addToColumnPlaces_1: boolean = addPlaceToColumnPlaces_1
        ? place.contenttypeid !== "32"
        : addPlaceToColumnPlaces_1;

      // 장소 추가 버튼이 아닌 장소 모달창이 열린 경우에는 추가 버튼을 눌러야 추가해야 함

      return { place, addPlaceToColumnPlaces_1: addToColumnPlaces_1 };
    } catch (error) {
      console.log(error);
      return { place: undefined, addPlaceToColumnPlaces_1: false };
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

    const metroId = schedule.schedule.metro_id || "1";

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

      // nodejs
      // const url = `${baseURL}/places/search/${areacode}/${contentTypeId}/${keyword}/${pageNo.toString()}`;
      // spring
      const url = `${baseURL}/home//apiSearch/${metroId}/${pageNo}/${contentTypeId}/${keyword}`;

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

    clearPageNo: (state) => {
      state.pageNo = 1;
    },
    addPageNo: (state) => {
      state.pageNo += 1;
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
            addPlaceToColumnPlaces_1: boolean;
          }>
        ) => {
          state.status = "succeeded";

          state.place = action.payload.place;
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
  modalToggle,
  accommoToggle,
  addPageNo,
  clearPageNo,
} = placeSlice.actions;

export default placeSlice.reducer;
