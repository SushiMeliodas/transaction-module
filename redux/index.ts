import { configureStore, combineReducers } from "@reduxjs/toolkit";

import financeSlice from "./slices/financeSlice";
import authSlice from "./slices/authSlice";
import generalSlice from "./slices/generalSlice";

const appReducer = combineReducers({
  finance: financeSlice,
  auth: authSlice,
  general: generalSlice,
});

const rootReducer = (state: any, action: any) => {
  // console.log(state, "redux");
  // Reset all state after logout
  if (action.type === "auth/logout") {
    state = undefined;
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer, // Root reducer
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
