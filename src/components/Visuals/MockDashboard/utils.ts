/** Format "2025-03" → "Mar '25" */
export function formatMonth(m: string): string {
  const parts = m.split("-");
  const names = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  return names[parseInt(parts[1]) - 1] + " '" + parts[0].slice(2);
}

/** Round to 2 decimal places */
export function round2(v: number): number {
  return Math.round(v * 100) / 100;
}

/** Toggle a value in an array (add if absent, remove if present) */
export function toggle<T>(arr: T[], setter: (v: T[]) => void, val: T): void {
  if (arr.includes(val)) setter(arr.filter((x) => x !== val));
  else setter([...arr, val]);
}
