import { dayjsTz } from "@/lib/dayjsTz";

export function findMostRecent<
  T extends Record<K, string | Date>,
  K extends keyof T,
>(items: T[] | undefined, dateKey: K): T | undefined {
  if (!items?.length) {
    return undefined;
  }

  return items.reduce((latest, current) =>
    dayjsTz(current[dateKey]).isAfter(dayjsTz(latest[dateKey]))
      ? current
      : latest,
  );
}
