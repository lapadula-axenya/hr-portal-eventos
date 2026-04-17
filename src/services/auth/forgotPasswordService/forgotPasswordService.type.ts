export type ForgotPasswordData = {
  email: string;
};

export type ChangePasswordData = {
  token: string;
  email: string;
  password: string;
};
