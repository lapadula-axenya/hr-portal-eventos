import {
  ApiResponse,
  ApiResponseMeta,
  GetAllParamsDefault,
} from "@/types/apiResponse";
import { Provider, ProviderFilter } from ".";
import { providersMock } from "./providerService.mock";

/**
 * Temporary mock implementation of getAllProviders
 * with simulated API delay for development purposes.
 */
export async function getAllProviders(
  params?: GetAllParamsDefault<ProviderFilter>,
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const itemsPerPage = 10;
  const currentPage = params?.page ?? 1;

  const filteredData: Provider[] = providersMock;

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const data = filteredData.slice(startIndex, endIndex);

  const meta: ApiResponseMeta = {
    itemsPerPage,
    totalItems,
    currentPage,
    totalPages,
  };

  const response: ApiResponse<Provider> = {
    data,
    meta,
  };

  return response;
}
