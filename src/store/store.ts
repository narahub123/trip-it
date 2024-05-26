import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import metroSlice from "./slices/metroSlice";
import scheduleSlice from "./slices/scheduleSlice";
import dateSlice from "./slices/dateSlice";
import placeSlice from "./slices/placeSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    metro: metroSlice,
    schedule: scheduleSlice,
    date: dateSlice,
    place: placeSlice,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
