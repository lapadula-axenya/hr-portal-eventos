import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowLeftIcon } from "lucide-react";
import { BenefitTypeIcon, LoadingContainer, StatusDot } from "@/components";
import { benefitMovimentationStatusColor } from "@/constants/benefitMovimentationStatusColor";
import { useTicketParamsContext } from "@/contexts/TicketParamsContext";
import { useTicketTimelineQuery } from "@/queries/useTicketTimelineQuery";
import { BeneficiaryTypeTranslate } from "@/services/beneficiaryService";
import {
  BenefitActionTypeTranslate,
  BenefitMovimentationStatusTranslate,
  BenefitTypeTranslate,
} from "@/services/benefitService";
import { formatDate } from "@/utils/formatDate";
import { smartNameCase } from "@/utils/smartNameCase";

export function MainMovimentationsModalStepBenefit() {
  const { modalBenefitCardTicket, modalTicket, setModalBenefitCardTicket } =
    useTicketParamsContext();

  const { isTicketTimelineLoading, ticketTimeline } = useTicketTimelineQuery(
    modalBenefitCardTicket?.id ?? "",
  );

  const benefit = modalBenefitCardTicket?.benefit.find(
    (item) => item.productType === modalBenefitCardTicket?.productType,
  );

  return (
    <Stack spacing="2rem">
      <Stack direction="row" spacing="10px">
        <Stack
          direction="row"
          color="white"
          spacing="4px"
          height="max-content"
          alignItems="center"
        >
          <Box>
            <IconButton
              onClick={() => setModalBenefitCardTicket(undefined)}
              size="small"
            >
              <ArrowLeftIcon size={14} />
            </IconButton>
          </Box>

          {modalBenefitCardTicket?.benefitType && (
            <BenefitTypeIcon type={modalBenefitCardTicket.benefitType} />
          )}
        </Stack>

        <Stack spacing="20px">
          <Stack>
            {modalBenefitCardTicket?.benefitType && (
              <Typography variant="subtitle1" fontWeight={700}>
                {BenefitTypeTranslate[modalBenefitCardTicket.benefitType]}
              </Typography>
            )}

            <Typography color="grey.300">
              {smartNameCase(modalTicket?.beneficiary?.name)} (
              {modalTicket?.beneficiary?.type
                ? BeneficiaryTypeTranslate[modalTicket?.beneficiary?.type]
                : ""}
              )
            </Typography>
          </Stack>

          <Stack color="grey.300" spacing="4px">
            {benefit?.provider && (
              <Typography variant="body2" fontWeight={700}>
                {benefit?.provider}
              </Typography>
            )}
            <Typography variant="body2">
              {[benefit?.planLevel, benefit?.accommodationType]
                .filter(Boolean)
                .join(" - ")}
            </Typography>
            <Typography variant="body2">
              Nº Carteirinha: {modalBenefitCardTicket?.cardNumber ?? "-"}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {isTicketTimelineLoading && <LoadingContainer />}

      {!isTicketTimelineLoading && (
        <Card sx={{ borderRadius: "8px", bgcolor: "grey.900" }}>
          <CardContent>
            <Stack spacing="5px">
              {modalBenefitCardTicket?.benefitActionType && (
                <Typography variant="body2" fontWeight={700}>
                  {
                    BenefitActionTypeTranslate[
                      modalBenefitCardTicket.benefitActionType
                    ]
                  }
                </Typography>
              )}
            </Stack>

            <Stack>
              {ticketTimeline?.map((item, index) => {
                const isFistMovimentation = ticketTimeline.length === index + 1;

                return (
                  <Stack
                    key={`${item.status}-${item.date}-${index}`}
                    spacing="16px"
                    position="relative"
                    paddingBottom="40px"
                    sx={{
                      ...(!isFistMovimentation && {
                        "&:before": {
                          content: "''",
                          width: "1px",
                          height: "100%",
                          bgcolor: "grey.500",
                          position: "absolute",
                          left: "5px",
                          top: "5px",
                          zIndex: 1,
                        },
                      }),
                    }}
                  >
                    <Stack direction="row" spacing="10px">
                      {item.status && (
                        <Stack sx={{ zIndex: 2 }}>
                          <StatusDot
                            color={benefitMovimentationStatusColor[item.status]}
                          />
                        </Stack>
                      )}

                      <Stack color="grey.300">
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          marginBottom="4px"
                          color="grey.100"
                        >
                          Status:{" "}
                          {item?.status
                            ? BenefitMovimentationStatusTranslate[item.status]
                            : ""}
                        </Typography>

                        {item?.date && (
                          <Typography variant="body2">
                            <b>Atualização:</b> {formatDate(item.date)}
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
