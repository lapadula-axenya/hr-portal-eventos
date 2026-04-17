import { ChangeEvent, useEffect, useRef } from "react";
import { InputDebounceProps } from "@/components";

export function useInputDebounce({
  debounceTimeout = 1000,
  onDebounce,
}: InputDebounceProps) {
  const timerRef = useRef<number | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trim();

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      onDebounce(newValue);
    }, debounceTimeout);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { handleChange };
}
