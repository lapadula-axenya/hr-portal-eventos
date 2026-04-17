import { BenefitTypeIconProps } from "@/components";
import { benefitTypeIcons } from "@/constants/benefitTypeIcons";
import { BenefitTypeTranslate } from "@/services/benefitService";

export function BenefitTypeIcon({ type, ...props }: BenefitTypeIconProps) {
  const IconComponent = benefitTypeIcons[type];
  const translatedType = BenefitTypeTranslate[type];

  return <IconComponent size={18} {...props} aria-label={translatedType} />;
}
