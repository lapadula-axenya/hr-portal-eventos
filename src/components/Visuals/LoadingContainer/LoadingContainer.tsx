import { CircularProgress, StackProps } from "@mui/material";
import { CenterContainer } from "@/components";

export function LoadingContainer(props: StackProps) {
  return (
    <CenterContainer height={250} {...props}>
      <CircularProgress />
    </CenterContainer>
  );
}
