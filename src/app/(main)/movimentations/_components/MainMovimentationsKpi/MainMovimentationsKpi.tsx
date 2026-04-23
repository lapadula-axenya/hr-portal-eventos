import { alpha, Card, CardContent, Stack } from "@mui/material";
import {
  CheckIcon,
  CircleAlertIcon,
  ClockIcon,
  LucideIcon,
  MoveRightIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { EllipsisText } from "@/components";
import { KpiStatus, KpiValues } from "@/services/kpiService";
import { theme } from "@/theme";
import { MainMovimentationsKpiProps } from ".";

const titles: Record<KpiStatus, string> = {
  inProgress: "Em andamento",
  pending: "Pendentes",
  completed: "Concluídas",
};

const icons: Record<KpiStatus, LucideIcon> = {
  inProgress: ClockIcon,
  pending: CircleAlertIcon,
  completed: CheckIcon,
};

const colors: Record<KpiStatus, string> = {
  inProgress: theme.palette.warning.main,
  pending: theme.palette.error.main,
  completed: theme.palette.primary.main,
};

export function MainMovimentationsKpi({
  kpiStatus,
  kpiValues,
}: MainMovimentationsKpiProps) {
  const Icon = icons[kpiStatus];

  const color = colors[kpiStatus];

  const renderYesterdayDelta = ({ today, yesterday }: KpiValues) => {
    const todayValue = parseFloat(today);
    const yesterdayValue = parseFloat(yesterday);

    if (isNaN(todayValue) || isNaN(yesterdayValue)) {
      return null;
    }

    const delta = todayValue - yesterdayValue;

    const config = {
      positive: {
        icon: TrendingUpIcon,
        text: "a mais que ontem",
      },
      negative: {
        icon: TrendingDownIcon,
        text: "a menos que ontem",
      },
      zero: {
        icon: MoveRightIcon,
        text: "igual a ontem",
      },
    };

    const type = delta === 0 ? "zero" : delta > 0 ? "positive" : "negative";
    const { icon: Icon, text } = config[type];

    return (
      <>
        <Icon size={14} strokeWidth={1.5} />
        <EllipsisText variant="caption" fontSize="0.7rem">
          {!!delta && Math.abs(delta)} {text}
        </EllipsisText>
      </>
    );
  };

  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <Stack
        height="100%"
        color="grey.100"
        justifyContent="center"
        spacing={0.5}
        component={CardContent}
        sx={{
          padding: { xs: "10px 12px", md: "12px 16px" },
          "&:last-child": { paddingBottom: { xs: "10px", md: "12px" } },
        }}
      >
        <Stack direction="row" alignItems="center" spacing="10px">
          <Stack
            bgcolor={alpha(color, 0.1)}
            padding="6px"
            borderRadius="50%"
            flexShrink={0}
          >
            <Icon size={18} color={color} />
          </Stack>

          <Stack flexGrow={1} minWidth={0}>
            <EllipsisText variant="caption" lineHeight={1.15}>
              {titles[kpiStatus]}
            </EllipsisText>
            <EllipsisText variant="h5" fontWeight={700} color="white">
              {kpiValues.today}
            </EllipsisText>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="end"
          spacing="4px"
        >
          {renderYesterdayDelta(kpiValues)}
        </Stack>
      </Stack>
    </Card>
  );
}
