export interface HistoryItem {
  amount: number;
  date: string;
  description: string;
  type: "debit" | "credit";
  reference: string;
}

export interface MergedHistoryByDate {
  date: string;
  data: HistoryItem[];
}

export interface FinanceState {
  balance: number;
  history: {
    items: MergedHistoryByDate[];
    totalCount: number;
    details: HistoryItem;
    isLastResult: boolean;
  };
  loading: boolean;
  error: string | null | undefined;
}
