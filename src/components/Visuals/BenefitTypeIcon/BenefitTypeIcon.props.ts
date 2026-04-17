import { LucideProps } from "lucide-react";
import { BenefitType } from "@/services/benefitService";

export type BenefitTypeIconProps = LucideProps & {
  type: BenefitType;
};
