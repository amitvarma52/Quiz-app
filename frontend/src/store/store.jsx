/** @format */

import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    initial: (state, action) => {
      return action.payload;
    },
    delete: (state, action) => {
      return null;
    },
  },
});
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
export const userActions = userSlice.actions;
