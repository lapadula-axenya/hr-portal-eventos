import { StatusDotColor } from "@/components";
import { BenefitMovimentationStatus } from "@/services/benefitService";

export const benefitMovimentationStatusColor: Record<
  BenefitMovimentationStatus,
  StatusDotColor
> = {
  [BenefitMovimentationStatus.COMPLETED]: StatusDotColor.SUCCESS,
  [BenefitMovimentationStatus.IN_PROGRESS]: StatusDotColor.WARNING,
  [BenefitMovimentationStatus.PENDING]: StatusDotColor.ERROR,
  [BenefitMovimentationStatus.REQUESTED]: StatusDotColor.GREY,
} as const;
