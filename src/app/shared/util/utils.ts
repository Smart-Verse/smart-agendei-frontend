import dayjs from "dayjs";

export function convertDate(date: string) {
  return dayjs(date,"'YYYY-MM-DD'").toDate();
}
