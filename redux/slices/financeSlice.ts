import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FinanceState, HistoryItem } from "@/types/data.type";
import { FetchHistoryResponse } from "@/types/finance.type";

import { fetchHistory } from "../actions/financeActions";

const initialState: FinanceState = {
  balance: 0,
  history: {
    items: [],
    totalCount: 0,
    details: {} as HistoryItem,
    isLastResult: false,
  },
  loading: false,
  error: null,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setHistoryDetail: (state, action: PayloadAction<HistoryItem>) => {
      state.history.details = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchHistory
    builder
      .addCase(fetchHistory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        fetchHistory.fulfilled,
        (state, action: { payload: FetchHistoryResponse }) => {
          state.loading = false;
          state.balance = action.payload.balance;
          state.history.items = action.payload.items;
          state.history.totalCount = action.payload.totalCount;
          state.history.isLastResult = action.payload.isLastResult;
        }
      )
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export const financeSliceActions = financeSlice.actions;

export default financeSlice.reducer;
