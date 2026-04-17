import { Principal } from "@/services/principalService";

export function getPrincipalEmail(principal?: Principal) {
  return principal?.channel?.[0]?.email ?? "";
}
