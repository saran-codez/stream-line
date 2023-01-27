import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const initialState = {
  postedJobs: [],
  isLoading: true,
};

export const getJobsByUserId = createAsyncThunk(
  "jobsSlice/getJobsByUserId",
  async (id) => {
    const jobs = [];
    const getJobsRef = collection(db, "jobs");
    const q = query(getJobsRef, where("postedby", "==", id));
    const querySnap = await getDocs(q).catch((err) => console.log(err));
    querySnap.docs.forEach((doc) => jobs.push({ id: doc.id, ...doc.data() }));
    return jobs;
  }
);

const recruiterSlice = createSlice({
  name: "recruiterSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobsByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobsByUserId.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.postedJobs = [...payload];
      })
      .addCase(getJobsByUserId.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default recruiterSlice.reducer;
