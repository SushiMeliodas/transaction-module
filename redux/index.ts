import { configureStore, combineReducers } from "@reduxjs/toolkit";

import financeSlice, { financeInitialState } from "./slices/financeSlice";
import authSlice, { authInitialState } from "./slices/authSlice";
import generalSlice, { generalInitialState } from "./slices/generalSlice";

const appReducer = combineReducers({
  finance: financeSlice,
  auth: authSlice,
  general: generalSlice,
});

const rootReducer = (state: any, action: any) => {
  // console.log(state, "redux");

  // console.log(action.type, state?.auth.isLoginDisabled);
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
