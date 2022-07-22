import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessChat: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    setSelectedChat(state, payload) {
      state.accessChat = payload;
    },
  },
});

export default chatSlice;

export const chatSliceActions = chatSlice.actions;
