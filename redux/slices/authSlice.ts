import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FinanceState, HistoryItem } from "@/types/data.type";
import { FetchHistoryResponse } from "@/types/finance.type";

import { fetchHistory } from "../actions/financeActions";

const initialState = {
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
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuthenticatedData: (state, action: PayloadAction<HistoryItem>) => {
      state.isAuthenticated = true;
      state.isActive = true;
    },
    setRevealSensitiveData: (state, action: PayloadAction<HistoryItem>) => {
      state.isSensitiveDataVisible = true;
      state.isActive = true;
    },
  },
  extraReducers: (builder) => {},
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
