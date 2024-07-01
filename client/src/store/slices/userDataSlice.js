import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    fetchSucces(state, action) {
      state.data = action.payload;
      
    },
    clearData(state) {
      state.data = null;
    },
  },
});

export const { fetchSucces, clearData } = userDataSlice.actions;

export default userDataSlice.reducer;
