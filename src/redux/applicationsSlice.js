import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const initialState = {
  job: {},
  applications: [],
  isApplying: false,
  isFetching: true,
  isLoading: true,
};

export const getJobById = createAsyncThunk(
  "applicationsSlice/getJobById",
  async (id) => {
    const getJobRef = doc(db, "jobs", id);
    const querySnap = await getDoc(getJobRef);
    return { id: querySnap.id, ...querySnap.data() };
  }
);

export const getApplicationsById = createAsyncThunk(
  "applicationsSlice/getApplicationsById",
  async (id) => {
    const applications = [];
    const getApplicationsRef = collection(db, "applications");
    const q = query(getApplicationsRef, where("jobId", "==", id));
    const querySnap = await getDocs(q).catch((err) => console.log(err));
    querySnap.docs.forEach((doc) =>
      applications.push({ id: doc.id, ...doc.data() })
    );
    return applications;
  }
);

export const applyJob = createAsyncThunk(
  "applicationsSlice/applyJob",
  async (application) => {
    const postApplicationRef = collection(db, "applications");
    const res = await addDoc(postApplicationRef, {
      ...application,
      appliedOn: new Date().toISOString(),
    }).catch((err) => console.log(err));
    return res.id;
  }
);

const applicationsSlice = createSlice({
  name: "applicationsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobById.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getJobById.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.job = payload;
      })
      .addCase(getJobById.rejected, (state) => {
        state.isFetching = true;
      })
      .addCase(applyJob.pending, (state) => {
        state.isApplying = true;
      })
      .addCase(applyJob.fulfilled, (state) => {
        state.isApplying = false;
      })
      .addCase(applyJob.rejected, (state) => {
        state.isApplying = true;
      })
      .addCase(getApplicationsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplicationsById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.applications = payload;
      })
      .addCase(getApplicationsById.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default applicationsSlice.reducer;
