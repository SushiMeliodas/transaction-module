import { HistoryItem } from "@/types/data.type";

export const getTransColor = (
  itemType: HistoryItem["type"],
  variant: string = "bg"
) => {
  if (variant === "text")
    return itemType === "credit" ? "text-green-500" : "text-red-500";

  return itemType === "credit" ? "bg-green-500" : "bg-red-500";
};

export const waitForTimeout = <T = void>(
  callback?: () => void,
  timer: number = 2000
): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = callback?.();
      resolve(result as T);
    }, timer);
  });
};
