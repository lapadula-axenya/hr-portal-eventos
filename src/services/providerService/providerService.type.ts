import { FilterExpression, FilterOperator } from "@/types/filterOperator";

export type Provider = {
  id: string;
  name: string;
};

export type ProviderFilter = {
  "filter.name"?: FilterExpression<FilterOperator.ILIKE>;
};

export type ProviderFilterKeys = keyof ProviderFilter;
