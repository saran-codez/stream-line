import { configureStore } from "@reduxjs/toolkit";
import applicationsSlice from "./applicationsSlice";
import jobsSlice from "./jobsSlice";
import recruiterSlice from "./recruiterSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsSlice,
    user: userSlice,
    recruiter: recruiterSlice,
    applications: applicationsSlice,
  },
});
