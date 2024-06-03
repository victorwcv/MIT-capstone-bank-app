import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required by Redux Toolkit to work with Electron and Immer
    }),
});
