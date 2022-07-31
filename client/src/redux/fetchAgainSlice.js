import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchAgain: false,
};

const fetchAgainSlice = createSlice({
  name: "fetchAgain",
  initialState: initialState,
  reducers: {
    setFetchAgain(state) {
      state.fetchAgain = !state.fetchAgain;
    },
  },
});

export default fetchAgainSlice;
export const fetchAgainSliceActions = fetchAgainSlice.actions;
