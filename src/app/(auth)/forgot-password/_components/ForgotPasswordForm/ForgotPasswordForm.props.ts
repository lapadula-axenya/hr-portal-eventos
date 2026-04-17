import { FormErrors } from "@/components";

export type ForgotPasswordFormType = {
  email: string;
};

export type UseForgotPasswordFormReturn = {
  formValues: ForgotPasswordFormType;
  formErrors: FormErrors<ForgotPasswordFormType>;
  isLoading: boolean;
  showSuccess: boolean;
  handleFormChange: <K extends "email">(
    key: K,
    value: ForgotPasswordFormType[K],
  ) => void;
  handleSubmit: () => Promise<void>;
};
