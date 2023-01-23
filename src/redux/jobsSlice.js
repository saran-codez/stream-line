import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

const initialState = {
  jobs: [],
  isLoading: true,
  isPosting: false,
  isFiltered: false,
};

// TODO: order jobs according to time posted in desc order to get recent posts
export const getJobs = createAsyncThunk("jobsSlice/getJobs", async () => {
  const jobs = [];
  const getJobsRef = collection(db, "jobs");
  const querySnap = await getDocs(getJobsRef).catch((err) => console.log(err));
  querySnap.docs.forEach((doc) => jobs.push({ id: doc.id, ...doc.data() }));
  return jobs;
});

// TODO: order jobs according to time posted in desc order to get recent posts
export const filterJobs = createAsyncThunk(
  "jobSlice/filterJobs",
  async (filter) => {
    const jobs = [];
    const getJobsRef = collection(db, "jobs");
    const q = query(
      getJobsRef,
      where("type", "==", `${filter.type}`),
      where("location", "==", `${filter.location}`)
    );
    const querySnap = await getDocs(q).catch((err) => console.log(err));
    querySnap.docs.forEach((doc) => jobs.push({ id: doc.id, ...doc.data() }));
    return jobs;
  }
);

export const postJob = createAsyncThunk(
  "jobsSlice/postJob",
  async (job, thunkApi) => {
    const postJobRef = collection(db, "jobs");
    const res = await addDoc(postJobRef, {
      ...job,
      postedOn: new Date().toISOString(),
    }).catch((err) => console.log(err));
    thunkApi.dispatch(getJobs());
    return res.id;
  }
);

const jobsSlice = createSlice({
  name: "jobSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isFiltered = false;
        state.jobs = payload;
      })
      .addCase(getJobs.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postJob.pending, (state) => {
        state.isPosting = true;
      })
      .addCase(postJob.fulfilled, (state) => {
        state.isPosting = false;
      })
      .addCase(postJob.rejected, (state) => {
        state.isPosting = false;
      })
      .addCase(filterJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isFiltered = true;
        state.jobs = payload;
      })
      .addCase(filterJobs.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default jobsSlice.reducer;
