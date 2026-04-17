"use client";

import { PropsWithChildren } from "react";
import { Stack } from "@mui/material";
import {
  PageMenu,
  usePageLayout,
  pageLayoutContainerStyles,
  pageLayoutMainStyles,
  LoadingScreen,
} from "@/components";
import { DashboardOnlyContext } from "@/contexts/DashboardOnlyContext";

export function PageLayout({ children }: PropsWithChildren) {
  const {
    isDashboardOnly,
    isExpandedPinned,
    isHover,
    isRemoteConfigLoaded,
    principalQuery,
    setIsExpandedPinned,
    setIsHover,
  } = usePageLayout();

  if (principalQuery.isLoading || !isRemoteConfigLoaded)
    return <LoadingScreen />;

  return (
    <DashboardOnlyContext.Provider value={{ isDashboardOnly }}>
      <Stack {...pageLayoutContainerStyles}>
        <PageMenu
          isDashboardOnly={isDashboardOnly}
          isExpandedPinned={isExpandedPinned}
          isHover={isHover}
          onChangeIsExpandedPinned={setIsExpandedPinned}
          onChangeIsHover={setIsHover}
        />
        <Stack {...pageLayoutMainStyles(isExpandedPinned)}>{children}</Stack>
      </Stack>
    </DashboardOnlyContext.Provider>
  );
}
