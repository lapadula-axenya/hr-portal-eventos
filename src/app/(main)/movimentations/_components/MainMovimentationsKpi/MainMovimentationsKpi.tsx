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
        <Icon size={20} strokeWidth={1} />
        <EllipsisText variant="caption">
          {!!delta && Math.abs(delta)} {text}
        </EllipsisText>
      </>
    );
  };

  return (
    <Card sx={{ width: "100%", position: "relative" }}>
      <Stack
        height="100%"
        color="grey.100"
        justifyContent="center"
        component={CardContent}
      >
        <Stack
          direction="row"
          alignItems="end"
          spacing="16px"
          position="absolute"
          top="19%"
        >
          <Stack bgcolor={alpha(color, 0.1)} padding="10px" borderRadius="50%">
            <Icon size={26} color={color} />
          </Stack>

          <Stack flexGrow={1}>
            <EllipsisText lineHeight={1.15}>{titles[kpiStatus]}</EllipsisText>
            <EllipsisText variant="h3" fontWeight={700} color="white">
              {kpiValues.today}
            </EllipsisText>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="end"
          spacing="8px"
          position="absolute"
          bottom="10px"
          right="14px"
        >
          {renderYesterdayDelta(kpiValues)}
        </Stack>
      </Stack>
    </Card>
  );
}
