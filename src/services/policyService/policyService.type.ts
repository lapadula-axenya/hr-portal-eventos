import { Company } from "../companyService";

export enum PolicyStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum PolicyStatusTranslate {
  ACTIVE = "Ativa",
  INACTIVE = "Inativa",
}

export type PolicySummary = {
  id: string;
  name: string;
  benefitName: string;
  status: PolicyStatus;
  providerUrl: string;
};

export type PolicySummaryApi = {
  id: string;
  contractType?: string;
  isActive?: string;
  productType?: string;
  provider?: string;
  providerUrl?: string;
};

export type Policy = PolicySummary & {
  company?: Pick<Company, "name" | "document">;
  benefits: string[];
  coverageStart?: string;
  coverageEnd?: string;
};

export type Plan = {
  id: string;
  name: string;
  provider?: string;
  productType?: string;
};

export type PolicyApi = PolicySummaryApi & {
  contractCode?: string;
  companyDocument?: string;
  companyName?: string;
  effectiveDate?: string;
  expirationDate?: string;
  isActiveText?: string;
  subCompanyDocument?: string;
  plans?: Plan[];
};

export type PolicyFilter = {
  "filter.isActive": "true" | "false";
};
