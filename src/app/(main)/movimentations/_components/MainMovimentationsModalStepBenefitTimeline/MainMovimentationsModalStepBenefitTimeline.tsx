import { Card, CardContent, Stack, Typography } from "@mui/material";
import { LoadingContainer, StatusDot } from "@/components";
import { benefitMovimentationStatusColor } from "@/constants/benefitMovimentationStatusColor";
import { useTicketTimelineQuery } from "@/queries/useTicketTimelineQuery";
import {
  BenefitActionTypeTranslate,
  BenefitMovimentationStatusTranslate,
  TimeLineEvent,
} from "@/services/benefitService";
import { formatDate } from "@/utils/formatDate";
import { MainMovimentationsModalStepBenefitTimelineProps } from "./MainMovimentationsModalStepBenefitTimeline.props";

export function MainMovimentationsModalStepBenefitTimeline({
  action,
}: MainMovimentationsModalStepBenefitTimelineProps) {
  const { isTicketTimelineEmpty, isTicketTimelineLoading, ticketTimeline } =
    useTicketTimelineQuery(action.id);

  if (isTicketTimelineLoading) {
    return <LoadingContainer />;
  }

  const fallbackTimeline: TimeLineEvent[] =
    action?.movimentations.map((item) => ({
      date: item?.updatedAt,
      status: item?.status,
    })) ?? [];

  const timeline = isTicketTimelineEmpty ? fallbackTimeline : ticketTimeline;

  return (
    <Card sx={{ borderRadius: "8px", bgcolor: "grey.900" }}>
      <CardContent>
        <Stack spacing="5px">
          {action?.type && (
            <Typography variant="body2" fontWeight={700}>
              {BenefitActionTypeTranslate[action.type]}
            </Typography>
          )}
        </Stack>

        <Stack>
          {timeline?.map((item, index) => {
            const isFistMovimentation = timeline.length === index + 1;

            return (
              <Stack
                key={`${item.status}-${item.date}`}
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
  );
}
