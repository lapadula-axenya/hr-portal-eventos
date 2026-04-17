export type PasswordRule = {
  label: string;
  isValid: boolean;
};

export function getPasswordRules(
  password: string,
  confirmPassword: string,
): PasswordRule[] {
  return [
    {
      label: "Mínimo 8 digitos",
      isValid: password.length >= 8,
    },
    {
      label: "1 letra maiúscula",
      isValid: /[A-Z]/.test(password),
    },
    {
      label: "1 letra minúscula",
      isValid: /[a-z]/.test(password),
    },
    {
      label: "1 número",
      isValid: /\d/.test(password),
    },
    {
      label: "1 caractere especial (!, @, ., _)",
      isValid: /[^a-zA-Z0-9]/.test(password),
    },
    {
      label: "As senhas precisam ser idênticas",
      isValid: password === confirmPassword,
    },
  ];
}

export function validatePasswordRules(
  password: string,
  confirmPassword: string,
): boolean {
  return getPasswordRules(password, confirmPassword).every(
    (rule) => rule.isValid,
  );
}
