import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  history: [],
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
  },
});

export const financeSliceActions = financeSlice.actions;

export default financeSlice.reducer;
