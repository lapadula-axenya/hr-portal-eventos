import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { CalendarIcon, ClipboardListIcon } from "lucide-react";
import { StatusBadge, StatusDotColor } from "@/components";
import { PolicyStatus, PolicyStatusTranslate } from "@/services/policyService";
import { formatDate } from "@/utils/formatDate";
import { maskCnpj } from "@/utils/maskCnpj";
import { smartNameCase } from "@/utils/smartNameCase";
import { MainPoliciesModalProps } from ".";

export function MainPoliciesModal({ policy }: MainPoliciesModalProps) {
  const statusTranslate = PolicyStatusTranslate[policy.status];
  const statusDotColor =
    policy.status === PolicyStatus.ACTIVE
      ? StatusDotColor.SUCCESS
      : StatusDotColor.GREY;

  return (
    <Stack spacing="30px">
      <Stack direction="row" spacing="24px">
        <Stack width="40px" height="40px" borderRadius="8px" bgcolor="white" />
        <Stack>
          <Typography variant="subtitle1" fontWeight={700}>
            {policy.name}
          </Typography>
          <Typography color="grey.300">{policy.name}</Typography>
          <StatusBadge color={statusDotColor} label={statusTranslate} />
        </Stack>
      </Stack>

      <Stack>
        <Divider sx={{ marginInline: "-26px" }} />
      </Stack>

      <Stack spacing="12px">
        <Typography variant="body2" fontWeight={700}>
          CNPJ Vinculado
        </Typography>
        <Card sx={{ borderRadius: "8px" }}>
          <CardContent>
            <Stack direction="row" spacing="14px">
              <Stack component={ClipboardListIcon} size={18} color="grey.300" />
              <Stack>
                <Typography variant="body2">
                  {smartNameCase(policy?.company?.name)}
                </Typography>
                <Typography variant="body2">
                  CNPJ: {maskCnpj(policy?.company?.document)}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack spacing="12px">
        <Typography variant="body2" fontWeight={700}>
          Planos existentes
        </Typography>

        <Stack
          component={Card}
          divider={<Divider />}
          sx={{ borderRadius: "8px" }}
        >
          {policy.benefits.map((benefit) => (
            <CardContent key={benefit}>
              <Stack direction="row" spacing="14px">
                <Stack
                  component={ClipboardListIcon}
                  size={18}
                  color="grey.300"
                />
                <Typography variant="body2">{benefit}</Typography>
              </Stack>
            </CardContent>
          ))}
        </Stack>
      </Stack>

      <Stack spacing="12px">
        <Typography variant="body2" fontWeight={700}>
          Período de vigência
        </Typography>

        <Stack
          component={Card}
          divider={<Divider />}
          sx={{ borderRadius: "8px" }}
        >
          <CardContent>
            <Stack direction="row" spacing="14px">
              <Stack component={CalendarIcon} size={18} color="grey.300" />
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                color="grey.100"
              >
                <Typography variant="body2">Início</Typography>
                <Typography variant="body2">
                  {formatDate(policy.coverageStart)}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>

          <CardContent>
            <Stack direction="row" spacing="14px">
              <Stack component={CalendarIcon} size={18} color="grey.300" />
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                color="grey.100"
              >
                <Typography variant="body2">Fim</Typography>
                <Typography variant="body2">
                  {formatDate(policy.coverageEnd)}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Stack>
      </Stack>
    </Stack>
  );
}
