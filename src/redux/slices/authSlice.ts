import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthState } from "@/types/data.type";

const initialState: AuthState = {
  user: {
    name: "John",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
  },
  isAuthenticated: false,
  isBiometricSupported: false,
  isBiometricAuthenticated: false,
  isSensitiveDataVisible: false,
  isActive: false,
  isAuthenticating: false,
  authInactivityOnly: false,
  isRedirectLogin: false,
  isReactiveIdle: false,
  isLoginDisabled: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setisAuthenticating: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticating = action.payload;
    },
    setAuthenticatedData: (state, action: PayloadAction<undefined>) => {
      state.isAuthenticated = true;
      state.isActive = true;
    },
    setRevealSensitiveData: (state, action: PayloadAction<boolean>) => {
      state.isSensitiveDataVisible = action.payload;
      // state.isActive = true;
    },
    // For user inactive push white screen
    setAuthActivity: (state, action: PayloadAction<boolean>) => {
      state.authInactivityOnly = action.payload;
    },
    // For user session
    setAuthActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setReactiveIdle: (state, action: PayloadAction<boolean>) => {
      state.isReactiveIdle = action.payload;
    },
    setLoginDisabled: (state, action: PayloadAction<boolean>) => {
      state.isLoginDisabled = action.payload;
    },
    redirectLogin: (state, action: PayloadAction<boolean>) => {
      state.isRedirectLogin = action.payload;
    },
    logout: (state, action: PayloadAction<undefined>) => {
      return initialState;
    },
    resetState: (state, action: PayloadAction<undefined>) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {},
});

export const authInitialState = initialState;
export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
