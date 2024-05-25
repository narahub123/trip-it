import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import metroSlice from "./slices/metroSlice";
import scheduleSlice from "./slices/scheduleSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    metro: metroSlice,
    schedule: scheduleSlice,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
