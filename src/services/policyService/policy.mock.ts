import { PolicyStatus, PolicySummary, Policy } from "./policyService.type";

export const policiesMock: PolicySummary[] = [
  {
    id: "pol-001",
    name: "Contrato Saúde Empresarial 2024",
    benefitName: "Plano de Saúde",
    status: PolicyStatus.ACTIVE,
    providerUrl: "https://www.amil.com.br",
  },
  {
    id: "pol-002",
    name: "Contrato Odontológico 2024",
    benefitName: "Odontológico",
    status: PolicyStatus.ACTIVE,
    providerUrl: "https://www.odontoprev.com.br",
  },
  {
    id: "pol-003",
    name: "Seguro de Vida Coletivo 2024",
    benefitName: "Seguro de Vida",
    status: PolicyStatus.ACTIVE,
    providerUrl: "https://www.sulamerica.com.br",
  },
  {
    id: "pol-004",
    name: "Contrato Saúde Anterior 2022",
    benefitName: "Plano de Saúde",
    status: PolicyStatus.INACTIVE,
    providerUrl: "https://www.bradescosaude.com.br",
  },
];

export const policyDetailsMock: Record<string, Policy> = {
  "pol-001": {
    id: "pol-001",
    name: "Contrato Saúde Empresarial 2024",
    benefitName: "Plano de Saúde",
    status: PolicyStatus.ACTIVE,
    providerUrl: "https://www.amil.com.br",
    company: { name: "Acme", document: "12.345.678/0001-90" },
    coverageStart: "2024-01-01",
    coverageEnd: "2024-12-31",
    benefits: ["Plano Amil 400", "Plano Amil 700 - Apartamento", "Plano Amil Fácil"],
  },
  "pol-002": {
    id: "pol-002",
    name: "Contrato Odontológico 2024",
    benefitName: "Odontológico",
    status: PolicyStatus.ACTIVE,
    providerUrl: "https://www.odontoprev.com.br",
    company: { name: "Acme", document: "12.345.678/0001-90" },
    coverageStart: "2024-01-01",
    coverageEnd: "2024-12-31",
    benefits: ["Odontoprev Prime", "Odontoprev Start"],
  },
  "pol-003": {
    id: "pol-003",
    name: "Seguro de Vida Coletivo 2024",
    benefitName: "Seguro de Vida",
    status: PolicyStatus.ACTIVE,
    providerUrl: "https://www.sulamerica.com.br",
    company: { name: "Acme", document: "12.345.678/0001-90" },
    coverageStart: "2024-01-01",
    coverageEnd: "2024-12-31",
    benefits: ["Seguro de Vida SulAmérica Coletivo"],
  },
  "pol-004": {
    id: "pol-004",
    name: "Contrato Saúde Anterior 2022",
    benefitName: "Plano de Saúde",
    status: PolicyStatus.INACTIVE,
    providerUrl: "https://www.bradescosaude.com.br",
    company: { name: "Acme", document: "12.345.678/0001-90" },
    coverageStart: "2022-01-01",
    coverageEnd: "2023-12-31",
    benefits: ["Bradesco Saúde Nacional Flex"],
  },
};
