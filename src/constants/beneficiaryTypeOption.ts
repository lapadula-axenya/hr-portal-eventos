import { SelectOption } from "@/components";
import { BeneficiaryTypeTranslate } from "@/services/beneficiaryService";

export const beneficiaryTypeOptions: SelectOption[] = Object.entries(
  BeneficiaryTypeTranslate,
).map(([value, label]) => ({ value, label }));
