import { Provider } from ".";

export const providersMock: Provider[] = Array.from({ length: 5 }).map(
  (_, i) => ({
    id: `company-${(i % 5) + 1}`,
    name: `Operadora ${(i % 5) + 1}`,
  }),
);
