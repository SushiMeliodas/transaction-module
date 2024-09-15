import { HistoryItem, MergedHistoryByDate } from "@/types/data.type";

export const getTransColor = (
  itemType: HistoryItem["type"],
  variant: string = "bg"
) => {
  if (variant === "text")
    return itemType === "credit" ? "text-green-600" : "text-red-600";

  return itemType === "credit" ? "bg-green-500" : "bg-red-500";
};

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

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Create an options object for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short", // Short month name
    day: "numeric",
  };

  // Format the date
  return date.toLocaleDateString("en-US", options);
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
