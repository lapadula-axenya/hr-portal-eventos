import { PropsWithChildren } from "react";
import { InvoiceParamsProvider } from "@/contexts/InvoiceParamsContext";

export default function MainInvoicesLayout({ children }: PropsWithChildren) {
  return <InvoiceParamsProvider>{children}</InvoiceParamsProvider>;
}
