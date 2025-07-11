import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser:(state, action)=>{
      state.user=action.payload;
    },
    setToken:(state, action)=>{
      state.token=action.payload;
    },
  },
});

const appReducer = appSlice.reducer;

export const {setUser, setToken} = appSlice.actions;

export default appReducer;
