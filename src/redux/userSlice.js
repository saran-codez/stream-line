import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const initialState = {
  currentUser: {},
  isLoading: true,
};

export const getUserById = createAsyncThunk(
  "userSlice/getUserById",
  async (id) => {
    const users = [];
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "==", id));
    const querySnap = await getDocs(q).catch((err) => {
      console.log(err);
    });
    querySnap.docs.forEach((doc) => users.push(doc.data()));
    return users[0];
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.isLoading = false;
      })
      .addCase(getUserById.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default userSlice.reducer;
