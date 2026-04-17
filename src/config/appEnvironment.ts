const AppEnvironment = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  LOCAL: "local",
} as const;

export const currentAppEnvironment = process.env.NEXT_PUBLIC_APP_ENV;

export const isProductionEnvironment =
  currentAppEnvironment === AppEnvironment.PRODUCTION;

export const isDevelopmentEnvironment =
  currentAppEnvironment === AppEnvironment.DEVELOPMENT;

export const isLocalEnvironment =
  currentAppEnvironment === AppEnvironment.LOCAL;
