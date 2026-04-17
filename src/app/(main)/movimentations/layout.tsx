import { PropsWithChildren } from "react";
import { TicketParamsProvider } from "@/contexts/TicketParamsContext";

export default function MainMovimentationsLayout({
  children,
}: PropsWithChildren) {
  return <TicketParamsProvider>{children}</TicketParamsProvider>;
}
