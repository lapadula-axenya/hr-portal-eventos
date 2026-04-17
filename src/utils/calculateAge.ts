import { dayjsTz } from "@/lib/dayjsTz";

export function calculateAge(birthDate?: string) {
  if (!birthDate) return 0;

  const birth = dayjsTz(birthDate);
  const today = dayjsTz();

  return today.diff(birth, "year");
}
