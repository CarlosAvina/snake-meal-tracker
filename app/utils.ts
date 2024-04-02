import moment from "moment";

export function formatToIsoDate(date: string) {
  return moment(new Date(date).toISOString());
}
