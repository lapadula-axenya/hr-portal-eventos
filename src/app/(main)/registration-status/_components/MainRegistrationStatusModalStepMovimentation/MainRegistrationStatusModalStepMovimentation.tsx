import { useMemo } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ArrowLeftIcon } from "lucide-react";
import { MainMovimentationsModalStepBenefitTimeline } from "@/app/(main)/movimentations/_components/MainMovimentationsModalStepBenefitTimeline";
import { BenefitTypeIcon } from "@/components";
import { useBeneficiaryParamsContext } from "@/contexts/BeneficiaryParamsContext";
import { useTicketByBenefitCardQuery } from "@/queries/useTicketByBenefitCardQuery";
import { BenefitTypeTranslate } from "@/services/benefitService";
import { mapTicketTopAction } from "@/utils/mapTicketTopAction";
import { smartNameCase } from "@/utils/smartNameCase";
import { MainRegistrationStatusModalStepMovimentationProps } from ".";

export function MainRegistrationStatusModalStepMovimentation({
  beneficiary,
  benefit,
}: MainRegistrationStatusModalStepMovimentationProps) {
  const { modalActionId, modalBenefitId, setModalActionId } =
    useBeneficiaryParamsContext();

  const { tickets } = useTicketByBenefitCardQuery(modalBenefitId);

  const actions = useMemo(() => {
    return mapTicketTopAction(tickets);
  }, [tickets]);

  const action = actions.find((item) => item.id === modalActionId);

  return (
    <Stack spacing="32px">
      <Stack direction="row" spacing="10px">
        <Stack
          direction="row"
          color="white"
          spacing="4px"
          height="max-content"
          alignItems="center"
        >
          <Box>
            <IconButton onClick={() => setModalActionId("")} size="small">
              <ArrowLeftIcon size={14} />
            </IconButton>
          </Box>

          {benefit?.type && <BenefitTypeIcon type={benefit.type} />}
        </Stack>

        <Stack>
          {benefit?.type && (
            <Typography variant="subtitle1" fontWeight={700}>
              {BenefitTypeTranslate[benefit.type]}
            </Typography>
          )}

          <Typography color="grey.300">
            {smartNameCase(beneficiary?.name)}
          </Typography>
        </Stack>
      </Stack>

      {action && <MainMovimentationsModalStepBenefitTimeline action={action} />}
    </Stack>
  );
}
