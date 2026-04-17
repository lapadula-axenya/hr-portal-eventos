/**
 * All chart section components for the mock dashboard.
 */

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Props as RechartsLabelProps } from "recharts/types/component/Label";
import {
  PctLabel,
  OkrLineLabel,
  CatBarLabel,
  PrevLabel,
  IncLabel,
  formatTooltipPct,
} from "../ChartLabels";
import {
  DashCard,
  KpiBox,
  ChartRow,
  Legend,
  AccumKpiBox,
} from "../DashboardPrimitives";
import {
  CID_GROUPS,
  CID_CHART_GROUPS,
  COMPANIES,
  OKR_DATA,
  SALARY_BASE,
} from "../data";
import {
  colors,
  CID_COLORS,
  xAxisProps,
  chartMargin,
  tooltipStyle,
} from "../theme";
import { toggle } from "../utils";

// ─── Absenteeism Rate Evolution ──────────────────────────────────────────────

type AbsenteeismChartProps = {
  data: { month: string; rate: number }[];
  kpi: number;
};

export function AbsenteeismChart({ data, kpi }: AbsenteeismChartProps) {
  return (
    <DashCard title="Evolução da Taxa de Absenteísmo">
      <ChartRow kpiLabel="Taxa de Absenteísmo" kpiValue={kpi.toFixed(2) + "%"}>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} margin={chartMargin}>
            <XAxis dataKey="month" {...xAxisProps} />
            <YAxis hide domain={[0, "auto"]} />
            <Tooltip {...tooltipStyle} formatter={formatTooltipPct} />
            <Line
              type="linear"
              dataKey="rate"
              isAnimationActive={false}
              connectNulls
              stroke={colors.teal}
              strokeWidth={2.5}
              dot={{ fill: colors.teal, r: 4, strokeWidth: 0 }}
              label={<PctLabel />}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartRow>
    </DashCard>
  );
}

// ─── Days Lost Stacked Bar Chart ─────────────────────────────────────────────

type DaysLostChartProps = {
  data: Record<string, number | string>[];
  barHidden: string[];
  setBarHidden: (v: string[]) => void;
};

export function DaysLostChart({
  barHidden,
  data,
  setBarHidden,
}: DaysLostChartProps) {
  const visibleCids = [...CID_GROUPS].filter((c) => !barHidden.includes(c));
  const filteredKD = data.reduce((s, d) => {
    let rowTotal = 0;
    visibleCids.forEach((c) => (rowTotal += (d[c] as number) || 0));
    return s + rowTotal;
  }, 0);
  const valorPerdido = Math.round((filteredKD / 30) * SALARY_BASE);

  return (
    <DashCard title="Dias Perdidos Por Atestado no Período">
      <div style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 28, right: 30, bottom: 0, left: 30 }}
            >
              <XAxis dataKey="month" {...xAxisProps} />
              <YAxis hide />
              <Tooltip {...tooltipStyle} />
              {[...CID_GROUPS].map((c) => {
                const hidden = barHidden.includes(c);
                const isTopVisible =
                  visibleCids.length > 0 &&
                  visibleCids[visibleCids.length - 1] === c;
                const labelFn = hidden
                  ? undefined
                  : (props: RechartsLabelProps) => {
                      const val = props.value;
                      if (val == null || val === 0) return null;
                      const h = Number(props.height ?? 0);
                      const y = Number(props.y ?? 0);
                      const showInside = h > 16;
                      const px =
                        Number(props.x ?? 0) + Number(props.width ?? 0) / 2;
                      if (isTopVisible) {
                        let total = 0;
                        const entry = data[props.index ?? 0];
                        if (entry)
                          visibleCids.forEach(
                            (cc) => (total += (entry[cc] as number) || 0),
                          );
                        return (
                          <g>
                            {showInside && (
                              <text
                                x={px}
                                y={y + h / 2 + 4}
                                textAnchor="middle"
                                fontSize={9}
                                fontWeight={500}
                                fill="#fff"
                              >
                                {val}
                              </text>
                            )}
                            <text
                              x={px}
                              y={y - 8}
                              textAnchor="middle"
                              fontSize={10}
                              fontWeight={600}
                              fill={colors.text}
                            >
                              {total}
                            </text>
                          </g>
                        );
                      }
                      if (!showInside) return null;
                      return (
                        <text
                          x={px}
                          y={y + h / 2 + 4}
                          textAnchor="middle"
                          fontSize={9}
                          fontWeight={500}
                          fill="#fff"
                        >
                          {val}
                        </text>
                      );
                    };
                return (
                  <Bar
                    key={c}
                    dataKey={c}
                    stackId="a"
                    fill={hidden ? "transparent" : CID_COLORS[c]}
                    label={labelFn}
                  />
                );
              })}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <KpiBox label="Dias Perdidos" value={filteredKD.toLocaleString()} />
          <div
            style={{
              minWidth: 120,
              maxWidth: 150,
              background: colors.bg,
              border: "1px solid " + colors.errorDark,
              borderRadius: 10,
              padding: "14px 12px",
              textAlign: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: colors.error,
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: 0.6,
                fontWeight: 600,
              }}
            >
              Valor perdido
            </div>
            <div
              style={{
                fontSize: 8,
                color: colors.error,
                marginBottom: 8,
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              ACUMULADO
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.error }}>
              {"R$ " + valorPerdido.toLocaleString("pt-BR")}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          fontSize: 11,
          color: colors.muted,
          marginTop: 8,
          flexWrap: "wrap",
        }}
      >
        {[...CID_GROUPS].map((c) => {
          const hidden = barHidden.includes(c);
          return (
            <span
              key={c}
              onClick={() => toggle(barHidden, setBarHidden, c)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                cursor: "pointer",
                opacity: hidden ? 0.35 : 1,
                transition: "opacity 0.15s",
                textDecoration: hidden ? "line-through" : "none",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: CID_COLORS[c],
                  display: "inline-block",
                }}
              />
              {"CID " + c}
            </span>
          );
        })}
      </div>
    </DashCard>
  );
}

// ─── CID Breakdown Lines ─────────────────────────────────────────────────────

type CidLinesChartProps = {
  cidLines: Record<
    string,
    { series: { month: string; rate: number }[]; kpi: number }
  >;
};

export function CidLinesChart({ cidLines }: CidLinesChartProps) {
  return (
    <DashCard title="Evolução da Taxa de Absenteísmo — CIDs">
      {[...CID_CHART_GROUPS].map((c, ci) => {
        const isLast = ci === 4;
        const data = cidLines[c]?.series ?? [];
        const kpi = cidLines[c]?.kpi ?? 0;
        return (
          <div
            key={c}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "5px 0",
              borderBottom: "1px solid " + colors.border,
            }}
          >
            <span
              style={{
                width: 30,
                textAlign: "center",
                fontSize: 12,
                fontWeight: 600,
                color: colors.muted,
              }}
            >
              {c}
            </span>
            <div style={{ flex: 1, height: isLast ? 110 : 68 }}>
              <ResponsiveContainer width="100%" height={isLast ? 110 : 68}>
                <LineChart
                  data={data}
                  margin={{ top: 16, right: 20, bottom: 0, left: 20 }}
                >
                  <XAxis
                    dataKey="month"
                    tick={isLast ? { fontSize: 8, fill: colors.muted } : false}
                    interval={0}
                    angle={isLast ? -35 : 0}
                    textAnchor={isLast ? "end" : "middle"}
                    height={isLast ? 45 : 10}
                    axisLine={{ stroke: colors.border, strokeWidth: 1 }}
                    tickLine={false}
                    padding={{ left: 15, right: 15 }}
                  />
                  <YAxis hide domain={[0, "auto"]} />
                  <Tooltip {...tooltipStyle} formatter={formatTooltipPct} />
                  <Line
                    type="linear"
                    dataKey="rate"
                    isAnimationActive={false}
                    connectNulls
                    stroke={CID_COLORS[c]}
                    strokeWidth={2}
                    dot={{ fill: CID_COLORS[c], r: 2, strokeWidth: 0 }}
                    label={<PctLabel fill={CID_COLORS[c]} />}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <AccumKpiBox label="Acumulado" value={kpi.toFixed(2) + "%"} />
          </div>
        );
      })}
    </DashCard>
  );
}

// ─── OKR Quality of Life ─────────────────────────────────────────────────────

export function OkrChart() {
  return (
    <DashCard title="OKR Qualidade de Vida">
      <ResponsiveContainer width="100%" height={310}>
        <ComposedChart data={OKR_DATA} margin={chartMargin}>
          <XAxis dataKey="m" {...xAxisProps} />
          <YAxis yAxisId="b" hide />
          <YAxis yAxisId="l" hide domain={[80, 102]} orientation="right" />
          <Tooltip {...tooltipStyle} />
          <Bar
            yAxisId="b"
            dataKey="a"
            name="Ativos"
            fill={colors.tealDark}
            barSize={18}
          />
          <Bar
            yAxisId="b"
            dataKey="e"
            name="Elegíveis"
            fill={colors.cyan}
            barSize={18}
          />
          <Line
            yAxisId="l"
            type="linear"
            dataKey="p"
            isAnimationActive={false}
            name="Indicador %"
            stroke={colors.text}
            strokeWidth={3}
            dot={{ fill: colors.text, r: 4, strokeWidth: 0 }}
            label={OkrLineLabel}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <Legend
        items={[
          ["Indicador Qualidade de Vida", colors.text, "line"],
          ["Ativos no Cuidado Coordenado", colors.tealDark, "dot"],
          ["Total de Elegíveis", colors.cyan, "dot"],
        ]}
      />
    </DashCard>
  );
}

// ─── CATs / Occupational Diseases ────────────────────────────────────────────

type CatsChartProps = {
  data: { month: string; cats: number; inc: number; prev: number }[];
};

export function CatsChart({ data }: CatsChartProps) {
  return (
    <DashCard
      title="Monitoramento de CATs e Taxas de Doenças Ocupacionais"
      note="Incidência e Prevalência por 1.000 trabalhadores"
    >
      <ResponsiveContainer width="100%" height={270}>
        <ComposedChart data={data} margin={chartMargin}>
          <XAxis dataKey="month" {...xAxisProps} />
          <YAxis yAxisId="b" hide />
          <YAxis yAxisId="l" hide orientation="right" />
          <Tooltip {...tooltipStyle} />
          <Bar
            yAxisId="b"
            dataKey="cats"
            name="CATs"
            fill={colors.secondary}
            barSize={14}
            label={CatBarLabel}
          />
          <Line
            yAxisId="l"
            type="linear"
            dataKey="prev"
            isAnimationActive={false}
            name="Prevalência"
            stroke={colors.tealDark}
            strokeWidth={2.5}
            dot={{ r: 4, fill: colors.tealDark, strokeWidth: 0 }}
            label={PrevLabel}
          />
          <Line
            yAxisId="l"
            type="linear"
            dataKey="inc"
            isAnimationActive={false}
            name="Incidência"
            stroke={colors.teal}
            strokeWidth={2.5}
            dot={{ r: 4, fill: colors.teal, strokeWidth: 0 }}
            label={IncLabel}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <Legend
        items={[
          ["CATs", colors.secondary, "dot"],
          ["Taxa de Incidência (por 1.000)", colors.teal, "line"],
          ["Taxa de Prevalência (por 1.000)", colors.tealDark, "line"],
        ]}
      />
    </DashCard>
  );
}

// ─── Social Security Absenteeism ─────────────────────────────────────────────

type PrevChartProps = {
  data: { month: string; general: number; cidF: number }[];
  kpiGeneral: number;
  kpiCidF: number;
};

export function PrevCharts({ data, kpiCidF, kpiGeneral }: PrevChartProps) {
  return (
    <>
      <DashCard title="Absenteísmo Previdenciário">
        <ChartRow
          kpiLabel="Taxa de Absenteísmo"
          kpiValue={kpiGeneral.toFixed(2) + "%"}
        >
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={data} margin={chartMargin}>
              <XAxis dataKey="month" {...xAxisProps} />
              <YAxis hide domain={[0, "auto"]} />
              <Tooltip {...tooltipStyle} formatter={formatTooltipPct} />
              <Line
                type="linear"
                dataKey="general"
                isAnimationActive={false}
                connectNulls
                stroke={colors.teal}
                strokeWidth={2.5}
                dot={{ fill: colors.teal, r: 3.5, strokeWidth: 0 }}
                label={<PctLabel />}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartRow>
      </DashCard>

      <DashCard title="Absenteísmo Previdenciário — CID F">
        <ChartRow
          kpiLabel="Taxa de Absenteísmo"
          kpiValue={kpiCidF.toFixed(2) + "%"}
        >
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={data} margin={chartMargin}>
              <XAxis dataKey="month" {...xAxisProps} />
              <YAxis hide domain={[0, "auto"]} />
              <Tooltip {...tooltipStyle} formatter={formatTooltipPct} />
              <Line
                type="linear"
                dataKey="cidF"
                isAnimationActive={false}
                connectNulls
                stroke={colors.teal}
                strokeWidth={2.5}
                dot={{ fill: colors.teal, r: 3.5, strokeWidth: 0 }}
                label={<PctLabel />}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartRow>
      </DashCard>
    </>
  );
}

// ─── Year-over-Year & Month-by-Month Company Comparison ──────────────────────

type CompanyComparisonProps = {
  companyYearly: Record<string, { year: string; rate: number }[]>;
  companyMonthly: Record<
    string,
    { series: { month: string; rate: number | null }[]; kpi: number }
  >;
};

export function CompanyComparison({
  companyMonthly,
  companyYearly,
}: CompanyComparisonProps) {
  return (
    <>
      <DashCard title="Comparativo Ano a Ano da Taxa de Absenteísmo">
        {[...COMPANIES].map((e) => {
          const data = companyYearly[e] || [];
          return (
            <div
              key={e}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 0",
                borderBottom: "1px solid " + colors.border,
              }}
            >
              <span
                style={{
                  width: 105,
                  textAlign: "center",
                  fontSize: 10,
                  fontWeight: 600,
                  color: colors.muted,
                  textTransform: "uppercase",
                  lineHeight: "1.3",
                }}
              >
                {e}
              </span>
              <div style={{ flex: 1, height: 80 }}>
                <ResponsiveContainer width="100%" height={80}>
                  <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, bottom: 0, left: 30 }}
                  >
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 11, fill: colors.muted }}
                      axisLine={false}
                      tickLine={false}
                      padding={{ left: 30, right: 30 }}
                    />
                    <YAxis hide domain={[0, "auto"]} />
                    <Tooltip {...tooltipStyle} formatter={formatTooltipPct} />
                    <Line
                      type="linear"
                      dataKey="rate"
                      connectNulls
                      stroke={colors.tealLight}
                      strokeWidth={2}
                      dot={{ fill: colors.teal, r: 6, strokeWidth: 0 }}
                      label={<PctLabel />}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </DashCard>

      <DashCard title="Comparativo Mês a Mês da Taxa de Absenteísmo — Geral">
        {[...COMPANIES].map((e, ei) => {
          const data = companyMonthly[e]?.series ?? [];
          const kpi = companyMonthly[e]?.kpi ?? 0;
          const isLast = ei === 2;
          return (
            <div
              key={e}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 0",
                borderBottom: "1px solid " + colors.border,
              }}
            >
              <span
                style={{
                  width: 105,
                  textAlign: "center",
                  fontSize: 10,
                  fontWeight: 600,
                  color: colors.muted,
                  textTransform: "uppercase",
                  lineHeight: "1.3",
                }}
              >
                {e}
              </span>
              <div style={{ flex: 1, height: isLast ? 110 : 80 }}>
                <ResponsiveContainer width="100%" height={isLast ? 110 : 80}>
                  <LineChart
                    data={data}
                    margin={{ top: 16, right: 20, bottom: 0, left: 20 }}
                  >
                    <XAxis
                      dataKey="month"
                      tick={
                        isLast ? { fontSize: 8, fill: colors.muted } : false
                      }
                      interval={0}
                      angle={isLast ? -30 : 0}
                      textAnchor={isLast ? "end" : "middle"}
                      height={isLast ? 45 : 10}
                      axisLine={false}
                      tickLine={false}
                      padding={{ left: 15, right: 15 }}
                    />
                    <YAxis hide domain={[0, "auto"]} />
                    <Tooltip {...tooltipStyle} formatter={formatTooltipPct} />
                    <Line
                      type="linear"
                      dataKey="rate"
                      isAnimationActive={false}
                      connectNulls
                      stroke={colors.tealLight}
                      strokeWidth={2}
                      dot={{ fill: colors.teal, r: 2, strokeWidth: 0 }}
                      label={<PctLabel />}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <AccumKpiBox label="Acumulado" value={kpi.toFixed(2) + "%"} />
            </div>
          );
        })}
      </DashCard>
    </>
  );
}
