import { Button, Stack, Typography } from "@mui/material";
import { CircleCheckIcon, InfoIcon } from "lucide-react";
import { MainMovimentationsModalSendStepSuccessProps } from "./MainMovimentationsModalSendStepSuccess.props";

export function MainMovimentationsModalSendStepSuccess({
  fileName,
  onClose,
}: MainMovimentationsModalSendStepSuccessProps) {
  return (
    <Stack spacing="1.5rem" alignItems="center">
      <Stack color="primary.main">
        <CircleCheckIcon size={36} />
      </Stack>

      <Stack>
        <Typography variant="h4" fontWeight={700} textAlign="center">
          Arquivo enviado com sucesso!
        </Typography>
        <Typography variant="subtitle1" fontWeight={600} textAlign="center">
          Seu arquivo está na fila para processamento.
        </Typography>
      </Stack>

      <Typography color="grey.100" textAlign="center">
        Acompanhe o status pelo <b>ícone de notificações ou e-mail</b> para
        verificar a aprovação ou se há erros.
      </Typography>

      <Stack
        direction="row"
        bgcolor="grey.500"
        gap="0.5rem"
        padding="1rem"
        borderRadius="4px"
      >
        <Stack color="primary.main">
          <InfoIcon size={20} />
        </Stack>
        <Typography variant="caption">
          Seu arquivo será renomeado para <b>{fileName}</b>. Use este nome para
          acompanhar o status do processamento no sistema.
        </Typography>
      </Stack>

      <Button onClick={onClose}>Fechar</Button>
    </Stack>
  );
}
