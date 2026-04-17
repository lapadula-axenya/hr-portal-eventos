"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ReactECharts from "echarts-for-react";
import {
  Coins,
  FileWarning,
  FlaskConical,
  Receipt,
  ShieldAlert,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { OverflowBox, PageContainer } from "@/components";
import { AnalyticsKpiCard } from "../_components/AnalyticsKpiCard";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MONTHS_SHORT = [
  "mai/25", "jun/25", "jul/25", "ago/25", "set/25", "out/25",
  "nov/25", "dez/25", "jan/26", "fev/26", "mar/26", "abr/26",
];

const ECONOMY_SERIE = [
  { mes: "mai/25", noMes: 4200, acumulada: 4200 },
  { mes: "jun/25", noMes: 6800, acumulada: 11000 },
  { mes: "jul/25", noMes: 7400, acumulada: 18400 },
  { mes: "ago/25", noMes: 9100, acumulada: 27500 },
  { mes: "set/25", noMes: 11300, acumulada: 38800 },
  { mes: "out/25", noMes: 12900, acumulada: 51700 },
  { mes: "nov/25", noMes: 14200, acumulada: 65900 },
  { mes: "dez/25", noMes: 13800, acumulada: 79700 },
  { mes: "jan/26", noMes: 15400, acumulada: 95100 },
  { mes: "fev/26", noMes: 16100, acumulada: 111200 },
  { mes: "mar/26", noMes: 17000, acumulada: 128200 },
  { mes: "abr/26", noMes: 18700, acumulada: 146900 },
];

const CATEGORIAS = [
  { categoria: "Reembolsos fora de diretriz", valorRecuperado: 45200, nCasos: 127 },
  { categoria: "Cobranças duplicadas", valorRecuperado: 28900, nCasos: 89 },
  { categoria: "Med. sem autorização", valorRecuperado: 22400, nCasos: 43 },
  { categoria: "Exames repetidos", valorRecuperado: 19800, nCasos: 67 },
  { categoria: "Coparticipação indevida", valorRecuperado: 12300, nCasos: 94 },
  { categoria: "Outros", valorRecuperado: 6200, nCasos: 28 },
];

const PARCEIROS = [
  { parceiro: "Hospital São Paulo", nGlosas: 38, valorRecuperado: 28400 },
  { parceiro: "Fleury Medicina", nGlosas: 29, valorRecuperado: 19100 },
  { parceiro: "Amil Assistência", nGlosas: 24, valorRecuperado: 15800 },
  { parceiro: "Dasa Diagnósticos", nGlosas: 21, valorRecuperado: 12900 },
  { parceiro: "Prevent Senior", nGlosas: 18, valorRecuperado: 11200 },
  { parceiro: "SBD Farmácias", nGlosas: 15, valorRecuperado: 8700 },
  { parceiro: "Clínica Einstein", nGlosas: 12, valorRecuperado: 7300 },
  { parceiro: "Rede D'Or", nGlosas: 10, valorRecuperado: 6100 },
];

const AUDITORIAS_RECENTES = [
  {
    id: "AUD-2247", data: "14/04/2026", categoria: "Cobrança duplicada",
    parceiro: "Fleury Medicina", valorOriginal: 4800, valorApos: 2400,
    economia: 2400, pct: 50, status: "recuperado",
  },
  {
    id: "AUD-2246", data: "12/04/2026", categoria: "Reembolso fora de diretriz",
    parceiro: "Hospital São Paulo", valorOriginal: 12300, valorApos: 0,
    economia: 12300, pct: 100, status: "recuperado",
  },
  {
    id: "AUD-2244", data: "10/04/2026", categoria: "Med. sem autorização",
    parceiro: "SBD Farmácias", valorOriginal: 8900, valorApos: 8900,
    economia: 0, pct: 0, status: "em_negociacao",
  },
  {
    id: "AUD-2241", data: "08/04/2026", categoria: "Exame repetido",
    parceiro: "Dasa Diagnósticos", valorOriginal: 3200, valorApos: 1600,
    economia: 1600, pct: 50, status: "recuperado",
  },
  {
    id: "AUD-2238", data: "05/04/2026", categoria: "Coparticipação indevida",
    parceiro: "Amil Assistência", valorOriginal: 760, valorApos: 0,
    economia: 760, pct: 100, status: "recuperado",
  },
  {
    id: "AUD-2235", data: "03/04/2026", categoria: "Reembolso fora de diretriz",
    parceiro: "Hospital São Paulo", valorOriginal: 6700, valorApos: 6700,
    economia: 0, pct: 0, status: "perdido",
  },
  {
    id: "AUD-2230", data: "28/03/2026", categoria: "Med. sem autorização",
    parceiro: "Rede D'Or", valorOriginal: 15400, valorApos: 9200,
    economia: 6200, pct: 40, status: "recuperado",
  },
  {
    id: "AUD-2228", data: "25/03/2026", categoria: "Cobrança duplicada",
    parceiro: "Prevent Senior", valorOriginal: 2100, valorApos: 1050,
    economia: 1050, pct: 50, status: "em_negociacao",
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  recuperado: { label: "Recuperado", color: "#25E9C4", bg: "rgba(37,233,196,0.10)" },
  em_negociacao: { label: "Em negociação", color: "#FFB420", bg: "rgba(255,180,32,0.10)" },
  perdido: { label: "Perdido", color: "#F6685E", bg: "rgba(246,104,94,0.10)" },
};

const categoryConfig: Record<string, { icon: LucideIcon; tint: string }> = {
  "Cobrança duplicada": { icon: Receipt, tint: "#5EAEFF" },
  "Reembolso fora de diretriz": { icon: FileWarning, tint: "#FFB420" },
  "Med. sem autorização": { icon: ShieldAlert, tint: "#F6685E" },
  "Exame repetido": { icon: FlaskConical, tint: "#C084FC" },
  "Coparticipação indevida": { icon: Coins, tint: "#25E9C4" },
};

const partnerPalette = ["#5EAEFF", "#25E9C4", "#FFB420", "#C084FC", "#F6685E", "#50EDCF", "#7E7E7E", "#5EAEFF"];

function partnerAccent(name: string) {
  const hash = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return partnerPalette[hash % partnerPalette.length];
}

function partnerInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const fmt = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const TOOLTIP_BASE = {
  backgroundColor: "#1C1C1C",
  borderColor: "#3b3b3b",
  textStyle: { color: "#ffffff", fontSize: 12 },
};

// ─── Chart builders ──────────────────────────────────────────────────────────

function buildEconomySerie() {
  return {
    backgroundColor: "transparent",
    tooltip: {
      ...TOOLTIP_BASE,
      trigger: "axis",
      axisPointer: { type: "cross", crossStyle: { color: "#7E7E7E" } },
    },
    legend: {
      data: ["Economia no mês", "Acumulado"],
      textStyle: { color: "#A6A7A9", fontSize: 11 },
      bottom: 0,
    },
    grid: { left: "2%", right: "5%", bottom: "14%", top: "6%", containLabel: true },
    xAxis: {
      type: "category",
      data: MONTHS_SHORT,
      axisLabel: { color: "#A6A7A9", fontSize: 10, rotate: 30 },
      axisLine: { lineStyle: { color: "#252427" } },
      axisTick: { lineStyle: { color: "#252427" } },
    },
    yAxis: [
      {
        type: "value",
        name: "Mensal (R$)",
        nameTextStyle: { color: "#A6A7A9", fontSize: 10 },
        axisLabel: {
          color: "#A6A7A9",
          fontSize: 9,
          formatter: (v: number) => `R$ ${(v / 1000).toFixed(0)}k`,
        },
        splitLine: { lineStyle: { color: "#252427", type: "dashed" } },
      },
      {
        type: "value",
        name: "Acumulado (R$)",
        nameTextStyle: { color: "#A6A7A9", fontSize: 10 },
        axisLabel: {
          color: "#A6A7A9",
          fontSize: 9,
          formatter: (v: number) => `R$ ${(v / 1000).toFixed(0)}k`,
        },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: "Economia no mês",
        type: "bar",
        data: ECONOMY_SERIE.map((d) => d.noMes),
        itemStyle: { color: "#25E9C4", borderRadius: [3, 3, 0, 0] },
      },
      {
        name: "Acumulado",
        type: "line",
        yAxisIndex: 1,
        data: ECONOMY_SERIE.map((d) => d.acumulada),
        color: "#50EDCF",
        lineStyle: { color: "#50EDCF", width: 2 },
        symbol: "circle",
        symbolSize: 5,
        areaStyle: { color: "rgba(80,237,207,0.07)" },
      },
    ],
  };
}

function buildCategoriasOption() {
  const sorted = [...CATEGORIAS].sort((a, b) => a.valorRecuperado - b.valorRecuperado);
  return {
    backgroundColor: "transparent",
    tooltip: {
      ...TOOLTIP_BASE,
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: Array<{ name: string; value: number; seriesName: string }>) => {
        const cat = CATEGORIAS.find((c) => c.categoria === params[0].name);
        return `${params[0].name}<br/><b>${fmt(params[0].value)}</b> recuperados · <b>${cat?.nCasos ?? 0}</b> casos`;
      },
    },
    grid: { left: "2%", right: "10%", top: "4%", bottom: "4%", containLabel: true },
    xAxis: {
      type: "value",
      axisLabel: {
        color: "#A6A7A9",
        fontSize: 10,
        formatter: (v: number) => `R$ ${(v / 1000).toFixed(0)}k`,
      },
      splitLine: { lineStyle: { color: "#252427", type: "dashed" } },
    },
    yAxis: {
      type: "category",
      data: sorted.map((d) => d.categoria),
      axisLabel: { color: "#A6A7A9", fontSize: 11 },
      axisLine: { lineStyle: { color: "#252427" } },
    },
    series: [
      {
        type: "bar",
        data: sorted.map((d) => d.valorRecuperado),
        itemStyle: { color: "#25E9C4", borderRadius: [0, 3, 3, 0] },
        label: {
          show: true,
          position: "right",
          formatter: (p: { value: number }) => fmt(p.value),
          color: "#A6A7A9",
          fontSize: 10,
        },
      },
    ],
  };
}

function buildRankingOption() {
  const sorted = [...PARCEIROS].sort((a, b) => a.valorRecuperado - b.valorRecuperado);
  return {
    backgroundColor: "transparent",
    tooltip: {
      ...TOOLTIP_BASE,
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: Array<{ name: string; value: number }>) => {
        const p = PARCEIROS.find((x) => x.parceiro === params[0].name);
        return `${params[0].name}<br/><b>${fmt(params[0].value)}</b> recuperados · <b>${p?.nGlosas ?? 0}</b> glosas`;
      },
    },
    grid: { left: "2%", right: "12%", top: "4%", bottom: "4%", containLabel: true },
    xAxis: {
      type: "value",
      axisLabel: {
        color: "#A6A7A9",
        fontSize: 10,
        formatter: (v: number) => `R$ ${(v / 1000).toFixed(0)}k`,
      },
      splitLine: { lineStyle: { color: "#252427", type: "dashed" } },
    },
    yAxis: {
      type: "category",
      data: sorted.map((d) => d.parceiro),
      axisLabel: { color: "#A6A7A9", fontSize: 10 },
      axisLine: { lineStyle: { color: "#252427" } },
    },
    series: [
      {
        type: "bar",
        data: sorted.map((d) => d.valorRecuperado),
        itemStyle: {
          color: (params: { dataIndex: number }) => {
            const colors = ["#3b3b3b", "#3b3b3b", "#3b3b3b", "#3b3b3b", "#50EDCF", "#50EDCF", "#25E9C4", "#25E9C4"];
            return colors[params.dataIndex] ?? "#25E9C4";
          },
          borderRadius: [0, 3, 3, 0],
        },
        label: {
          show: true,
          position: "right",
          formatter: (p: { value: number }) => fmt(p.value),
          color: "#A6A7A9",
          fontSize: 10,
        },
      },
    ],
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function AuditoriaPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("12");
  const [categoria, setCategoria] = useState("todas");
  const [status, setStatus] = useState("todos");

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 750);
    return () => clearTimeout(t);
  }, []);

  const filteredAuditorias = AUDITORIAS_RECENTES.filter((a) => {
    if (categoria !== "todas" && !a.categoria.toLowerCase().includes(categoria)) return false;
    if (status !== "todos" && a.status !== status) return false;
    return true;
  });

  return (
    <PageContainer title="Auditoria e economia">
      <OverflowBox>
        <Stack gap={2} pb={2}>
          {/* Subtítulo */}
          <Typography variant="body2" color="grey.100">
            Auditoria ativa dos seus reembolsos e parceiros: onde encontramos economia e onde ainda há oportunidade.
          </Typography>

          {/* Filtros */}
          <Stack direction="row" flexWrap="wrap" gap={1.5} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 170 }}>
              <InputLabel>Período</InputLabel>
              <Select
                value={period}
                label="Período"
                onChange={(e) => setPeriod(e.target.value)}
              >
                <MenuItem value="6">Últimos 6 meses</MenuItem>
                <MenuItem value="12">Últimos 12 meses</MenuItem>
                <MenuItem value="24">Últimos 24 meses</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Categoria de glosa</InputLabel>
              <Select
                value={categoria}
                label="Categoria de glosa"
                onChange={(e) => setCategoria(e.target.value)}
              >
                <MenuItem value="todas">Todas</MenuItem>
                <MenuItem value="cobrança duplicada">Cobranças duplicadas</MenuItem>
                <MenuItem value="reembolso">Reembolsos fora de diretriz</MenuItem>
                <MenuItem value="med.">Med. sem autorização</MenuItem>
                <MenuItem value="exame">Exames repetidos</MenuItem>
                <MenuItem value="coparticipação">Coparticipação indevida</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="todos">Todos</MenuItem>
                <MenuItem value="recuperado">Recuperado</MenuItem>
                <MenuItem value="em_negociacao">Em negociação</MenuItem>
                <MenuItem value="perdido">Perdido</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* KPIs */}
          <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
            <AnalyticsKpiCard
              isLoading={isLoading}
              label="Economia gerada (12 meses)"
              value="R$ 146.900"
              delta={{ label: "vs. período anterior", positive: true }}
            />
            <AnalyticsKpiCard
              isLoading={isLoading}
              label="Reembolsos auditados"
              value="1.847"
              footnote="no período selecionado"
            />
            <AnalyticsKpiCard
              isLoading={isLoading}
              label="Taxa de glosas procedentes"
              value="28,4%"
              footnote="resultaram em economia real"
            />
            <AnalyticsKpiCard
              isLoading={isLoading}
              label="Tempo médio de auditoria"
              value="3,2 dias"
              footnote="SLA interno"
            />
          </Stack>

          {/* Série temporal */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} color="white" mb={0.5}>
                Evolução da economia
              </Typography>
              <Typography variant="caption" color="grey.100" display="block" mb={2}>
                Economia mensal (barras) e total acumulado no período (linha)
              </Typography>

              {isLoading ? (
                <Skeleton variant="rectangular" height={280} />
              ) : (
                <ReactECharts
                  option={buildEconomySerie()}
                  style={{ height: "280px", width: "100%" }}
                  opts={{ renderer: "svg" }}
                  notMerge
                />
              )}
            </CardContent>
          </Card>

          {/* Categorias + Ranking lado a lado */}
          <Stack direction={{ xs: "column", md: "row" }} gap={1.5}>
            <Card variant="outlined" sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} color="white" mb={0.5}>
                  Onde encontramos economia
                </Typography>
                <Typography variant="caption" color="grey.100" display="block" mb={2}>
                  Valor recuperado por categoria de inconsistência
                </Typography>

                {isLoading ? (
                  <Skeleton variant="rectangular" height={240} />
                ) : (
                  <ReactECharts
                    option={buildCategoriasOption()}
                    style={{ height: "240px", width: "100%" }}
                    opts={{ renderer: "svg" }}
                    notMerge
                  />
                )}
              </CardContent>
            </Card>

            <Card variant="outlined" sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} color="white" mb={0.5}>
                  Parceiros com mais glosas
                </Typography>
                <Typography variant="caption" color="grey.100" display="block" mb={2}>
                  Top 8 por valor recuperado
                </Typography>

                {isLoading ? (
                  <Skeleton variant="rectangular" height={240} />
                ) : (
                  <ReactECharts
                    option={buildRankingOption()}
                    style={{ height: "240px", width: "100%" }}
                    opts={{ renderer: "svg" }}
                    notMerge
                  />
                )}
              </CardContent>
            </Card>
          </Stack>

          {/* Tabela de auditorias recentes */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} color="white" mb={0.5}>
                Auditorias recentes
              </Typography>
              <Typography variant="caption" color="grey.100" display="block" mb={2}>
                {filteredAuditorias.length} registro{filteredAuditorias.length !== 1 ? "s" : ""} encontrado{filteredAuditorias.length !== 1 ? "s" : ""}
              </Typography>

              {isLoading ? (
                <Stack gap={1}>
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={40} />
                  ))}
                </Stack>
              ) : filteredAuditorias.length === 0 ? (
                <Typography variant="body2" color="grey.100" sx={{ py: 3, textAlign: "center" }}>
                  Nenhuma auditoria encontrada para os filtros selecionados.
                </Typography>
              ) : (
                <TableContainer>
                  <Table
                    size="small"
                    sx={{
                      "& td, & th": {
                        padding: "14px 16px",
                        borderBottom: "1px solid",
                        borderColor: "grey.700",
                        background: "transparent",
                      },
                      "& th": {
                        background: "transparent",
                        textTransform: "uppercase",
                        letterSpacing: "0.6px",
                        fontSize: 10,
                        fontWeight: 600,
                        color: "grey.300",
                        padding: "10px 16px",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ width: 96 }}>ID</TableCell>
                        <TableCell sx={{ width: 110 }}>Data</TableCell>
                        <TableCell>Categoria</TableCell>
                        <TableCell>Parceiro</TableCell>
                        <TableCell align="right" sx={{ width: 110 }}>Valor orig.</TableCell>
                        <TableCell align="right" sx={{ width: 120 }}>Pós-auditoria</TableCell>
                        <TableCell align="right" sx={{ width: 180 }}>Economia</TableCell>
                        <TableCell align="right" sx={{ width: 140 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredAuditorias.map((aud) => {
                        const s = statusConfig[aud.status];
                        const cat = categoryConfig[aud.categoria] ?? { icon: Tag, tint: "#7E7E7E" };
                        const CatIcon = cat.icon;
                        const accent = partnerAccent(aud.parceiro);
                        return (
                          <TableRow
                            key={aud.id}
                            sx={{
                              transition: "background-color 120ms ease",
                              "&:last-child td": { border: 0 },
                              "&:hover": { bgcolor: "rgba(37,233,196,0.04)" },
                              "&:hover td:first-of-type": {
                                boxShadow: "inset 2px 0 0 0 #25E9C4",
                              },
                            }}
                          >
                            <TableCell>
                              <Box
                                component="span"
                                sx={{
                                  display: "inline-block",
                                  px: 0.85,
                                  py: 0.2,
                                  borderRadius: 0.75,
                                  bgcolor: "grey.900",
                                  border: "1px solid",
                                  borderColor: "grey.700",
                                  color: "white",
                                  fontFamily: "monospace",
                                  fontSize: 10.5,
                                  letterSpacing: "0.3px",
                                }}
                              >
                                {aud.id}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ color: "grey.100", fontSize: 12, whiteSpace: "nowrap" }}>
                              {aud.data}
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" gap={1.1} alignItems="center">
                                <Box
                                  sx={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 1,
                                    bgcolor: `${cat.tint}1F`,
                                    color: cat.tint,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <CatIcon size={14} strokeWidth={2} />
                                </Box>
                                <Typography sx={{ color: "grey.100", fontSize: 12 }}>
                                  {aud.categoria}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" gap={1} alignItems="center">
                                <Box
                                  sx={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: "50%",
                                    bgcolor: `${accent}1F`,
                                    color: accent,
                                    border: `1px solid ${accent}33`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    letterSpacing: "0.3px",
                                    flexShrink: 0,
                                  }}
                                >
                                  {partnerInitials(aud.parceiro)}
                                </Box>
                                <Typography sx={{ color: "grey.100", fontSize: 12 }}>
                                  {aud.parceiro}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                color: "grey.100",
                                fontSize: 12,
                                fontVariantNumeric: "tabular-nums",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {fmt(aud.valorOriginal)}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                color: aud.valorApos === 0 ? "grey.300" : "white",
                                fontSize: 12,
                                fontWeight: aud.valorApos === 0 ? 400 : 600,
                                fontVariantNumeric: "tabular-nums",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {fmt(aud.valorApos)}
                            </TableCell>
                            <TableCell align="right">
                              {aud.economia > 0 ? (
                                <Stack gap={0.5} alignItems="flex-end">
                                  <Stack direction="row" gap={0.75} alignItems="baseline">
                                    <Typography
                                      sx={{
                                        color: "#25E9C4",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        fontVariantNumeric: "tabular-nums",
                                      }}
                                    >
                                      {fmt(aud.economia)}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        color: "grey.300",
                                        fontSize: 10,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {aud.pct}%
                                    </Typography>
                                  </Stack>
                                  <Box
                                    sx={{
                                      width: 88,
                                      height: 3,
                                      bgcolor: "grey.700",
                                      borderRadius: 2,
                                      overflow: "hidden",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: `${aud.pct}%`,
                                        height: "100%",
                                        background:
                                          "linear-gradient(90deg, #25E9C4 0%, #50EDCF 100%)",
                                        transition: "width 400ms ease",
                                      }}
                                    />
                                  </Box>
                                </Stack>
                              ) : (
                                <Typography sx={{ color: "grey.300", fontSize: 12 }}>—</Typography>
                              )}
                            </TableCell>
                            <TableCell align="right">
                              <Box
                                sx={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 0.75,
                                  px: 1,
                                  py: 0.4,
                                  borderRadius: 999,
                                  bgcolor: s.bg,
                                  border: `1px solid ${s.color}33`,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    bgcolor: s.color,
                                    boxShadow: `0 0 0 2px ${s.color}22`,
                                  }}
                                />
                                <Typography
                                  sx={{
                                    color: s.color,
                                    fontSize: 10.5,
                                    fontWeight: 600,
                                    letterSpacing: "0.3px",
                                  }}
                                >
                                  {s.label}
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>

          <Divider sx={{ borderColor: "grey.700" }} />
          <Typography variant="caption" color="grey.300" textAlign="center" pb={1}>
            Dados referentes à Acme · Período: últimos {period} meses · Atualizado em 16/04/2026
          </Typography>
        </Stack>
      </OverflowBox>
    </PageContainer>
  );
}
