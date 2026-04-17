import {
  BeneficiaryAPI,
  BeneficiaryStatus,
  BeneficiarySubscriberType,
  BeneficiarySummary,
  BeneficiaryType,
} from "@/services/beneficiaryService";
import {
  Benefit,
  BenefitCardProductTypeToBenefitType,
  BenefitStatus,
} from "@/services/benefitService";
import { mapTicketTopAction } from "./mapTicketTopAction";

export function mapBeneficiaryApiToSummary(
  beneficiary: BeneficiaryAPI,
): BeneficiarySummary {
  const status = beneficiary?.isBeneficiaryActive
    ? BeneficiaryStatus.ACTIVE
    : BeneficiaryStatus.INACTIVE;

  const type =
    beneficiary?.subscriberType === BeneficiarySubscriberType.HOLDER
      ? BeneficiaryType.HOLDER
      : BeneficiaryType.DEPENDENT;

  const benefitCards = beneficiary?.benefitCards ?? [];

  const benefits: Benefit[] = benefitCards.map((card) => {
    const { benefit } = card;

    const actions = mapTicketTopAction(card?.tickets);

    return {
      id: card?.id ?? "",
      name: [benefit?.planLevel, benefit?.accommodationType]
        .filter(Boolean)
        .join(" - "),
      cardNumber: card?.cardNumber,
      provider: benefit?.provider,
      type: benefit?.productType
        ? BenefitCardProductTypeToBenefitType[benefit.productType]
        : undefined,
      actions,
      status: card?.isActive ? BenefitStatus.ACTIVE : BenefitStatus.INACTIVE,
    };
  });

  return {
    id: beneficiary?.bid ?? "",
    name: beneficiary?.name ?? "",
    enrollmentNumber: beneficiary?.enrollmentNumber,
    document: beneficiary?.document ?? "",
    company: beneficiary?.subestipulant,
    benefits,
    status,
    type,
  };
}
