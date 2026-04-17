import { Benefit, BenefitCard } from "../benefitService";
import { Company } from "../companyService";

export enum BeneficiaryStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum BeneficiaryStatusTranslate {
  ACTIVE = "Ativo",
  INACTIVE = "Inativo",
}

export enum BeneficiaryType {
  HOLDER = "HOLDER",
  DEPENDENT = "DEPENDENT",
}

export enum BeneficiaryTypeTranslate {
  HOLDER = "Titular",
  DEPENDENT = "Dependente",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum GenderTranslate {
  MALE = "Masculino",
  FEMALE = "Feminino",
}

export type BeneficiarySummary = {
  id: string;
  name: string;
  status: BeneficiaryStatus;
  enrollmentNumber?: string;
  document: string;
  type: BeneficiaryType;
  company?: Company;
  benefits: Benefit[];
};

export type Beneficiary = BeneficiarySummary & {
  phone: string;
  birthday: string;
  age: number;
  gender: Gender;
  maritalStatus: string;
  admissionDate?: string;
  holder?: Holder;
  relationshipWithHolder?: string;
};

export enum BeneficiarySubscriberType {
  HOLDER = "titular",
  DEPENDENT = "dependente",
}

export enum BeneficiaryAPIGender {
  MALE = "Masculino",
  FEMALE = "Feminino",
}

export type BeneficiaryAPI = {
  bid?: string;
  name?: string;
  admissionDate?: string;
  birthDate?: string;
  dependencyRelation?: string;
  document?: string;
  enrollmentNumber?: string;
  isBeneficiaryActive?: boolean;
  gender?: BeneficiaryAPIGender;
  maritalStatus?: string;
  phone?: string;
  subscriberType?: BeneficiarySubscriberType;
  company?: Company;
  subestipulant?: Company;
  benefitCards?: BenefitCard[];
  holder?: Holder;
};

export type Holder = {
  bid?: string;
  name?: string;
};

export type BeneficiaryFilter = {
  searchableTerm?: string;
  subscriberType?: string;
  benefitType?: string[];
  subestipulantId?: string[];
};

export type Dependent = {
  bid?: string;
  name?: string;
  dependencyRelation?: string;
};
