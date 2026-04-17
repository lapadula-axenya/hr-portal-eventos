"use client";

import Script from "next/script";
import { useAmplitude } from "./Amplitude.hook";

export function Amplitude() {
  const { analyticsLoaded, hasConsent, onAnalyticsLoad, onSessionReplayLoad } =
    useAmplitude();

  if (!hasConsent) return null;

  return (
    <>
      <Script
        src="https://cdn.amplitude.com/libs/analytics-browser-2.11.1-min.js.gz"
        strategy="afterInteractive"
        onLoad={onAnalyticsLoad}
      />
      {analyticsLoaded && (
        <Script
          src="https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.25.15-min.js.gz"
          strategy="afterInteractive"
          onLoad={onSessionReplayLoad}
        />
      )}
    </>
  );
}
