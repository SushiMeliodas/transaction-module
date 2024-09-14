import { configureStore, combineReducers } from "@reduxjs/toolkit";

import financeSlice from "./slices/financeSlice";

const rootReducer = combineReducers({
  finance: financeSlice,
});

const store = configureStore({
  reducer: rootReducer, // Root reducer
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
