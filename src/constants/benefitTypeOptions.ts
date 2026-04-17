import { SelectOption } from "@/components";
import { BenefitType, BenefitTypeTranslate } from "@/services/benefitService";
import { benefitTypeIcons } from "./benefitTypeIcons";

export const benefitTypeOptions: SelectOption[] = Object.entries(
  BenefitTypeTranslate,
).map(([value, label]) => ({
  value,
  label,
  icon: benefitTypeIcons[value as BenefitType],
}));
