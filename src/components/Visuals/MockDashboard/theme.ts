/**
 * Color palette and chart configuration for the mock dashboard.
 * Colors are aligned with the app's dark theme (palette.ts).
 */

/** Colors per CID group */
export const CID_COLORS: Record<string, string> = {
  "A/B": "#25E9C4", // primary.main
  F: "#378ADD", // blue (distinct)
  J: "#F44336", // error.main
  M: "#FFB420", // warning.main
  S: "#44A047", // success.main
  Outros: "#7E7E7E", // grey.300
};

/** Dashboard semantic colors */
export const colors = {
  teal: "#25E9C4", // primary.main
  tealDark: "#1A8A7A", // darker teal for contrast on dark bg
  tealLight: "#50EDCF", // primary.light
  text: "#FFFFFF",
  cyan: "#50EDCF",
  bg: "#131314", // background.paper
  border: "#252427", // divider
  accent: "#25E9C4", // primary.main
  muted: "#A6A7A9", // grey.100
  surface: "#1A1A1C", // card background
  error: "#F44336",
  errorDark: "#562F2F",
  secondary: "#3b3b3b", // grey.500
} as const;

/** Default X-axis props for recharts */
export const xAxisProps = {
  tick: { fontSize: 9, fill: colors.muted },
  interval: 0 as const,
  angle: -35,
  textAnchor: "end" as const,
  height: 55,
  axisLine: false,
  tickLine: false,
  padding: { left: 18, right: 18 },
};

/** Default chart margin */
export const chartMargin = { top: 22, right: 30, bottom: 0, left: 30 };

/** Tooltip style for dark theme */
export const tooltipStyle = {
  contentStyle: {
    background: colors.surface,
    border: "1px solid " + colors.border,
    borderRadius: 8,
    color: colors.text,
    fontSize: 12,
  },
  itemStyle: { color: colors.muted },
};
