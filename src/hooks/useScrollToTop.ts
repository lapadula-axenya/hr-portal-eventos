import { useCallback, useRef } from "react";

export function useScrollToTop() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = useCallback(() => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return { containerRef, scrollToTop };
}
