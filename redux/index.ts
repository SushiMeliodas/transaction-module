import { configureStore, combineReducers } from "@reduxjs/toolkit";

import financeSlice from "./slices/financeSlice";
import authSlice from "./slices/authSlice";

const rootReducer = combineReducers({
  finance: financeSlice,
  auth: authSlice,
});

const store = configureStore({
  reducer: rootReducer, // Root reducer
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
