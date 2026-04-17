import { BrandLogo, CenterContainer, loadingScreenStyles } from "@/components";

export function LoadingScreen() {
  return (
    <CenterContainer {...loadingScreenStyles}>
      <BrandLogo />
    </CenterContainer>
  );
}
