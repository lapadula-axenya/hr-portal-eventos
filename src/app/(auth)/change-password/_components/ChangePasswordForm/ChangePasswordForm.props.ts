import { FormErrors, PasswordRule } from "@/components";

export type ChangePasswordFormType = {
  password: string;
  confirmPassword: string;
};

export type UseChangePasswordFormReturn = {
  email: string;
  formValues: ChangePasswordFormType;
  formErrors: FormErrors<ChangePasswordFormType>;
  isLoading: boolean;
  rules: PasswordRule[];
  showPasswordRules: boolean;
  showSuccess: boolean;
  handleFormChange: <K extends keyof ChangePasswordFormType>(
    key: K,
    value: ChangePasswordFormType[K],
  ) => void;
  handleSubmit: () => Promise<void>;
};
