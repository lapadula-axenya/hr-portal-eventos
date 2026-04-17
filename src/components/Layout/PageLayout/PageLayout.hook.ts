import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { QueryKey } from "@/enums/QueryKey";
import { getMyPrincipal } from "@/services/principalService";

export function usePageLayout() {
  const { authQueryKey } = useAuthContext();

  const principalQuery = useQuery({
    queryKey: [QueryKey.PRINCIPAL_ME, ...authQueryKey],
    queryFn: getMyPrincipal,
  });

  const [isExpandedPinned, setIsExpandedPinned] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedValue = localStorage.getItem("isExpandedPinned");
    setIsExpandedPinned(storedValue === "true");
  }, []);

  return {
    isExpandedPinned,
    setIsExpandedPinned,
    isHover,
    setIsHover,
    isDashboardOnly: false,
    isRemoteConfigLoaded: true,
    principalQuery,
  };
}
