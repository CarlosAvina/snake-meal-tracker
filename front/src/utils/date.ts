export function formatUTCDateISO(date: Date): string {
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + date.getUTCDate()).slice(-2);
  const isoDate = `${year}-${month}-${day}`;
  return isoDate;
}
