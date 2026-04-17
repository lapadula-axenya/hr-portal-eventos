import { SelectOption } from "@/components";
import { BenefitMovimentationStatusTranslate } from "@/services/benefitService";

export const benefitMovimentationStatusOptions: SelectOption[] = Object.entries(
  BenefitMovimentationStatusTranslate,
).map(([value, label]) => ({
  value,
  label,
}));
