import { HistoryItem } from "@/types/data.type";

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
