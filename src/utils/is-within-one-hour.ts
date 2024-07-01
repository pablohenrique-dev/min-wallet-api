import dayjs from "dayjs";

export function isWithinOneHour(date1: Date, date2: Date) {
  const diffInHours = dayjs(date2).diff(dayjs(date1), "hour");
  return diffInHours <= 1;
}
