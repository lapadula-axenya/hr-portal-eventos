export enum BenefitStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum BenefitStatusTranslate {
  ACTIVE = "Ativo",
  INACTIVE = "Inativo",
}

export enum BenefitType {
  HEALTH = "HEALTH",
  DENTAL = "DENTAL",
  LIFE = "LIFE",
}

export enum BenefitTypeTranslate {
  HEALTH = "Plano de Saúde",
  DENTAL = "Odontológico",
  LIFE = "Seguro de Vida",
}

export enum BenefitMovimentationStatus {
  IN_PROGRESS = "IN_PROGRESS",
  REQUESTED = "REQUESTED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export enum BenefitMovimentationStatusTranslate {
  REQUESTED = "Solicitado",
  IN_PROGRESS = "Em andamento",
  PENDING = "Pendente",
  COMPLETED = "Concluído",
}

export enum BenefitActionType {
  CHANGE = "CHANGE",
  INCLUSION = "INCLUSION",
  EXCLUSION = "EXCLUSION",
}

export enum BenefitActionTypeTranslate {
  CHANGE = "Alteração de plano",
  INCLUSION = "Inclusão",
  EXCLUSION = "Exclusão",
}

export type BenefitMovimentation = {
  id: string;
  status?: BenefitMovimentationStatus;
  updatedAt: string;
  message?: string;
};

export type BenefitAction = {
  id: string;
  type?: BenefitActionType;
  movimentations: BenefitMovimentation[];
  createdAt: string;
};

export type Benefit = {
  id: string;
  type?: BenefitType;
  status?: BenefitStatus;
  cardNumber?: string;
  name?: string;
  actions: BenefitAction[];
  createdAt?: string;
  updatedAt?: string;
  provider?: string;
};

export enum BenefitCardProductType {
  HEALTH = "saude",
  DENTAL = "odonto",
  HEALTH_DETAL = "saude_odonto",
  HEALTH_ALT = "Saúde",
  DENTAL_ALT = "Odonto",
  HEALTH_DETAL_ALT = "saúde + odonto",
  LIFE = "Seguro de Vida",
}

export const BenefitCardProductTypeToBenefitType: Record<
  BenefitCardProductType,
  BenefitType
> = {
  saude: BenefitType.HEALTH,
  Saúde: BenefitType.HEALTH,
  odonto: BenefitType.DENTAL,
  Odonto: BenefitType.DENTAL,
  saude_odonto: BenefitType.HEALTH,
  "saúde + odonto": BenefitType.HEALTH,
  "Seguro de Vida": BenefitType.LIFE,
};

export type BenefitCardBenefitPolicy = {
  id?: string;
  contractCode?: string;
  companyDocument?: string;
  subCompanyDocument?: string;
  companyName?: string;
};

export type BenefitCardBenefit = {
  id?: string;
  accommodationType?: string;
  planLevel?: string;
  policy: BenefitCardBenefitPolicy;
  productType?: BenefitCardProductType;
  provider?: string;
  isActive?: boolean;
};

export type BenefitCard = {
  id?: string;
  benefit?: BenefitCardBenefit;
  cardNumber?: string;
  productType?: BenefitCardProductType;
  isActive?: boolean;
  isBeingCreated?: boolean;
  tickets: BenefitCardTicket[];
};

export enum TicketOperationType {
  INCLUSION = "inclusao",
  REACTIVATION = "Reativação",
  PLAN_EXTENSION = "Extensão de plano",
  BENEFIT_CHANGE = "Alteracao_beneficio",
  REGISTRATION_CHANGE = "Alteracao_Cadastral",
  BENEFIT_DELETION = "exclusao_beneficio",
  BENEFICIARY_DELETION = "exclusao_beneficiario",
}

export type BenefitCardTicket = {
  id?: string;
  bid?: string;
  benefit: BenefitCardBenefit[];
  cardNumber?: string;
  dentalCardNumber?: string;
  healthCardNumber?: string;
  provider?: string;
  productType?: BenefitCardProductType;
  operationType?: TicketOperationType;
  subscriberType?: string;
  dentalBenefitName?: string;
  healthBenefitName?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: BenefitMovimentationStatus;
  timeLine?: TimeLineEvent[];
  benefitType?: BenefitType;
  benefitActionType?: BenefitActionType;
};

export type TimeLineEvent = {
  status?: BenefitMovimentationStatus;
  date?: string;
};

export type BeneficiaryMovementFileErrorsRow = {
  column: string;
  value: string;
  errorDescription: string;
};

export type BeneficiaryMovementFileErrors = {
  line: number;
  errors: BeneficiaryMovementFileErrorsRow[];
};

/*

[
  {
    "line": 6,
    "errors": [
      { "column": "CPF DO BENEFICIÁRIO", "value": "123.456.789", "errorDescription": "cpf deve ser um CPF válido" },
      { "column": "DATA FIM DE VIGÊNCIA", "value": "27/10/2025", "errorDescription": "Informe uma data válida..." }
    ]
  }
]

*/
