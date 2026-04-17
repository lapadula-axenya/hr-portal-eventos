import { getAuth } from "firebase/auth";
import { Principal } from "@/services/principalService";

export function isCurrentUserPrincipal(principal?: Principal) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user || !principal) return false;

  return principal.externalId === user.uid;
}
