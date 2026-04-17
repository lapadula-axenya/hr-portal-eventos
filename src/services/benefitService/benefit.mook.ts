import {
  Benefit,
  BenefitActionType,
  BenefitMovimentationStatus,
  BenefitStatus,
  BenefitType,
} from "./benefitService.type";

export const benefitMook: Benefit[] = [
  {
    id: "benefit-1",
    name: "Especial 100 - Apartamento",
    provider: "Sulamerica",
    cardNumber: "990 9023 993 - 90",
    type: BenefitType.HEALTH,
    status: BenefitStatus.ACTIVE,
    actions: [
      {
        id: "9b1b8baf-7633-4b2a-a817-4cde9f4db8c2",
        type: BenefitActionType.INCLUSION,
        createdAt: "2025-08-01",
        movimentations: [
          {
            id: "1a3b4c5d-6e7f-4890-a123-b4567890abcd",
            message: "Aguardando a aprovação da operadora",
            status: BenefitMovimentationStatus.REQUESTED,
            updatedAt: "2025-08-02",
          },
          {
            id: "2b4d6f8a-9c0e-4f1a-8d7e-5a6b7c8d9e0f",
            message: "Aguardando a aprovação da operadora",
            status: BenefitMovimentationStatus.IN_PROGRESS,
            updatedAt: "2025-08-03",
          },
          {
            id: "3c5e7g9h-1i2j-4k3l-8m9n-0o1p2q3r4s5t",
            message: "Aguardando a aprovação da operadora",
            status: BenefitMovimentationStatus.COMPLETED,
            updatedAt: "2025-08-04",
          },
        ],
      },
      {
        id: "c6d7e8f9-a0b1-4c2d-9e3f-4g5h6i7j8k9l",
        type: BenefitActionType.EXCLUSION,
        createdAt: "2025-08-02",
        movimentations: [
          {
            id: "4d6f8a9b-0c1d-4e2f-9g3h-4i5j6k7l8m9n",
            message: "Aguardando a aprovação da operadora",
            status: BenefitMovimentationStatus.REQUESTED,
            updatedAt: "2025-08-02",
          },
        ],
      },
    ],
  },
  {
    id: "benefit-2",
    name: "Especial 100 - Apartamento",
    provider: "Sulamerica",
    cardNumber: "990 9023 993 - 90",
    type: BenefitType.DENTAL,
    status: BenefitStatus.ACTIVE,
    actions: [
      {
        id: "e8f9a0b1-c2d3-4e5f-9g6h-7i8j9k0l1m2n",
        type: BenefitActionType.INCLUSION,
        createdAt: "2025-08-01",
        movimentations: [
          {
            id: "7g9h1i2j-3k4l-5m6n-0o1p-2q3r4s5t6u7v",
            message: "Aguardando a aprovação da operadora",
            status: BenefitMovimentationStatus.REQUESTED,
            updatedAt: "2025-08-02",
          },
          {
            id: "8h0i2j3k-4l5m-6n7o-1p2q-3r4s5t6u7v8w",
            message: "Aguardando a aprovação da operadora",
            status: BenefitMovimentationStatus.IN_PROGRESS,
            updatedAt: "2025-08-03",
          },
          {
            id: "9i1j3k4l-5m6n-7o8p-2q3r-4s5t6u7v8w9x",
            message: "Aguardando a aprovação da operadora",
            status: BenefitMovimentationStatus.PENDING,
            updatedAt: "2025-08-04",
          },
        ],
      },
      {
        id: "f9a0b1c2-d3e4-5f6g-9h7i-8j9k0l1m2n3o",
        type: BenefitActionType.CHANGE,
        createdAt: "2025-08-01",
        movimentations: [
          {
            id: "0j2k4l5m-6n7o-8p9q-3r4s-5t6u7v8w9x0y",
            message: "Aguardando a aprovação da operadora",
            status: BenefitMovimentationStatus.REQUESTED,
            updatedAt: "2025-08-02",
          },
        ],
      },
    ],
  },
];
