import { createSlice } from "@reduxjs/toolkit";
import getCurrentDateTime from "../../utils/dates";

const initialState = {
  administering: false,
  startTime: "-:-",
  endTime: "-:-",
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminStart(state) {
      state.loading = true;
    },
    adminSuccess(state) {
      state.administering = true;
      state.startTime = getCurrentDateTime().timeOnly
      state.endTime = "--:--:--"
      state.loading = false;
      state.error = null;
    },
    adminFailure(state, action) {
      state.administering = false;
      state.loading = false;
      state.error = action.payload;
    },
    adminEnd(state) {
      state.administering = false;
      state.endTime = getCurrentDateTime().timeOnly
      state.loading = false;
      state.error = null;
    },
    adminReset(state) {
      state.administering = false;
      state.startTime = "--:--:--"
      state.endTime = "--:--:--"
      state.loading = false;
      state.error = null;
    }  
  },
});

export const { adminStart, adminSuccess, adminFailure, adminEnd, adminReset } = adminSlice.actions;

export default adminSlice.reducer;