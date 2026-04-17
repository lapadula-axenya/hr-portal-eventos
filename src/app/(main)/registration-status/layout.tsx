import { PropsWithChildren } from "react";
import { BeneficiaryParamsProvider } from "@/contexts/BeneficiaryParamsContext";

export default function MainRegistrationStatusLayout({
  children,
}: PropsWithChildren) {
  return <BeneficiaryParamsProvider>{children}</BeneficiaryParamsProvider>;
}
