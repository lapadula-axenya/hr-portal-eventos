import { QueryKey } from "@/enums/QueryKey";
import { getAllInvoices, InvoiceFilter } from "@/services/invoiceService";
import { BaseQueryParams, useBaseQuery } from "./useBaseQuery";

export function useInvoicesQuery(props?: BaseQueryParams<InvoiceFilter>) {
  return useBaseQuery({
    queryKey: QueryKey.INVOICES,
    queryFn: getAllInvoices,
    ...props,
  });
}
