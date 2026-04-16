import {
  BenefitCardProductType,
  BenefitMovimentationStatus,
  BenefitActionType,
  TicketOperationType,
} from "../benefitService";
import { BeneficiaryType } from "../beneficiaryService";
import { Ticket } from "./ticketService.type";

export const ticketsMock: Ticket[] = [
  {
    id: "mov-001",
    beneficiary: { id: "ben-001", name: "Carlos Eduardo Souza", enrollmentNumber: "ACM-00001", type: BeneficiaryType.HOLDER, document: "123.456.789-00" },
    tickets: [{
      id: "tkt-001", bid: "ben-001", benefit: [], cardNumber: "4001 2345 6789",
      healthCardNumber: "4001 2345 6789", provider: "Amil",
      productType: BenefitCardProductType.HEALTH, operationType: TicketOperationType.INCLUSION,
      subscriberType: "titular", healthBenefitName: "Plano Amil 400",
      createdAt: "2025-01-10T09:00:00Z", updatedAt: "2025-01-12T14:00:00Z",
      status: BenefitMovimentationStatus.COMPLETED, benefitActionType: BenefitActionType.INCLUSION,
      timeLine: [
        { status: BenefitMovimentationStatus.REQUESTED, date: "2025-01-10T09:00:00Z" },
        { status: BenefitMovimentationStatus.IN_PROGRESS, date: "2025-01-11T10:00:00Z" },
        { status: BenefitMovimentationStatus.COMPLETED, date: "2025-01-12T14:00:00Z" },
      ],
    }],
  },
  {
    id: "mov-002",
    beneficiary: { id: "ben-011", name: "Sofia Souza", enrollmentNumber: "ACM-00011", type: BeneficiaryType.DEPENDENT, document: "111.222.333-01" },
    tickets: [{
      id: "tkt-002", bid: "ben-011", benefit: [], cardNumber: "4001 2345 6790",
      healthCardNumber: "4001 2345 6790", provider: "Amil",
      productType: BenefitCardProductType.HEALTH, operationType: TicketOperationType.INCLUSION,
      subscriberType: "dependente", healthBenefitName: "Plano Amil 400",
      createdAt: "2025-01-10T09:00:00Z", updatedAt: "2025-01-12T14:00:00Z",
      status: BenefitMovimentationStatus.COMPLETED, benefitActionType: BenefitActionType.INCLUSION,
      timeLine: [
        { status: BenefitMovimentationStatus.REQUESTED, date: "2025-01-10T09:00:00Z" },
        { status: BenefitMovimentationStatus.COMPLETED, date: "2025-01-12T14:00:00Z" },
      ],
    }],
  },
  {
    id: "mov-003",
    beneficiary: { id: "ben-004", name: "Mariana Costa", enrollmentNumber: "ACM-00004", type: BeneficiaryType.HOLDER, document: "456.789.012-33" },
    tickets: [{
      id: "tkt-003", bid: "ben-004", benefit: [], cardNumber: "ODP-004-4567",
      dentalCardNumber: "ODP-004-4567", provider: "Odontoprev",
      productType: BenefitCardProductType.DENTAL, operationType: TicketOperationType.INCLUSION,
      subscriberType: "titular", dentalBenefitName: "Odontoprev Prime",
      createdAt: "2025-02-05T11:00:00Z", updatedAt: "2025-02-07T09:00:00Z",
      status: BenefitMovimentationStatus.COMPLETED, benefitActionType: BenefitActionType.INCLUSION,
      timeLine: [
        { status: BenefitMovimentationStatus.REQUESTED, date: "2025-02-05T11:00:00Z" },
        { status: BenefitMovimentationStatus.IN_PROGRESS, date: "2025-02-06T08:00:00Z" },
        { status: BenefitMovimentationStatus.COMPLETED, date: "2025-02-07T09:00:00Z" },
      ],
    }],
  },
  {
    id: "mov-004",
    beneficiary: { id: "ben-007", name: "Thiago Oliveira", enrollmentNumber: "ACM-00007", type: BeneficiaryType.HOLDER, document: "789.012.345-66" },
    tickets: [{
      id: "tkt-004", bid: "ben-007", benefit: [], cardNumber: "4001 6789 0123",
      healthCardNumber: "4001 6789 0123", provider: "Amil",
      productType: BenefitCardProductType.HEALTH, operationType: TicketOperationType.INCLUSION,
      subscriberType: "titular", healthBenefitName: "Plano Amil 400",
      createdAt: "2025-03-01T08:30:00Z", updatedAt: "2025-03-03T16:00:00Z",
      status: BenefitMovimentationStatus.IN_PROGRESS, benefitActionType: BenefitActionType.INCLUSION,
      timeLine: [
        { status: BenefitMovimentationStatus.REQUESTED, date: "2025-03-01T08:30:00Z" },
        { status: BenefitMovimentationStatus.IN_PROGRESS, date: "2025-03-02T10:00:00Z" },
      ],
    }],
  },
  {
    id: "mov-005",
    beneficiary: { id: "ben-003", name: "Roberto Alves", enrollmentNumber: "ACM-00003", type: BeneficiaryType.HOLDER, document: "345.678.901-22" },
    tickets: [{
      id: "tkt-005", bid: "ben-003", benefit: [], cardNumber: "4001 3456 7890",
      healthCardNumber: "4001 3456 7890", provider: "Amil",
      productType: BenefitCardProductType.HEALTH, operationType: TicketOperationType.BENEFIT_CHANGE,
      subscriberType: "titular", healthBenefitName: "Plano Amil 700 - Apartamento",
      createdAt: "2025-03-15T14:00:00Z", updatedAt: "2025-03-18T11:00:00Z",
      status: BenefitMovimentationStatus.COMPLETED, benefitActionType: BenefitActionType.CHANGE,
      timeLine: [
        { status: BenefitMovimentationStatus.REQUESTED, date: "2025-03-15T14:00:00Z" },
        { status: BenefitMovimentationStatus.IN_PROGRESS, date: "2025-03-16T09:00:00Z" },
        { status: BenefitMovimentationStatus.COMPLETED, date: "2025-03-18T11:00:00Z" },
      ],
    }],
  },
  {
    id: "mov-006",
    beneficiary: { id: "ben-009", name: "Gustavo Ferreira", enrollmentNumber: "ACM-00009", type: BeneficiaryType.HOLDER, document: "901.234.567-88" },
    tickets: [{
      id: "tkt-006", bid: "ben-009", benefit: [], cardNumber: "",
      provider: "Amil", productType: BenefitCardProductType.HEALTH,
      operationType: TicketOperationType.BENEFICIARY_DELETION,
      subscriberType: "titular", healthBenefitName: "Plano Amil 400",
      createdAt: "2025-02-20T10:00:00Z", updatedAt: "2025-02-22T15:00:00Z",
      status: BenefitMovimentationStatus.COMPLETED, benefitActionType: BenefitActionType.EXCLUSION,
      timeLine: [
        { status: BenefitMovimentationStatus.REQUESTED, date: "2025-02-20T10:00:00Z" },
        { status: BenefitMovimentationStatus.COMPLETED, date: "2025-02-22T15:00:00Z" },
      ],
    }],
  },
  {
    id: "mov-007",
    beneficiary: { id: "ben-010", name: "Larissa Pereira", enrollmentNumber: "ACM-00010", type: BeneficiaryType.HOLDER, document: "012.345.678-99" },
    tickets: [{
      id: "tkt-007", bid: "ben-010", benefit: [], cardNumber: "4001 8901 2345",
      healthCardNumber: "4001 8901 2345", provider: "Amil",
      productType: BenefitCardProductType.HEALTH, operationType: TicketOperationType.INCLUSION,
      subscriberType: "titular", healthBenefitName: "Plano Amil 400",
      createdAt: "2025-07-01T08:00:00Z", updatedAt: "2025-07-01T08:00:00Z",
      status: BenefitMovimentationStatus.REQUESTED, benefitActionType: BenefitActionType.INCLUSION,
      timeLine: [
        { status: BenefitMovimentationStatus.REQUESTED, date: "2025-07-01T08:00:00Z" },
      ],
    }],
  },
  {
    id: "mov-008",
    beneficiary: { id: "ben-019", name: "Rafael Pereira", enrollmentNumber: "ACM-00019", type: BeneficiaryType.DEPENDENT, document: "999.000.111-09" },
    tickets: [{
      id: "tkt-008", bid: "ben-019", benefit: [], cardNumber: "4001 2345 6797",
      healthCardNumber: "4001 2345 6797", provider: "Amil",
      productType: BenefitCardProductType.HEALTH, operationType: TicketOperationType.INCLUSION,
      subscriberType: "dependente", healthBenefitName: "Plano Amil 400",
      createdAt: "2025-07-01T08:00:00Z", updatedAt: "2025-07-02T10:00:00Z",
      status: BenefitMovimentationStatus.IN_PROGRESS, benefitActionType: BenefitActionType.INCLUSION,
      timeLine: [
        { status: BenefitMovimentationStatus.REQUESTED, date: "2025-07-01T08:00:00Z" },
        { status: BenefitMovimentationStatus.IN_PROGRESS, date: "2025-07-02T10:00:00Z" },
      ],
    }],
  },
  {
    id: "mov-009",
    beneficiary: { id: "ben-002", name: "Fernanda Lima", enrollmentNumber: "ACM-00002", type: BeneficiaryType.HOLDER, document: "234.567.890-11" },
    tickets: [{
      id: "tkt-009", bid: "ben-002", benefit: [], cardNumber: "4001 2345 6780",
      healthCardNumber: "4001 2345 6780", provider: "Amil",
      productType: BenefitCardProductType.HEALTH, operationType: TicketOperationType.REGISTRATION_CHANGE,
      subscriberType: "titular", healthBenefitName: "Plano Amil 400",
      createdAt: "2025-04-10T11:00:00Z", updatedAt: "2025-04-11T09:00:00Z",
      status: BenefitMovimentationStatus.COMPLETED, benefitActionType: BenefitActionType.CHANGE,
      timeLine: [
        { status: BenefitMovimentationStatus.REQUESTED, date: "2025-04-10T11:00:00Z" },
        { status: BenefitMovimentationStatus.COMPLETED, date: "2025-04-11T09:00:00Z" },
      ],
    }],
  },
  {
    id: "mov-010",
    beneficiary: { id: "ben-005", name: "Paulo Henrique Silva", enrollmentNumber: "ACM-00005", type: BeneficiaryType.HOLDER, document: "567.890.123-44" },
    tickets: [{
      id: "tkt-010", bid: "ben-005", benefit: [], cardNumber: "4001 4567 8901",
      healthCardNumber: "4001 4567 8901", provider: "Amil",
      productType: BenefitCardProductType.HEALTH, operationType: TicketOperationType.REACTIVATION,
      subscriberType: "titular", healthBenefitName: "Plano Amil 400",
      createdAt: "2025-05-20T09:00:00Z", updatedAt: "2025-05-22T14:00:00Z",
      status: BenefitMovimentationStatus.PENDING, benefitActionType: BenefitActionType.INCLUSION,
      timeLine: [
        { status: BenefitMovimentationStatus.REQUESTED, date: "2025-05-20T09:00:00Z" },
        { status: BenefitMovimentationStatus.PENDING, date: "2025-05-22T14:00:00Z" },
      ],
    }],
  },
  {
    id: "mov-011",
    beneficiary: { id: "ben-006", name: "Ana Beatriz Santos", enrollmentNumber: "ACM-00006", type: BeneficiaryType.HOLDER, document: "678.901.234-55" },
    tickets: [{
      id: "tkt-011", bid: "ben-006", benefit: [], cardNumber: "ODP-006-5678",
      dentalCardNumber: "ODP-006-5678", provider: "Odontoprev",
      productType: BenefitCardProductType.DENTAL, operationType: TicketOperationType.INCLUSION,
      subscriberType: "titular", dentalBenefitName: "Odontoprev Prime",
      createdAt: "2025-06-01T10:00:00Z", updatedAt: "2025-06-03T11:00:00Z",
      status: BenefitMovimentationStatus.COMPLETED, benefitActionType: BenefitActionType.INCLUSION,
      timeLine: [
        { status: BenefitMovimentationStatus.REQUESTED, date: "2025-06-01T10:00:00Z" },
        { status: BenefitMovimentationStatus.COMPLETED, date: "2025-06-03T11:00:00Z" },
      ],
    }],
  },
  {
    id: "mov-012",
    beneficiary: { id: "ben-008", name: "Juliana Martins", enrollmentNumber: "ACM-00008", type: BeneficiaryType.HOLDER, document: "890.123.456-77" },
    tickets: [{
      id: "tkt-012", bid: "ben-008", benefit: [],
      provider: "Amil", productType: BenefitCardProductType.HEALTH,
      operationType: TicketOperationType.BENEFIT_DELETION,
      subscriberType: "titular", healthBenefitName: "Plano Amil 400",
      createdAt: "2025-06-15T15:00:00Z", updatedAt: "2025-06-16T09:00:00Z",
      status: BenefitMovimentationStatus.REQUESTED, benefitActionType: BenefitActionType.EXCLUSION,
      timeLine: [
        { status: BenefitMovimentationStatus.REQUESTED, date: "2025-06-15T15:00:00Z" },
      ],
    }],
  },
];
