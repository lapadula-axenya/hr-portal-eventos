import { Box, ButtonBase, Stack, Tooltip, Typography } from "@mui/material";
import { BenefitTypeIcon, PageTableSingleTextCell } from "@/components";
import { BenefitStatus, BenefitTypeTranslate } from "@/services/benefitService";
import { MainRegistrationStatusBenefitsProps } from ".";

export function MainRegistrationStatusBenefits({
  beneficiary,
  onClick,
}: MainRegistrationStatusBenefitsProps) {
  const activeBenefits = beneficiary?.benefits?.filter(
    (benefit) => benefit.status === BenefitStatus.ACTIVE,
  );

  if (!beneficiary || !activeBenefits?.length) {
    return (
      <PageTableSingleTextCell
        text="Nenhum benefício ativo"
        fontStyle="italic"
      />
    );
  }

  return (
    <Stack direction="row" spacing="8px">
      {activeBenefits.map((benefit) => (
        <Tooltip
          key={`${benefit?.id}-${benefit?.type}`}
          arrow
          onClick={(event) => event.stopPropagation()}
          title={
            <Stack onClick={(event) => event.stopPropagation()}>
              {benefit?.type && (
                <Typography variant="caption" color="grey.100">
                  {BenefitTypeTranslate[benefit?.type]}
                </Typography>
              )}
              <ButtonBase
                onClick={() => onClick(beneficiary?.id, benefit?.id ?? "")}
              >
                <Typography variant="caption" color="primary">
                  Ver detalhes
                </Typography>
              </ButtonBase>
            </Stack>
          }
        >
          <Box>
            {benefit?.type && (
              <BenefitTypeIcon type={benefit.type} strokeWidth={2.25} />
            )}
          </Box>
        </Tooltip>
      ))}
    </Stack>
  );
}
