import { Company, CompanyWithMeta } from ".";

export async function getAllCompanies(): Promise<Company[]> {
  return [{ id: "acme-001", name: "Acme", document: "12.345.678/0001-90" }];
}

export async function getCompanies(): Promise<CompanyWithMeta[]> {
  return [{ id: "acme-001", name: "Acme", isHome: true, isActive: true }];
}
