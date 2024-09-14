export interface HistoryItem {
  amount: number;
  date: string;
  description: string;
  type: "debit" | "credit";
  reference: string;
}

export interface MergedHistoryByDate {
  date: string;
  items: HistoryItem[];
}
