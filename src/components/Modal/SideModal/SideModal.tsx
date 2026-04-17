import { forwardRef, ReactElement, Ref } from "react";
import { Box, Dialog, IconButton, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { CircleAlertIcon, XIcon } from "lucide-react";
import {
  sideModalContainerStyles,
  sideModalHeaderCloseButtonIconStyles,
  sideModalHeaderStyles,
  sideModalScrollBox,
  SideModalProps,
  sideModalBorderStyles,
  CenterContainer,
  sideModalHeaderMessageStyles,
  sideModalHeaderMessageIconBoxStyles,
  sideModalHeaderMessageIconStyles,
  LoadingContainer,
} from "@/components";

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement },
  ref: Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export function SideModal({
  children,
  isEmpty,
  isError,
  isLoading,
  onClose,
  open,
}: SideModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slots={{
        transition: Transition,
      }}
      sx={sideModalContainerStyles}
    >
      <Box {...sideModalBorderStyles} />

      <Box {...sideModalHeaderStyles}>
        <IconButton onClick={onClose}>
          <XIcon {...sideModalHeaderCloseButtonIconStyles} />
        </IconButton>
      </Box>

      <Box {...sideModalScrollBox}>
        {!isLoading && !isEmpty && !isError && children}

        {isLoading && <LoadingContainer />}

        {isError && !isLoading && (
          <CenterContainer>
            <Box {...sideModalHeaderMessageIconBoxStyles}>
              <CircleAlertIcon {...sideModalHeaderMessageIconStyles} />
            </Box>
            <Typography {...sideModalHeaderMessageStyles}>
              Não foi possível carregar as informações. Tente novamente.
            </Typography>
          </CenterContainer>
        )}

        {isEmpty && !isError && (
          <CenterContainer>
            <Typography {...sideModalHeaderMessageStyles}>
              Nenhuma informação encontrada.
            </Typography>
          </CenterContainer>
        )}
      </Box>
    </Dialog>
  );
}
