import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
    },
    authSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    authFailure(state, action) {
      state.currentUser = null;  
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { authStart, authSuccess, authFailure } = userSlice.actions;

export default userSlice.reducer;
