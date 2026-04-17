import { cookieConsent } from "@/constants/cookieConsent";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export function useCookieBar() {
  const { hasConsent, setHasConsent } = useCookieConsent();

  const handleClick = () => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(cookieConsent, new Date().toISOString());
    } catch {
      // localStorage unavailable (e.g. private browsing)
    }
    window.dispatchEvent(new Event(cookieConsent));
    setHasConsent(true);
  };

  return { handleClick, hasConsent };
}
