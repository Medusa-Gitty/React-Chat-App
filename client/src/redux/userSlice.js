import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../helpers/localStorage";

const initialState = getItem("userInfo") || "";

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
});

export default userSlice;

export const userActions = userSlice.actions;
