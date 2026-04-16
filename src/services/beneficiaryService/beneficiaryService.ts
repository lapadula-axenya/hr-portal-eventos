import { ApiResponse, GetAllParamsDefault } from "@/types/apiResponse";
import { mapBeneficiaryApiToDetail } from "@/utils/mapBeneficiaryApiToDetail";
import { beneficiaryMock } from "./beneficiary.mock";
import {
  BeneficiaryAPI,
  BeneficiaryFilter,
  BeneficiarySubscriberType,
  Dependent,
} from "./beneficiaryService.type";

export async function getBeneficiary(beneficiaryId: string) {
  const found = beneficiaryMock.find((b) => b.bid === beneficiaryId);
  const data = found ?? beneficiaryMock[0];
  return mapBeneficiaryApiToDetail(data);
}

export async function getAllBeneficiaries(
  params?: GetAllParamsDefault<BeneficiaryFilter>,
): Promise<ApiResponse<BeneficiaryAPI>> {
  const page = (params as Record<string, unknown>)?.["page"] as number ?? 1;
  const limit = (params as Record<string, unknown>)?.["limit"] as number ?? 10;
  const term = ((params as Record<string, unknown>)?.["searchableTerm"] as string ?? "").toLowerCase();
  const subscriberType = (params as Record<string, unknown>)?.["subscriberType"] as string | undefined;

  let filtered = beneficiaryMock;

  if (term) {
    filtered = filtered.filter(
      (b) =>
        b.name?.toLowerCase().includes(term) ||
        b.document?.includes(term) ||
        b.enrollmentNumber?.toLowerCase().includes(term),
    );
  }

  if (subscriberType) {
    filtered = filtered.filter((b) =>
      subscriberType === "HOLDER"
        ? b.subscriberType === BeneficiarySubscriberType.HOLDER
        : b.subscriberType === BeneficiarySubscriberType.DEPENDENT,
    );
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / limit);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return {
    data,
    meta: { itemsPerPage: limit, totalItems, currentPage: page, totalPages },
  };
}

export async function getDependents(holderId: string): Promise<Dependent[]> {
  return beneficiaryMock
    .filter((b) => b.holder?.bid === holderId)
    .map((b) => ({
      bid: b.bid,
      name: b.name,
      dependencyRelation: b.dependencyRelation,
    }));
}
