import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { plural } from "@umatch/pluralize-ptbr";
import { ChevronRightIcon } from "lucide-react";
import { EllipsisText, StatusBadge, StatusDotColor } from "@/components";
import { PolicyStatus, PolicyStatusTranslate } from "@/services/policyService";
import { MainPoliciesSectionCardProps } from "./MainPoliciesSectionCard.props";

export function MainPoliciesSectionCard({
  onChangeSelectedPolicyId,
  policies,
  selectedPolicyId,
  status,
}: MainPoliciesSectionCardProps) {
  const count = policies.length;
  const statusTranslate = PolicyStatusTranslate[status];
  const chipLabel = `${count} ${plural("apólice", count)} ${plural(statusTranslate.toLowerCase(), count)}`;
  const statusDotColor =
    status === PolicyStatus.ACTIVE
      ? StatusDotColor.SUCCESS
      : StatusDotColor.GREY;

  return (
    <Stack spacing="20px">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" fontWeight={700}>
          {statusTranslate}
        </Typography>
        <Chip label={chipLabel} />
      </Stack>

      <Stack
        display="grid"
        gap="20px"
        gridTemplateColumns={{
          sm: "1fr",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
      >
        {policies.map((policy) => (
          <Card
            key={policy.id}
            data-hoverable
            data-active={selectedPolicyId === policy.id ? "" : undefined}
          >
            <CardActionArea
              onClick={() => onChangeSelectedPolicyId(policy.id)}
              sx={{
                "&:hover svg": {
                  opacity: "1 !important",
                },
              }}
            >
              <CardContent sx={{ padding: "18px 24px" }}>
                <Stack spacing="32px">
                  <Stack direction="row" justifyContent="space-between">
                    <Stack
                      width="40px"
                      height="40px"
                      borderRadius="8px"
                      sx={{
                        backgroundImage: `url(${policy.providerUrl})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    />

                    <StatusBadge
                      color={statusDotColor}
                      label={statusTranslate}
                    />
                  </Stack>

                  <Stack>
                    <Typography variant="subtitle2" fontWeight={700}>
                      {policy.name}
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      color="grey.100"
                    >
                      <EllipsisText variant="body2" line-height="20px">
                        {policy.benefitName}
                      </EllipsisText>

                      <ChevronRightIcon
                        size={16}
                        style={{
                          opacity: 0,
                          transition: "opacity 0.1s",
                        }}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
