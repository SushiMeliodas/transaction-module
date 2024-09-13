export interface HistoryItem {
  amount: number;
  date: string;
  description: string;
  type: "debit" | "credit";
}
