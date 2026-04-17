import { useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon, ChevronRightIcon } from "lucide-react";
import { BenefitTypeIcon, LoadingContainer, StatusDot } from "@/components";
import { benefitMovimentationStatusColor } from "@/constants/benefitMovimentationStatusColor";
import { useBeneficiaryParamsContext } from "@/contexts/BeneficiaryParamsContext";
import { QueryKey } from "@/enums/QueryKey";
import { useTicketByBenefitCardQuery } from "@/queries/useTicketByBenefitCardQuery";
import {
  BenefitActionTypeTranslate,
  BenefitMovimentationStatusTranslate,
  BenefitStatus,
  BenefitStatusTranslate,
  BenefitTypeTranslate,
} from "@/services/benefitService";
import { findMostRecent } from "@/utils/findMostRecent";
import { formatDate } from "@/utils/formatDate";
import { mapTicketTopAction } from "@/utils/mapTicketTopAction";
import { smartNameCase } from "@/utils/smartNameCase";
import { MainRegistrationStatusModalStepBenefitProps } from ".";

export function MainRegistrationStatusModalStepBenefit({
  beneficiary,
  benefit,
}: MainRegistrationStatusModalStepBenefitProps) {
  const queryClient = useQueryClient();

  const { modalBenefitId, setModalActionId, setModalBenefitId } =
    useBeneficiaryParamsContext();

  const { isTicketsEmpty, isTicketsError, isTicketsLoading, tickets } =
    useTicketByBenefitCardQuery(modalBenefitId);

  const actions = useMemo(() => {
    return mapTicketTopAction(tickets);
  }, [tickets]);

  const handleReloadTickets = async () => {
    await queryClient.invalidateQueries({
      queryKey: [QueryKey.TICKET_BENEFIT_CARD],
    });
  };

  return (
    <Stack spacing="46px">
      <Stack direction="row" spacing="10px">
        <Stack
          direction="row"
          color="white"
          spacing="4px"
          height="max-content"
          alignItems="center"
        >
          <Box>
            <IconButton onClick={() => setModalBenefitId("")} size="small">
              <ArrowLeftIcon size={14} />
            </IconButton>
          </Box>

          {benefit?.type && <BenefitTypeIcon type={benefit.type} />}
        </Stack>

        <Stack spacing="20px">
          <Stack>
            {benefit?.type && (
              <Typography variant="subtitle1" fontWeight={700}>
                {BenefitTypeTranslate[benefit?.type]}
              </Typography>
            )}

            <Typography color="grey.300">
              {smartNameCase(beneficiary?.name)}
            </Typography>
          </Stack>

          <Stack color="grey.300" spacing="4px">
            <Typography variant="body2" fontWeight={700}>
              {benefit?.provider}
            </Typography>
            <Typography variant="body2">{benefit?.name}</Typography>
            <Typography variant="body2">
              Nº Carteirinha: {benefit?.cardNumber}
            </Typography>
            {benefit?.status && (
              <Typography variant="body2">
                Status:{" "}
                <Typography
                  {...(benefit.status === BenefitStatus.ACTIVE && {
                    color: "primary.main",
                  })}
                  variant="body2"
                  component="span"
                  fontWeight={700}
                >
                  {BenefitStatusTranslate[benefit.status]}
                </Typography>
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>

      {isTicketsLoading && <LoadingContainer />}

      {isTicketsError && (
        <>
          <Typography variant="body2" color="grey.100" mb="0.5rem">
            Não conseguimos carregar os tickets do beneficiário.
          </Typography>
          <Typography variant="body2" color="grey.100" mb="1.5rem">
            Tente novamente mais tarde ou clique no botão abaixo para
            recarregar.
          </Typography>
          <Button onClick={handleReloadTickets}>Recarregar tickets</Button>
        </>
      )}

      {isTicketsEmpty && !isTicketsError && (
        <Typography variant="body2" color="grey.100">
          Nenhum ticket encontrado para o beneficiário.
        </Typography>
      )}

      {!isTicketsLoading && !isTicketsEmpty && (
        <Stack spacing="20px">
          {actions?.map((action) => {
            const movimentation = findMostRecent(
              action.movimentations,
              "updatedAt",
            );

            return (
              <Card key={action.id} sx={{ borderRadius: "8px" }}>
                <CardActionArea onClick={() => setModalActionId(action.id)}>
                  <CardContent>
                    <Stack direction="row">
                      <Stack spacing="16px">
                        <Stack spacing="5px">
                          {action.type && (
                            <Typography
                              variant="body2"
                              color="grey.100"
                              fontWeight={700}
                            >
                              {BenefitActionTypeTranslate[action.type]}
                            </Typography>
                          )}
                          <Typography variant="caption" color="grey.300">
                            Criação: {formatDate(action.createdAt)}
                          </Typography>
                        </Stack>

                        {movimentation?.status && (
                          <Stack direction="row" spacing="10px">
                            <Stack>
                              <StatusDot
                                color={
                                  benefitMovimentationStatusColor[
                                    movimentation.status
                                  ]
                                }
                              />
                            </Stack>

                            <Stack color="grey.100">
                              <Typography variant="body2" fontWeight={700}>
                                {
                                  BenefitMovimentationStatusTranslate[
                                    movimentation.status
                                  ]
                                }
                              </Typography>
                              <Typography variant="caption">
                                Atualização:{" "}
                                {formatDate(movimentation?.updatedAt)}
                              </Typography>
                            </Stack>
                          </Stack>
                        )}
                      </Stack>

                      <Stack
                        component={ChevronRightIcon}
                        margin="0 0 auto auto"
                      />
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
