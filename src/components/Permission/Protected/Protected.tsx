import { ProtectedProps } from "@/components";
import { useAuthContext } from "@/contexts/AuthContext";

export function Protected({
  children,
  fallback = null,
  roles,
}: ProtectedProps) {
  const { hasAnyRole } = useAuthContext();

  if (hasAnyRole(roles)) {
    return children;
  }

  return fallback;
}
