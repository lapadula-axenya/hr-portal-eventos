export type PasswordRule = {
  label: string;
  isValid: boolean;
};

export type PasswordRulesProps = {
  rules: PasswordRule[];
};

export type UsePasswordRulesProps = {
  password: string;
  confirmPassword: string;
};
