import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "..";
import { FetchHistoryParams, FetchHistoryResponse } from "@/types/finance.type";

import { history } from "@/constant";

import { waitForTimeout } from "@/utils";
import { mergeHistoryByDate } from "@/utils/object";

export const fetchHistory = createAsyncThunk<
  FetchHistoryResponse,
  FetchHistoryParams,
  { rejectValue: string }
>(
  "finance/fetchHistory",
  async ({ loadMore }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;

      let isLastResult = false;

      // Mock Api fetch
      const response = await waitForTimeout(() => {
        let historyData = history;

        const totalCount = state.finance.history.totalCount;

        if (!loadMore) {
          historyData = history.slice(0, 10);
        } else {
          if (totalCount < history.length) {
            historyData = history.slice(0, totalCount + 5);
          }
        }

        if (totalCount === history.length) {
          isLastResult = true;
        }

        return {
          data: {
            balance: 3641.77,
            history: historyData,
            totalCount: historyData.length,
          },
        };
      }, 1500);

      const mergedHistory = mergeHistoryByDate(response.data.history);

      return {
        balance: response.data.balance,
        items: mergedHistory,
        totalCount: response.data.totalCount,
        isLastResult,
      };

      //   return response.data; // This will be the payload in the fulfilled action
    } catch (error) {
      return rejectWithValue("Failed to fetch history"); // Custom error message
    }
  }
);
