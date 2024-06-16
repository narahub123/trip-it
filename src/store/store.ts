import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import metroSlice from "./slices/metroSlice";
import scheduleSlice from "./slices/scheduleSlice";
import dateSlice from "./slices/dateSlice";
import placeSlice from "./slices/placeSlice";
import columnPlacesSlice from "./slices/columnPlacesSlice";
import accommoSlice from "./slices/accommoSlice";
import uiSlice from "./slices/uiSlice";
import mapSlice from "./slices/mapSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    metro: metroSlice,
    schedule: scheduleSlice,
    date: dateSlice,
    place: placeSlice,
    columnPlaces: columnPlacesSlice,
    accommo: accommoSlice,
    ui: uiSlice,
    map: mapSlice,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
