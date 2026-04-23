"use client";

import { ButtonBase, Stack, Tooltip, Typography } from "@mui/material";
import {
  BenefitTypeIcon,
  EllipsisText,
  StatusDot,
  PageContainer,
  PageTable,
  PageTableSingleTextCell,
} from "@/components";
import { benefitMovimentationStatusColor } from "@/constants/benefitMovimentationStatusColor";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { useTicketParamsContext } from "@/contexts/TicketParamsContext";
import { useTicketsQuery } from "@/queries/useTicketsQuery";
import { BeneficiaryTypeTranslate } from "@/services/beneficiaryService";
import {
  BenefitActionTypeTranslate,
  BenefitCardTicket,
  BenefitMovimentationStatusTranslate,
  BenefitTypeTranslate,
} from "@/services/benefitService";
import { Ticket, TicketFilterSortBy } from "@/services/ticketService";
import { formatDate } from "@/utils/formatDate";
import { maskCpf } from "@/utils/maskCpf";
import { smartNameCase } from "@/utils/smartNameCase";
import { MainMovimentationsAppendSlot } from "./_components/MainMovimentationsAppendSlot";
import { MainMovimentationsHeaderSlot } from "./_components/MainMovimentationsHeaderSlot";
import { MainMovimentationsModal } from "./_components/MainMovimentationsModal";
import { MainMovimentationsModalSend } from "./_components/MainMovimentationsModalSend";
import { MainMovimentationsSortableTitle } from "./_components/MainMovimentationsSortableTitle/MainMovimentationsSortableTitle";

export default function MainMovimentationsPage() {
  const { openSnackbar } = useSnackbarContext();

  const {
    changePage,
    modalTicket,
    page,
    setModalBenefitCardTicket,
    setModalTicket,
    ticketParams,
  } = useTicketParamsContext();

  const { isTicketsEmpty, isTicketsLoading, tickets, ticketsMeta } =
    useTicketsQuery({
      params: ticketParams,
    });

  const handleRowClick = (ticket?: Ticket) => {
    if (!ticket?.id) {
      openSnackbar({
        title: "Erro ao abrir detalhes da movimentação",
        text: "Não foi possível abrir os detalhes da movimentação. Tente novamente.",
        type: "error",
      });
      return;
    }

    setModalTicket(ticket);
  };

  const handleClickBenefit = (ticket?: Ticket, benefit?: BenefitCardTicket) => {
    setModalTicket(ticket);
    setModalBenefitCardTicket(benefit);
  };

  return (
    <PageContainer
      title="Movimentações"
      appendSlotHeight={{ xs: "100px", md: "110px" }}
      appendSlot={<MainMovimentationsAppendSlot />}
      headerSlot={<MainMovimentationsHeaderSlot />}
    >
      <MainMovimentationsModal />

      <MainMovimentationsModalSend />

      <PageTable
        items={tickets}
        isLoading={isTicketsLoading}
        isEmpty={isTicketsEmpty}
        textEmptyState="Nenhum ticket encontrado."
        pagination={{ page, changePage }}
        meta={ticketsMeta}
        onClickRow={handleRowClick}
        selectedRowId={modalTicket?.id}
        renderRow={(item) => {
          const tickets = item?.tickets ?? [];

          return [
            {
              title: "Beneficiário",
              titleElement: (
                <MainMovimentationsSortableTitle
                  title="Beneficiário"
                  sortBy={[
                    TicketFilterSortBy.BENEFICIARY_NAME_ASC,
                    TicketFilterSortBy.BENEFICIARY_NAME_DESC,
                  ]}
                />
              ),
              cellVerticalAlign: "top",
              content: (
                <Stack padding="5px 0">
                  <EllipsisText
                    variant="caption"
                    color="white"
                    marginBottom="2px"
                  >
                    {smartNameCase(item?.beneficiary?.name)}
                  </EllipsisText>
                  {item?.beneficiary?.enrollmentNumber && (
                    <EllipsisText variant="caption">
                      Matrícula: {item?.beneficiary?.enrollmentNumber}
                    </EllipsisText>
                  )}
                  {item?.beneficiary?.type && (
                    <EllipsisText variant="caption" color="white">
                      {BeneficiaryTypeTranslate[item?.beneficiary?.type]}
                    </EllipsisText>
                  )}
                </Stack>
              ),
            },
            {
              title: "CPF",
              titleElement: (
                <MainMovimentationsSortableTitle
                  title="CPF"
                  sortBy={[
                    TicketFilterSortBy.BENEFICIARY_DOCUMENT_ASC,
                    TicketFilterSortBy.BENEFICIARY_DOCUMENT_DESC,
                  ]}
                />
              ),
              cellVerticalAlign: "top",
              content: (
                <PageTableSingleTextCell
                  padding="5px 0"
                  text={maskCpf(item?.beneficiary?.document)}
                />
              ),
            },
            {
              title: "Benefícios",
              content: (
                <Stack spacing="16px" padding="5px 0">
                  {tickets.map((ticket) => (
                    <Stack
                      key={ticket.id}
                      height="22px"
                      paddingLeft="24px"
                      justifyContent="center"
                    >
                      <Tooltip
                        onClick={(event) => event.stopPropagation()}
                        title={
                          <Stack onClick={(event) => event.stopPropagation()}>
                            {ticket?.benefitType && (
                              <Typography variant="caption" color="grey.100">
                                {BenefitTypeTranslate[ticket.benefitType]}
                              </Typography>
                            )}
                            <ButtonBase
                              onClick={() => handleClickBenefit(item, ticket)}
                            >
                              <Typography variant="caption" color="primary">
                                Ver detalhes
                              </Typography>
                            </ButtonBase>
                          </Stack>
                        }
                      >
                        <Stack width="max-content">
                          {ticket?.benefitType && (
                            <BenefitTypeIcon type={ticket.benefitType} />
                          )}
                        </Stack>
                      </Tooltip>
                    </Stack>
                  ))}
                </Stack>
              ),
            },
            {
              title: "Tipo de Movimentação",
              titleElement: (
                <MainMovimentationsSortableTitle
                  title="Tipo de Movimentação"
                  sortBy={[
                    TicketFilterSortBy.TICKET_OPERATION_TYPE_ASC,
                    TicketFilterSortBy.TICKET_OPERATION_TYPE_DESC,
                  ]}
                />
              ),
              content: (
                <Stack spacing="16px" padding="5px 0">
                  {tickets.map((ticket) => (
                    <Stack key={ticket.id} height="22px">
                      {ticket?.benefitActionType &&
                        BenefitActionTypeTranslate[ticket.benefitActionType]}
                    </Stack>
                  ))}
                </Stack>
              ),
            },
            {
              title: "Status",
              titleElement: (
                <MainMovimentationsSortableTitle
                  title="Status"
                  sortBy={[
                    TicketFilterSortBy.TICKET_STATUS_ASC,
                    TicketFilterSortBy.TICKET_STATUS_DESC,
                  ]}
                />
              ),
              content: (
                <Stack spacing="16px" padding="5px 0">
                  {tickets.map((ticket) => (
                    <Stack key={ticket.id} height="22px">
                      {ticket?.status && (
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing="10px"
                        >
                          <StatusDot
                            color={
                              benefitMovimentationStatusColor[ticket.status]
                            }
                          />
                          <PageTableSingleTextCell
                            text={
                              BenefitMovimentationStatusTranslate[ticket.status]
                            }
                          />
                        </Stack>
                      )}
                    </Stack>
                  ))}
                </Stack>
              ),
            },
            {
              title: "Última atualização",
              titleElement: (
                <MainMovimentationsSortableTitle
                  title="Última atualização"
                  sortBy={[
                    TicketFilterSortBy.TICKET_UPDATED_AT_ASC,
                    TicketFilterSortBy.TICKET_UPDATED_AT_DESC,
                  ]}
                />
              ),
              content: (
                <Stack spacing="16px" padding="5px 0">
                  {tickets.map((ticket) => (
                    <Stack key={ticket.id} height="22px">
                      <PageTableSingleTextCell
                        text={formatDate(ticket?.updatedAt)}
                      />
                    </Stack>
                  ))}
                </Stack>
              ),
            },
          ];
        }}
      />
    </PageContainer>
  );
}
