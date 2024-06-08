import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: false,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
    },
    fetchSucces(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchFailure(state, action) {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },
    clearData(state) {
      state.data = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { fetchStart, fetchSucces, fetchFailure, clearData } = userDataSlice.actions;

export default userDataSlice.reducer;
