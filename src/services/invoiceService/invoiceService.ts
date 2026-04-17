import {
  ApiResponse,
  ApiResponseMeta,
  GetAllParamsDefault,
} from "@/types/apiResponse";
import { invoicesMock } from "./invoice.mock";
import { Invoice, InvoiceFilter } from "./invoiceService.type";

/**
 * Temporary mock implementation of getAllInvoices
 * with simulated API delay for development purposes.
 */
export async function getAllInvoices(
  params?: GetAllParamsDefault<InvoiceFilter>,
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log(params);

  const meta: ApiResponseMeta = {
    itemsPerPage: 10,
    totalItems: 10,
    currentPage: 1,
    totalPages: 1,
  };

  const response: ApiResponse<Invoice> = {
    data: invoicesMock,
    meta,
  };

  return response;
}
