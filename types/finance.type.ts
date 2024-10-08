import { HistoryItem, MergedHistoryByDate, FinanceState } from "./data.type";

export interface FetchHistoryResponse {
  balance: FinanceState["balance"];
  items: FinanceState["history"]["items"];
  totalCount: FinanceState["history"]["totalCount"];
  isLastResult: FinanceState["history"]["isLastResult"];
}

export interface FetchHistoryParams {
  loadMore?: boolean;
}
