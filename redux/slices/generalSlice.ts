import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GeneralState } from "@/types/data.type";

const initialState: GeneralState = {
  hideTabBar: false,
  loading: false,
  error: null,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setHideTabBar: (state, action: PayloadAction<boolean>) => {
      state.hideTabBar = action.payload;
    },
    resetState: (state, action: PayloadAction<undefined>) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {},
});

export const generalInitialState = initialState;
export const generalSliceActions = generalSlice.actions;

export default generalSlice.reducer;
