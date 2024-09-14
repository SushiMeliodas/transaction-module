import { HistoryItem, MergedHistoryByDate } from "@/types/data.type";

export const formatAmount = (
  value: number,
  type?: HistoryItem["type"],
  symbol: string = "MYR"
): string => {
  const formattedValue = value.toFixed(2);

  const sign = type ? (type === "credit" ? "+" : "-") : "";

  return `${sign}${symbol} ${formattedValue}`;
};

export const mergeHistoryByDate = (
  history: HistoryItem[]
): MergedHistoryByDate[] => {
  // Use a plain object to group items by date
  const groupedByDate: { [date: string]: HistoryItem[] } = {};

  // Group items by date
  history.forEach((item) => {
    if (!groupedByDate[item.date]) {
      groupedByDate[item.date] = [];
    }
    groupedByDate[item.date].push(item);
  });

  // Convert the grouped object to an array and sort by date
  return Object.entries(groupedByDate)
    .map(([date, items]) => ({ date, items }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
