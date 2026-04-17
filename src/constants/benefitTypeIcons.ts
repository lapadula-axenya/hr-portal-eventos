import { HeartIcon, LucideIcon, ShieldPlusIcon, SmileIcon } from "lucide-react";
import { BenefitType } from "@/services/benefitService";

export const benefitTypeIcons: Record<BenefitType, LucideIcon> = {
  [BenefitType.HEALTH]: HeartIcon,
  [BenefitType.DENTAL]: SmileIcon,
  [BenefitType.LIFE]: ShieldPlusIcon,
} as const;
