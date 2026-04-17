import { useState } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export function useAmplitude() {
  const { hasConsent } = useCookieConsent();
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);

  const onAnalyticsLoad = () => setAnalyticsLoaded(true);

  const onSessionReplayLoad = () => {
    const amplitudeApiKey = process.env.NEXT_PUBLIC_AMPLITUDE;
    if (!amplitudeApiKey) return;
    window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }));
    window.amplitude.init(amplitudeApiKey, {
      autocapture: { elementInteractions: true },
    });
  };

  return { hasConsent, analyticsLoaded, onAnalyticsLoad, onSessionReplayLoad };
}
