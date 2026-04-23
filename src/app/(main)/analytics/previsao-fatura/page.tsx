"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ReactECharts from "echarts-for-react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { OverflowBox, PageContainer } from "@/components";
import { AnalyticsKpiCard } from "../_components/AnalyticsKpiCard";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MONTHS = [
  "jan/25",
  "fev/25",
  "mar/25",
  "abr/25",
  "mai/25",
  "jun/25",
  "jul/25",
  "ago/25",
  "set/25",
  "out/25",
  "nov/25",
  "dez/25",
  "jan/26",
  "fev/26",
  "mar/26",
  "abr/26",
  "mai/26",
  "jun/26",
  "jul/26",
  "ago/26",
  "set/26",
  "out/26",
  "nov/26",
  "dez/26",
  "jan/27",
  "fev/27",
  "mar/27",
  "abr/27",
];

const HOJE_IDX = 15; // abr/26

const CURRENT_TRAJECTORY = [
  392000, 385000, 401000, 410000, 398000, 415000, 422000, 430000, 418000,
  443000, 451000, 467000, 458000, 473000, 482000, 487350, 498000, 510000,
  521000, 533000, 546000, 558000, 571000, 583000, 596000, 609000, 622000,
  636000,
];

// Com Axenya: mesma história, projeção controlada a partir de mai/26
const AXENYA_TRAJECTORY = [
  ...CURRENT_TRAJECTORY.slice(0, HOJE_IDX + 1),
  491000,
  491500,
  492000,
  492000,
  492500,
  492500,
  493000,
  493000,
  493500,
  493500,
  494000,
  494000,
];

const fmt = (n: number) =>
  n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

const COST_BREAKDOWN = [
  { categoria: "Internações", valor: 134200, pct: 27.5 },
  { categoria: "Exames", valor: 112300, pct: 23.0 },
  { categoria: "Consultas", valor: 98500, pct: 20.2 },
  { categoria: "Med. alto custo", valor: 67800, pct: 13.9 },
  { categoria: "Terapias", valor: 48200, pct: 9.9 },
  { categoria: "Outros", valor: 26350, pct: 5.4 },
];

const TOOLTIP_BASE = {
  backgroundColor: "#1C1C1C",
  borderColor: "#3b3b3b",
  textStyle: { color: "#ffffff", fontSize: 12 },
};

// ─── Chart builders ──────────────────────────────────────────────────────────

function buildLineOption(showAxenya: boolean, isMobile: boolean) {
  const histCurrent = CURRENT_TRAJECTORY.slice(0, HOJE_IDX + 1);
  const projCurrent = CURRENT_TRAJECTORY.slice(HOJE_IDX);
  const histAxenya = AXENYA_TRAJECTORY.slice(0, HOJE_IDX + 1);
  const projAxenya = AXENYA_TRAJECTORY.slice(HOJE_IDX);

  const monthsFull = MONTHS;
  const nullsBefore = Array(HOJE_IDX).fill(null);

  const allValues = [...CURRENT_TRAJECTORY, ...AXENYA_TRAJECTORY];
  const yMin = Math.floor((Math.min(...allValues) * 0.92) / 10000) * 10000;
  const yMax = Math.ceil((Math.max(...allValues) * 1.04) / 10000) * 10000;

  return {
    backgroundColor: "transparent",
    tooltip: {
      ...TOOLTIP_BASE,
      trigger: "axis",
      formatter: (
        params: Array<{
          axisValue: string;
          value: number;
          seriesName: string;
          color: string;
        }>,
      ) => {
        let html = `<b>${params[0].axisValue}</b><br/>`;
        params.forEach((p) => {
          if (p.value != null)
            html += `<span style="color:${p.color}">●</span> ${p.seriesName}: <b>${fmt(p.value)}</b><br/>`;
        });
        return html;
      },
    },
    legend: {
      data: showAxenya
        ? ["Trajetória atual", "Com gestão Axenya"]
        : ["Trajetória atual"],
      textStyle: { color: "#A6A7A9", fontSize: isMobile ? 10 : 11 },
      bottom: 0,
    },
    grid: {
      left: isMobile ? "1%" : "2%",
      right: isMobile ? "3%" : "2%",
      bottom: isMobile ? "18%" : "14%",
      top: "6%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: monthsFull,
      axisLabel: {
        color: "#A6A7A9",
        fontSize: isMobile ? 9 : 10,
        rotate: isMobile ? 60 : 30,
        interval: isMobile ? 2 : "auto",
      },
      axisLine: { lineStyle: { color: "#252427" } },
      axisTick: { lineStyle: { color: "#252427" } },
    },
    yAxis: {
      type: "value",
      min: yMin,
      max: yMax,
      scale: true,
      axisLabel: {
        color: "#A6A7A9",
        fontSize: isMobile ? 9 : 10,
        formatter: (v: number) => `R$ ${(v / 1000).toFixed(0)}k`,
      },
      splitLine: { lineStyle: { color: "#252427", type: "dashed" } },
    },
    series: [
      // histórico compartilhado (cinza)
      {
        name: "Trajetória atual",
        type: "line",
        data: [...histCurrent, ...projCurrent.slice(1)],
        color: "#7E7E7E",
        lineStyle: { color: "#7E7E7E", width: 2 },
        symbol: "none",
        areaStyle: { color: "rgba(126,126,126,0.06)" },
        markLine: {
          silent: true,
          symbol: ["none", "none"],
          data: [{ xAxis: HOJE_IDX }],
          lineStyle: { color: "#7E7E7E", type: "dashed", width: 1 },
          label: {
            formatter: "Hoje",
            color: "#A6A7A9",
            fontSize: 10,
            position: "insideEndTop",
          },
        },
      },
      ...(showAxenya
        ? [
            {
              name: "Com gestão Axenya",
              type: "line",
              data: [
                ...nullsBefore,
                ...histAxenya.slice(-1),
                ...projAxenya.slice(1),
              ],
              color: "#25E9C4",
              lineStyle: { color: "#25E9C4", width: 2 },
              symbol: "none",
              areaStyle: { color: "rgba(37,233,196,0.08)" },
            },
          ]
        : []),
    ],
  };
}

function buildBreakdownOption(isMobile: boolean) {
  const sorted = [...COST_BREAKDOWN].sort((a, b) => a.valor - b.valor);
  const maxValue = Math.max(...sorted.map((d) => d.valor));
  return {
    backgroundColor: "transparent",
    tooltip: {
      ...TOOLTIP_BASE,
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: Array<{ name: string; value: number }>) =>
        `${params[0].name}<br/><b>${fmt(params[0].value)}</b> (${COST_BREAKDOWN.find((c) => c.categoria === params[0].name)?.pct ?? ""}%)`,
    },
    grid: {
      left: "2%",
      right: isMobile ? "16%" : "12%",
      top: "4%",
      bottom: "4%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      max: Math.ceil((maxValue * 1.15) / 10000) * 10000,
      axisLabel: {
        color: "#A6A7A9",
        fontSize: isMobile ? 9 : 10,
        formatter: (v: number) => `R$ ${(v / 1000).toFixed(0)}k`,
      },
      splitLine: { lineStyle: { color: "#252427", type: "dashed" } },
    },
    yAxis: {
      type: "category",
      data: sorted.map((d) => d.categoria),
      axisLabel: {
        color: "#A6A7A9",
        fontSize: isMobile ? 10 : 11,
        formatter: (v: string) =>
          isMobile && v.length > 14 ? `${v.slice(0, 13)}…` : v,
      },
      axisLine: { lineStyle: { color: "#252427" } },
    },
    series: [
      {
        type: "bar",
        data: sorted.map((d) => d.valor),
        itemStyle: { color: "#25E9C4", borderRadius: [0, 3, 3, 0] },
        label: {
          show: true,
          position: "right",
          formatter: (p: { value: number }) =>
            isMobile ? `R$ ${(p.value / 1000).toFixed(0)}k` : fmt(p.value),
          color: "#A6A7A9",
          fontSize: isMobile ? 9 : 10,
        },
      },
    ],
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function PrevisaoFaturaPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("12");
  const [horizon, setHorizon] = useState("12");
  const [showAxenya, setShowAxenya] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const projecao12m = CURRENT_TRAJECTORY.slice(HOJE_IDX + 1).reduce(
    (a, b) => a + b,
    0,
  );
  const axenya12m = AXENYA_TRAJECTORY.slice(HOJE_IDX + 1).reduce(
    (a, b) => a + b,
    0,
  );
  const economia = projecao12m - axenya12m;

  return (
    <PageContainer title="Previsão de fatura">
      <OverflowBox>
        <Stack gap={2} pb={2}>
          {/* Subtítulo */}
          <Typography variant="body2" color="grey.100">
            Projeção da sua fatura de benefícios e impacto potencial da gestão
            Axenya nos próximos 12 meses.
          </Typography>

          {/* Filtros */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            flexWrap="wrap"
            gap={1.5}
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            <FormControl
              size="small"
              sx={{ minWidth: { sm: 190 }, width: { xs: "100%", sm: "auto" } }}
            >
              <InputLabel>Período histórico</InputLabel>
              <Select
                value={period}
                label="Período histórico"
                onChange={(e) => setPeriod(e.target.value)}
              >
                <MenuItem value="6">Últimos 6 meses</MenuItem>
                <MenuItem value="12">Últimos 12 meses</MenuItem>
                <MenuItem value="24">Últimos 24 meses</MenuItem>
                <MenuItem value="36">Últimos 36 meses</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              size="small"
              sx={{ minWidth: { sm: 200 }, width: { xs: "100%", sm: "auto" } }}
            >
              <InputLabel>Horizonte de projeção</InputLabel>
              <Select
                value={horizon}
                label="Horizonte de projeção"
                onChange={(e) => setHorizon(e.target.value)}
              >
                <MenuItem value="6">Próximos 6 meses</MenuItem>
                <MenuItem value="12">Próximos 12 meses</MenuItem>
                <MenuItem value="18">Próximos 18 meses</MenuItem>
                <MenuItem value="24">Próximos 24 meses</MenuItem>
              </Select>
            </FormControl>

            <Button
              size="small"
              variant={showAxenya ? "outlined" : "text"}
              color={showAxenya ? "primary" : "inherit"}
              startIcon={
                showAxenya ? <EyeIcon size={14} /> : <EyeOffIcon size={14} />
              }
              onClick={() => setShowAxenya((v) => !v)}
              sx={{ borderRadius: "6px", width: { xs: "100%", sm: "auto" } }}
            >
              Curva com Axenya
            </Button>
          </Stack>

          {/* KPIs */}
          <Box
            sx={{
              display: "grid",
              gap: 1.5,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
            }}
          >
            <AnalyticsKpiCard
              isLoading={isLoading}
              label="Fatura atual (abr/26)"
              value={fmt(487350)}
            />
            <AnalyticsKpiCard
              isLoading={isLoading}
              label="Variação vs. ano anterior"
              value="+12,3%"
              delta={{ label: "vs. abr/25", positive: false }}
              footnote="alta de sinistralidade"
            />
            <AnalyticsKpiCard
              isLoading={isLoading}
              label="Projeção 12m (sem intervenção)"
              value={fmt(projecao12m)}
              footnote="mai/26 a abr/27"
            />
            <AnalyticsKpiCard
              isLoading={isLoading}
              label="Economia potencial"
              value={fmt(economia)}
              delta={{ label: "vs. trajetória atual", positive: true }}
            />
          </Box>

          {/* Gráfico de linhas */}
          <Card variant="outlined">
            <CardContent sx={{ px: { xs: 1.5, sm: 2 } }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                gap={1}
                mb={1.5}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color="white"
                  >
                    Trajetória da fatura mensal
                  </Typography>
                  <Typography variant="caption" color="grey.100">
                    Histórico + projeção · Linha pontilhada marca o mês atual
                  </Typography>
                </Box>
                {showAxenya && (
                  <Chip
                    label="Área = economia potencial"
                    size="small"
                    sx={{
                      bgcolor: "rgba(37,233,196,0.12)",
                      color: "primary.main",
                      border: "1px solid",
                      borderColor: "primary.main",
                    }}
                  />
                )}
              </Stack>

              {isLoading ? (
                <Skeleton variant="rectangular" height={isMobile ? 280 : 360} />
              ) : (
                <ReactECharts
                  option={buildLineOption(showAxenya, isMobile)}
                  style={{
                    height: isMobile ? "280px" : "360px",
                    width: "100%",
                  }}
                  opts={{ renderer: "svg" }}
                  notMerge
                />
              )}
            </CardContent>
          </Card>

          {/* Quebra por categoria */}
          <Card variant="outlined">
            <CardContent sx={{ px: { xs: 1.5, sm: 2 } }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="white"
                mb={0.5}
              >
                Quebra de custo — mês atual (abr/26)
              </Typography>
              <Typography
                variant="caption"
                color="grey.100"
                display="block"
                mb={2}
              >
                Distribuição da fatura de {fmt(487350)} por categoria de
                utilização
              </Typography>

              {isLoading ? (
                <Skeleton variant="rectangular" height={isMobile ? 280 : 240} />
              ) : (
                <ReactECharts
                  option={buildBreakdownOption(isMobile)}
                  style={{
                    height: isMobile ? "280px" : "240px",
                    width: "100%",
                  }}
                  opts={{ renderer: "svg" }}
                  notMerge
                />
              )}
            </CardContent>
          </Card>

          <Divider sx={{ borderColor: "grey.700" }} />
          <Typography
            variant="caption"
            color="grey.300"
            textAlign="center"
            pb={1}
          >
            Dados referentes à Acme · Atualizado em 16/04/2026 · Projeções
            baseadas em tendência histórica
          </Typography>
        </Stack>
      </OverflowBox>
    </PageContainer>
  );
}
