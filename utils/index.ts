import { HistoryItem, MergedHistoryByDate } from "@/types/data.type";

export const waitForTimeout = (
  callback?: () => void,
  timer: number = 2000
): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = callback?.();
      resolve(result);
    }, timer);
  });
};

export const formatAmount = (
  value: number,
  type?: HistoryItem["type"],
  symbol: string = "MYR"
): string => {
  // thousand separators
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // format value
  const formattedValue = formatter.format(value);

  // debit/credit sign
  const sign = type ? (type === "credit" ? "+" : "-") : "";

  // return formatted amount with symbol and sign
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
    .map(([date, data]) => ({ date, data }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
