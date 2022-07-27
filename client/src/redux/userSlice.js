import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../helpers/localStorage";

const initialState = getItem("userInfo") || "";

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, payload) {
      state = payload.payload;
    },
  },
});

export default userSlice;

export const userSliceActions = userSlice.actions;
