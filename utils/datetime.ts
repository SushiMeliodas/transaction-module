import moment from "moment";

export const formatDate = (
  dateString: string,
  format: string = "D MMM YYYY"
): string => {
  // Parse the date string using moment
  const date = moment(dateString);

  // Format the date using the provided format or default format
  return date.format(format);
};

export const formatTime = (seconds: number) => {
  return moment.utc(seconds * 1000).format("mm:ss");
};
