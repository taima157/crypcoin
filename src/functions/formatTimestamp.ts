import moment from "moment";

export default function formatTimestamp(
  timestamp: number,
  period: "24h" | "1w" | "1m" | "3m" | "6m" | "1y"
) {
  let format: string = "";

  switch (period) {
    case "24h":
      format = "DD/MM - HH:mm";
      break;
    case "1w":
      format = "DD/MMMM";
      break;
    case "1m":
      format = "DD/MMMM";
      break;
    case "3m":
      format = "MMMM/YY";
      break;
    case "6m":
      format = "MMMM/YY";
      break;
    case "1y":
      format = "MMMM/YY";
      break;
  }

  return moment(new Date(timestamp * 1000)).format(format);
}
