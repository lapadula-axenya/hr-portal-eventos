import { BenefitStatus, BenefitType } from "../benefitService";
import { Invoice } from ".";

const acme = { id: "acme-001", name: "Acme", document: "12.345.678/0001-90" };
const amil = { id: "provider-amil", name: "Amil" };
const odontoprev = { id: "provider-odonto", name: "Odontoprev" };

const healthBenefit = {
  id: "benefit-h-invoice",
  name: "Plano Amil 400",
  type: BenefitType.HEALTH,
  status: BenefitStatus.ACTIVE,
  provider: "Amil",
  cardNumber: "",
  actions: [],
};

const dentalBenefit = {
  id: "benefit-d-invoice",
  name: "Odontoprev Prime",
  type: BenefitType.DENTAL,
  status: BenefitStatus.ACTIVE,
  provider: "Odontoprev",
  cardNumber: "",
  actions: [],
};

export const invoicesMock: Invoice[] = [
  { id: "inv-001", fileName: "Fatura_Saude_Janeiro_2025.pdf", company: acme, provider: amil, benefit: healthBenefit, coveragePeriod: "Janeiro 2025", dueDate: "2025-02-10", amount: 48750.00 },
  { id: "inv-002", fileName: "Fatura_Odonto_Janeiro_2025.pdf", company: acme, provider: odontoprev, benefit: dentalBenefit, coveragePeriod: "Janeiro 2025", dueDate: "2025-02-10", amount: 8200.00 },
  { id: "inv-003", fileName: "Fatura_Saude_Fevereiro_2025.pdf", company: acme, provider: amil, benefit: healthBenefit, coveragePeriod: "Fevereiro 2025", dueDate: "2025-03-10", amount: 49100.00 },
  { id: "inv-004", fileName: "Fatura_Odonto_Fevereiro_2025.pdf", company: acme, provider: odontoprev, benefit: dentalBenefit, coveragePeriod: "Fevereiro 2025", dueDate: "2025-03-10", amount: 8350.00 },
  { id: "inv-005", fileName: "Fatura_Saude_Marco_2025.pdf", company: acme, provider: amil, benefit: healthBenefit, coveragePeriod: "Março 2025", dueDate: "2025-04-10", amount: 49800.50 },
  { id: "inv-006", fileName: "Fatura_Odonto_Marco_2025.pdf", company: acme, provider: odontoprev, benefit: dentalBenefit, coveragePeriod: "Março 2025", dueDate: "2025-04-10", amount: 8500.00 },
  { id: "inv-007", fileName: "Fatura_Saude_Abril_2025.pdf", company: acme, provider: amil, benefit: healthBenefit, coveragePeriod: "Abril 2025", dueDate: "2025-05-10", amount: 50200.75 },
  { id: "inv-008", fileName: "Fatura_Odonto_Abril_2025.pdf", company: acme, provider: odontoprev, benefit: dentalBenefit, coveragePeriod: "Abril 2025", dueDate: "2025-05-10", amount: 8650.00 },
  { id: "inv-009", fileName: "Fatura_Saude_Novembro_2024.pdf", company: acme, provider: amil, benefit: healthBenefit, coveragePeriod: "Novembro 2024", dueDate: "2024-12-10", amount: 46900.00 },
  { id: "inv-010", fileName: "Fatura_Odonto_Novembro_2024.pdf", company: acme, provider: odontoprev, benefit: dentalBenefit, coveragePeriod: "Novembro 2024", dueDate: "2024-12-10", amount: 7950.00 },
  { id: "inv-011", fileName: "Fatura_Saude_Dezembro_2024.pdf", company: acme, provider: amil, benefit: healthBenefit, coveragePeriod: "Dezembro 2024", dueDate: "2025-01-10", amount: 47500.00 },
  { id: "inv-012", fileName: "Fatura_Odonto_Dezembro_2024.pdf", company: acme, provider: odontoprev, benefit: dentalBenefit, coveragePeriod: "Dezembro 2024", dueDate: "2025-01-10", amount: 8100.00 },
];
