export const AppRoutes = {
  AUTH: {
    SIGNUP: "/signup",
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
  },
  ADMIN: {
    USERS: "/users",
  },
  MAIN: {
    HOME: "/",
    REGISTRATION_STATUS: "/registration-status",
    DASHBOARDS: "/dashboards",
    ANALYTICS: "/analytics",
    MOVIMENTATIONS: "/movimentations",
    INVOICES: "/invoices",
    POLICIES: "/policies",
  },
} as const;
