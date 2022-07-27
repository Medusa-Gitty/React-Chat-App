import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../helpers/localStorage";

const userData = getItem("userInfo") || "";

const initialState = {
  userData: userData,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, payload) {
      state.userData = payload.payload;
    },
  },
});

export default userSlice;

export const userSliceActions = userSlice.actions;
