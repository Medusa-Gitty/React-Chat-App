import { configureStore } from "@reduxjs/toolkit";
import userSignUpSlice from "./userSignUpSlice";

const store = configureStore({
  reducer: {
    userSignUp: userSignUpSlice.reducer,
  },
});

export default store;
