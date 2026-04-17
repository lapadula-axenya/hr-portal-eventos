"use client";

import { useEffect, useState } from "react";
import { cookieConsent } from "@/constants/cookieConsent";

export function useCookieConsent() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let consentFromStorage = false;
    try {
      consentFromStorage = !!localStorage.getItem(cookieConsent);
    } catch {
      // localStorage unavailable (e.g. private browsing)
    }

    if (consentFromStorage) {
      setHasConsent(true);
      return;
    }
    setHasConsent(false);
    const handler = () => setHasConsent(true);
    window.addEventListener(cookieConsent, handler);
    return () => window.removeEventListener(cookieConsent, handler);
  }, []);

  return { hasConsent, setHasConsent };
}
