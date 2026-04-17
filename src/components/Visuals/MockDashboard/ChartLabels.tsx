/**
 * Custom label components for recharts charts.
 */

import type { Formatter } from "recharts/types/component/DefaultTooltipContent";
import type { Props as RechartsLabelProps } from "recharts/types/component/Label";
import { colors } from "./theme";

/** Percentage label above data points */
export function PctLabel(props: RechartsLabelProps & { fill?: string }) {
  if (props.value == null) return null;
  return (
    <text
      x={props.x}
      y={Number(props.y ?? 0) - 10}
      textAnchor="middle"
      fontSize={9}
      fontWeight={500}
      fill={props.fill || colors.teal}
    >
      {Number(props.value).toFixed(2)}%
    </text>
  );
}

/** Label for OKR quality-of-life line */
export function OkrLineLabel(props: RechartsLabelProps) {
  return (
    <text
      x={props.x}
      y={Number(props.y ?? 0) - 12}
      textAnchor="middle"
      fontSize={10}
      fontWeight={600}
      fill={colors.text}
    >
      {props.value}%
    </text>
  );
}

/** Label above CAT bar segments */
export function CatBarLabel(props: RechartsLabelProps) {
  if (!props.value) return null;
  return (
    <text
      x={Number(props.x ?? 0) + Number(props.width ?? 0) / 2}
      y={Number(props.y ?? 0) - 6}
      textAnchor="middle"
      fontSize={10}
      fontWeight={600}
      fill={colors.muted}
    >
      {props.value}
    </text>
  );
}

/** Prevalence rate label */
export function PrevLabel(props: RechartsLabelProps) {
  if (!props.value) return null;
  return (
    <text
      x={props.x}
      y={Number(props.y ?? 0) - 10}
      textAnchor="middle"
      fontSize={9}
      fontWeight={500}
      fill={colors.tealDark}
    >
      {Number(props.value).toFixed(2)}
    </text>
  );
}

/** Incidence rate label */
export function IncLabel(props: RechartsLabelProps) {
  if (!props.value) return null;
  return (
    <text
      x={props.x}
      y={Number(props.y ?? 0) - 10}
      textAnchor="middle"
      fontSize={9}
      fontWeight={500}
      fill={colors.teal}
    >
      {Number(props.value).toFixed(2)}
    </text>
  );
}

/** Recharts tooltip formatter for percentage values */
export const formatTooltipPct: Formatter = (v) =>
  Number(v ?? 0).toFixed(2) + "%";
