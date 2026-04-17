import { SelectOption } from "@/components";
import { BenefitActionTypeTranslate } from "@/services/benefitService";

export const benefitActionTypeOptions: SelectOption[] = Object.entries(
  BenefitActionTypeTranslate,
).map(([value, label]) => ({
  value,
  label,
}));
