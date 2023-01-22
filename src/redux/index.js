import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from "./jobsSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsSlice,
  },
});
