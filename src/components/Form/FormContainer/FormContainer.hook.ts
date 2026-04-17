import { useState, useCallback } from "react";
import { FormErrors } from "@/components";

export function useFormHandler<T extends Record<string, unknown>>(
  initialState: T,
) {
  const [formValues, setFormValues] = useState<T>(initialState);
  const [formErrors, setFormErrors] = useState<FormErrors<T>>({});

  const handleFormChange = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setFormValues((prev) => ({ ...prev, [key]: value }));
      setFormErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [],
  );

  const applyFormErrors = useCallback((newErrors: FormErrors<T>) => {
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const resetForm = useCallback(() => {
    setFormValues(initialState);
    setFormErrors({});
  }, [initialState]);

  return {
    formErrors,
    formValues,
    resetForm,
    applyFormErrors,
    handleFormChange,
  };
}
