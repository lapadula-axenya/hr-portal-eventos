import { FilterExpression, FilterOperator } from "@/types/filterOperator";

export enum KpiStatus {
  IN_PROGRESS = "inProgress",
  PENDING = "pending",
  COMPLETED = "completed",
}

export enum KpiStatusTranslate {
  inProgress = "Em andamento",
  pending = "Pendente",
  completed = "Concluída",
}

export type KpiValues = {
  today: string;
  yesterday: string;
};

export type Kpi = Record<KpiStatus, KpiValues>;

export type KpiFilter = {
  "filter.name"?: FilterExpression<FilterOperator.ILIKE>;
};

export type KpiFilterKeys = keyof KpiFilter;
