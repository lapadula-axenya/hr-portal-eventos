import { useMemo } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { ChevronRightIcon } from "lucide-react";
import { AthenaPanel, BenefitTypeIcon, StatusDot } from "@/components";
import { benefitMovimentationStatusColor } from "@/constants/benefitMovimentationStatusColor";
import { useTicketParamsContext } from "@/contexts/TicketParamsContext";
import { AthenaEntityContext } from "@/services/athenaService";
import { BeneficiaryTypeTranslate } from "@/services/beneficiaryService";
import {
  BenefitActionTypeTranslate,
  BenefitMovimentationStatusTranslate,
  BenefitTypeTranslate,
} from "@/services/benefitService";
import { formatDate } from "@/utils/formatDate";
import { smartNameCase } from "@/utils/smartNameCase";

export function MainMovimentationsModalStepTicket() {
  const { modalTicket, setModalBenefitCardTicket } = useTicketParamsContext();

  const athenaContext = useMemo<AthenaEntityContext | undefined>(() => {
    if (!modalTicket) return undefined;

    const beneficiaryType = modalTicket.beneficiary?.type
      ? BeneficiaryTypeTranslate[modalTicket.beneficiary.type]
      : undefined;

    return {
      type: "movimentacao",
      id: modalTicket.id,
      label: modalTicket.beneficiary?.name,
      data: {
        beneficiario: {
          nome: modalTicket.beneficiary?.name,
          tipo: beneficiaryType,
          matricula: modalTicket.beneficiary?.enrollmentNumber,
        },
        tickets: modalTicket.tickets.map((ticket) => ({
          id: ticket.id,
          beneficio: ticket.benefitType
            ? BenefitTypeTranslate[ticket.benefitType]
            : undefined,
          tipoMovimentacao: ticket.benefitActionType
            ? BenefitActionTypeTranslate[ticket.benefitActionType]
            : undefined,
          status: ticket.status
            ? BenefitMovimentationStatusTranslate[ticket.status]
            : undefined,
          criadoEm: ticket.createdAt,
          atualizadoEm: ticket.updatedAt,
        })),
      },
    };
  }, [modalTicket]);

  return (
    <Stack spacing="2rem">
      <Stack>
        <Typography variant="subtitle1" fontWeight={700}>
          Detalhes movimentações
        </Typography>

        <Typography color="grey.300">
          {smartNameCase(modalTicket?.beneficiary?.name)} (
          {modalTicket?.beneficiary?.type
            ? BeneficiaryTypeTranslate[modalTicket?.beneficiary?.type]
            : ""}
          )
        </Typography>
      </Stack>

      <AthenaPanel context={athenaContext} />

      <Stack spacing="20px">
        <Typography variant="subtitle1" fontWeight={700}>
          Benefícios em Movimentação:
        </Typography>

        <Stack spacing="20px" color="grey.100">
          {modalTicket?.tickets.map((ticket) => (
            <Card key={ticket.id} sx={{ borderRadius: "8px" }}>
              <CardActionArea onClick={() => setModalBenefitCardTicket(ticket)}>
                <CardContent>
                  <Stack direction="row" spacing="10px" width="100%">
                    <Stack color="grey.100">
                      {ticket?.benefitType && (
                        <BenefitTypeIcon type={ticket.benefitType} />
                      )}
                    </Stack>

                    <Stack spacing="16px">
                      <Stack>
                        {ticket?.benefitType && (
                          <Typography
                            variant="body2"
                            color="grey.100"
                            fontWeight={700}
                          >
                            {BenefitTypeTranslate[ticket.benefitType]}
                          </Typography>
                        )}

                        {ticket?.benefitActionType && (
                          <Typography variant="caption" color="grey.300">
                            {
                              BenefitActionTypeTranslate[
                                ticket.benefitActionType
                              ]
                            }
                          </Typography>
                        )}

                        <Typography variant="caption" color="grey.300">
                          Criação: {formatDate(ticket.createdAt)}
                        </Typography>
                      </Stack>

                      {ticket?.status && (
                        <Stack direction="row" spacing="10px">
                          <Stack>
                            <StatusDot
                              color={
                                benefitMovimentationStatusColor[ticket.status]
                              }
                            />
                          </Stack>

                          <Stack color="grey.100">
                            <Typography variant="body2" fontWeight={700}>
                              {
                                BenefitMovimentationStatusTranslate[
                                  ticket.status
                                ]
                              }
                            </Typography>

                            <Typography variant="caption">
                              Atualização: {formatDate(ticket.updatedAt)}
                            </Typography>
                          </Stack>
                        </Stack>
                      )}
                    </Stack>

                    <Stack flexGrow={1}>
                      <Stack
                        component={ChevronRightIcon}
                        margin="0 0 auto auto"
                      />
                    </Stack>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
