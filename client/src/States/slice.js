import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

const appReducer = appSlice.reducer;

export const {} = appSlice.reducer;

export default appReducer;
