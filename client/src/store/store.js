import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import userDataReducer from "./slices/userDataSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  userData: userDataReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required by Redux Toolkit to work with Electron and Immer
    }),
});

export const persistor = persistStore(store);
