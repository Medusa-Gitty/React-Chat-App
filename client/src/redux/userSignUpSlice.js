import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSignUpSlice = createSlice({
  name: "userSignUp",
  initialState: initialState,
  reducers: {},
});

export default userSignUpSlice;

export const userSignUpActions = userSignUpSlice.actions;
