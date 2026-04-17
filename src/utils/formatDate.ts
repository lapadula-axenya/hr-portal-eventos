import { dayjsTz } from "@/lib/dayjsTz";

export function formatDate(date?: string) {
  if (!date) return "";
  return dayjsTz(date).format("DD/MM/YYYY");
}
