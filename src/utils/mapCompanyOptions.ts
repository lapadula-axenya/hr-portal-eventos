import { SelectOption } from "@/components";
import { Company } from "@/services/companyService";
import { maskCnpj } from "./maskCnpj";

export function mapCompanyOptions(companies: Company[]): SelectOption[] {
  return companies.map((item) => ({
    value: item.id,
    label: item.name,
    subtitle: maskCnpj(item.document),
  }));
}
