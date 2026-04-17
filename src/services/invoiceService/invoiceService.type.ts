import { Benefit } from "@/services/benefitService";
import { Company } from "@/services/companyService";
import { Provider } from "@/services/providerService";
import { FilterExpression, FilterOperator } from "@/types/filterOperator";

export type Invoice = {
  id: string;
  fileName: string;
  company: Company;
  provider: Provider;
  benefit: Benefit;
  coveragePeriod: string;
  dueDate: string;
  amount: number;
};

export type InvoiceFilter = {
  "filter.file.name"?: FilterExpression<FilterOperator.ILIKE>;
  "filter.company.id"?: FilterExpression<FilterOperator.IN>;
  "filter.provider.id"?: FilterExpression<FilterOperator.IN>;
  "filter.benefit.type"?: FilterExpression<FilterOperator.IN>;
};
