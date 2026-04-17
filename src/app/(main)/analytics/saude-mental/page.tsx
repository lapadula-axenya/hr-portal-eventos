"use client";

import { useEffect, useState } from "react";
import {
  Box,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ReactECharts from "echarts-for-react";
import { OverflowBox, PageContainer } from "@/components";
import { AnalyticsKpiCard } from "../_components/AnalyticsKpiCard";

// ─── Mock data ────────────────────────────────────────────────────────────────

const AGE_RANGES = ["18–28", "29–33", "34–38", "39–43", "44–48", "49+"];
const GENDERS = ["Feminino", "Masculino"];

const heatmapData: [number, number, number][] = [
  [0, 0, 24], [1, 0, 19], [2, 0, 16], [3, 0, 20], [4, 0, 25], [5, 0, 28],
  [0, 1, 18], [1, 1, 14], [2, 1, 11], [3, 1, 13], [4, 1, 17], [5, 1, 22],
];

const funnelData = [
  { value: 312, name: "Mapeados" },
  { value: 47, name: "Em atenção" },
  { value: 35, name: "Convidados" },
  { value: 23, name: "Em acompanhamento" },
  { value: 8, name: "Alta / estável" },
];

const buBarData = [
  { bu: "Tecnologia", n: 85, atencao: 14 },
  { bu: "Comercial", n: 120, atencao: 27 },
  { bu: "Operações", n: 145, atencao: 16 },
  { bu: "Marketing", n: 60, atencao: 18 },
  { bu: "RH", n: 45, atencao: 6 },
  { bu: "Financeiro", n: 45, atencao: 5 },
];

const casosAtivos = [
  { codigo: "CASO-0041", entrada: "jan/26", status: "em_acompanhamento", proxima: "22/04/2026" },
  { codigo: "CASO-0038", entrada: "jan/26", status: "em_acompanhamento", proxima: "24/04/2026" },
  { codigo: "CASO-0035", entrada: "dez/25", status: "em_acompanhamento", proxima: "18/04/2026" },
  { codigo: "CASO-0031", entrada: "dez/25", status: "novo", proxima: "17/04/2026" },
  { codigo: "CASO-0028", entrada: "nov/25", status: "em_alta", proxima: "30/04/2026" },
  { codigo: "CASO-0024", entrada: "out/25", status: "em_acompanhamento", proxima: "29/04/2026" },
  { codigo: "CASO-0021", entrada: "out/25", status: "em_alta", proxima: "05/05/2026" },
  { codigo: "CASO-0019", entrada: "set/25", status: "em_acompanhamento", proxima: "25/04/2026" },
];

// ─── Chart configs ─────────────────────────────────────────────────────────

const TOOLTIP_BASE = {
  backgroundColor: "#1C1C1C",
  borderColor: "#3b3b3b",
  textStyle: { color: "#ffffff", fontSize: 12 },
};

function buildHeatmapOption() {
  return {
    backgroundColor: "transparent",
    tooltip: {
      ...TOOLTIP_BASE,
      position: "top",
      formatter: (p: { value: [number, number, number] }) =>
        `${GENDERS[p.value[1]]}, ${AGE_RANGES[p.value[0]]}<br/><b>${p.value[2]}%</b> em atenção`,
    },
    grid: { height: "52%", top: "8%", left: "12%", right: "6%", containLabel: false },
    xAxis: {
      type: "category",
      data: AGE_RANGES,
      axisLabel: { color: "#A6A7A9", fontSize: 11 },
      axisLine: { lineStyle: { color: "#252427" } },
      splitArea: { show: true, areaStyle: { color: ["#131314", "#0d0d0d"] } },
    },
    yAxis: {
      type: "category",
      data: GENDERS,
      axisLabel: { color: "#A6A7A9", fontSize: 11 },
      axisLine: { lineStyle: { color: "#252427" } },
      splitArea: { show: true, areaStyle: { color: ["#131314", "#0d0d0d"] } },
    },
    visualMap: {
      min: 0,
      max: 30,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "4%",
      inRange: { color: ["#111f1c", "#0f5f4e", "#25E9C4"] },
      textStyle: { color: "#A6A7A9", fontSize: 11 },
      text: ["30%", "0%"],
    },
    series: [
      {
        name: "Em atenção (%)",
        type: "heatmap",
        data: heatmapData,
        label: {
          show: true,
          formatter: (p: { value: [number, number, number] }) => `${p.value[2]}%`,
          color: "#ffffff",
          fontSize: 12,
          fontWeight: 600,
        },
        emphasis: { itemStyle: { shadowBlur: 8, shadowColor: "rgba(0,0,0,0.5)" } },
      },
    ],
  };
}

function buildFunnelOption() {
  const colors = ["#3b3b3b", "#FFB420", "#50EDCF", "#25E9C4", "#44A047"];
  return {
    backgroundColor: "transparent",
    tooltip: {
      ...TOOLTIP_BASE,
      trigger: "item",
      formatter: (p: { name: string; value: number }) =>
        `${p.name}<br/><b>${p.value}</b> colaboradores`,
    },
    series: [
      {
        type: "funnel",
        left: "8%",
        width: "84%",
        top: "5%",
        bottom: "5%",
        sort: "descending",
        gap: 2,
        label: {
          show: true,
          position: "inside",
          formatter: (p: { name: string; value: number }) => `${p.name}\n${p.value}`,
          color: "#ffffff",
          fontSize: 12,
        },
        itemStyle: { borderWidth: 0 },
        data: funnelData.map((d, i) => ({
          ...d,
          itemStyle: { color: colors[i] },
        })),
      },
    ],
  };
}

function buildBuBarOption() {
  return {
    backgroundColor: "transparent",
    tooltip: {
      ...TOOLTIP_BASE,
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      data: ["Regular", "Em atenção"],
      textStyle: { color: "#A6A7A9", fontSize: 11 },
      bottom: 0,
    },
    grid: { left: "3%", right: "4%", bottom: "12%", top: "4%", containLabel: true },
    xAxis: {
      type: "category",
      data: buBarData.map((d) => d.bu),
      axisLabel: { color: "#A6A7A9", fontSize: 11 },
      axisLine: { lineStyle: { color: "#252427" } },
      axisTick: { lineStyle: { color: "#252427" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#A6A7A9", fontSize: 11 },
      splitLine: { lineStyle: { color: "#252427", type: "dashed" } },
    },
    series: [
      {
        name: "Regular",
        type: "bar",
        stack: "total",
        data: buBarData.map((d) => d.n - d.atencao),
        itemStyle: { color: "#3b3b3b", borderRadius: [0, 0, 2, 2] },
      },
      {
        name: "Em atenção",
        type: "bar",
        stack: "total",
        data: buBarData.map((d) => d.atencao),
        itemStyle: { color: "#25E9C4", borderRadius: [2, 2, 0, 0] },
        label: {
          show: true,
          position: "top",
          formatter: (p: { value: number; dataIndex: number }) => {
            const bu = buBarData[p.dataIndex];
            return `${Math.round((bu.atencao / bu.n) * 100)}%`;
          },
          color: "#A6A7A9",
          fontSize: 10,
        },
      },
    ],
  };
}

const statusConfig: Record<string, { label: string; color: "warning" | "success" | "default" | "error" }> = {
  em_acompanhamento: { label: "Em acompanhamento", color: "warning" },
  em_alta: { label: "Em alta", color: "success" },
  novo: { label: "Novo", color: "default" },
  perdido: { label: "Perdido", color: "error" },
};

// ─── Page ──────────────────────────────────────────────────────────────────

export default function SaudeMentalPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("6");
  const [bu, setBu] = useState("todos");
  const [status, setStatus] = useState("todos");
  const [activeChart, setActiveChart] = useState<"heatmap" | "bu">("heatmap");

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageContainer title="NR-1 e saúde mental">
      <OverflowBox>
        <Stack gap={2} pb={2}>
          {/* Subtítulo */}
          <Typography variant="body2" color="grey.100" sx={{ px: { xs: 0, md: 0 } }}>
            Evidência clínica e populacional para adequação à NR-1 e gestão de saúde mental da sua empresa.
          </Typography>

          {/* Filtros */}
          <Stack direction="row" flexWrap="wrap" gap={1.5} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 160 }}>
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

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>BU / Setor</InputLabel>
              <Select value={bu} label="BU / Setor" onChange={(e) => setBu(e.target.value)}>
                <MenuItem value="todos">Todos</MenuItem>
                <MenuItem value="tecnologia">Tecnologia</MenuItem>
                <MenuItem value="comercial">Comercial</MenuItem>
                <MenuItem value="operacoes">Operações</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="rh">RH</MenuItem>
                <MenuItem value="financeiro">Financeiro</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status da jornada</InputLabel>
              <Select
                value={status}
                label="Status da jornada"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="todos">Todos</MenuItem>
                <MenuItem value="novo">Novo</MenuItem>
                <MenuItem value="em_acompanhamento">Em acompanhamento</MenuItem>
                <MenuItem value="em_alta">Em alta / estável</MenuItem>
                <MenuItem value="perdido">Perdido</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* KPIs */}
          <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
            <AnalyticsKpiCard
              isLoading={isLoading}
              label="Colaboradores mapeados"
              value="312 de 500"
              footnote="62% da força de trabalho"
            />
            <AnalyticsKpiCard
              isLoading={isLoading}
              label="Em faixa de atenção"
              value="47 colaboradores"
              delta={{ label: "15,1% dos mapeados", positive: false }}
            />
            <AnalyticsKpiCard
              isLoading={isLoading}
              label="Em jornada de cuidado ativa"
              value="23"
              footnote="c/ acompanhamento clínico"
            />
            <AnalyticsKpiCard
              isLoading={isLoading}
              label="Prazo NR-1"
              value="47 dias"
              footnote="vence em 02/06/2026"
            />
          </Stack>

          {/* Visualização principal */}
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} color="white">
                    Distribuição por risco psicossocial
                  </Typography>
                  <Typography variant="caption" color="grey.100">
                    % de colaboradores em faixa de atenção — gênero × faixa etária
                  </Typography>
                </Box>
                <Stack direction="row" gap={1}>
                  <Chip
                    label="Mapa de calor"
                    size="small"
                    variant={activeChart === "heatmap" ? "filled" : "outlined"}
                    color={activeChart === "heatmap" ? "primary" : "default"}
                    onClick={() => setActiveChart("heatmap")}
                    clickable
                  />
                  <Chip
                    label="Por BU"
                    size="small"
                    variant={activeChart === "bu" ? "filled" : "outlined"}
                    color={activeChart === "bu" ? "primary" : "default"}
                    onClick={() => setActiveChart("bu")}
                    clickable
                  />
                </Stack>
              </Stack>

              {isLoading ? (
                <Skeleton variant="rectangular" height={320} />
              ) : (
                <>
                  {activeChart === "heatmap" && (
                    <>
                      <ReactECharts
                        option={buildHeatmapOption()}
                        style={{ height: "320px", width: "100%" }}
                        opts={{ renderer: "svg" }}
                        notMerge
                      />
                      <Typography variant="caption" color="grey.300" display="block" mt={1}>
                        NB/NI: dados não exibidos (n &lt; 30 em todas as faixas etárias).
                      </Typography>
                    </>
                  )}
                  {activeChart === "bu" && (
                    <ReactECharts
                      option={buildBuBarOption()}
                      style={{ height: "320px", width: "100%" }}
                      opts={{ renderer: "svg" }}
                      notMerge
                    />
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Funil da jornada */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} color="white" mb={0.5}>
                Funil da jornada de cuidado
              </Typography>
              <Typography variant="caption" color="grey.100" display="block" mb={2}>
                Do mapeamento ao acompanhamento ativo
              </Typography>

              {isLoading ? (
                <Skeleton variant="rectangular" height={260} />
              ) : (
                <ReactECharts
                  option={buildFunnelOption()}
                  style={{ height: "260px", width: "100%" }}
                  opts={{ renderer: "svg" }}
                  notMerge
                />
              )}
            </CardContent>
          </Card>

          {/* Casos ativos */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} color="white" mb={0.5}>
                Casos ativos
              </Typography>
              <Typography variant="caption" color="grey.100" display="block" mb={2}>
                Colaboradores em acompanhamento — dados anonimizados
              </Typography>

              {isLoading ? (
                <Stack gap={1}>
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={40} />
                  ))}
                </Stack>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: "grey.100", borderColor: "grey.700" }}>Código</TableCell>
                        <TableCell sx={{ color: "grey.100", borderColor: "grey.700" }}>Entrada</TableCell>
                        <TableCell sx={{ color: "grey.100", borderColor: "grey.700" }}>Status</TableCell>
                        <TableCell sx={{ color: "grey.100", borderColor: "grey.700" }}>Próxima ação</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {casosAtivos.map((caso) => {
                        const s = statusConfig[caso.status];
                        return (
                          <TableRow
                            key={caso.codigo}
                            sx={{ "&:last-child td": { border: 0 }, "& td": { borderColor: "grey.700" } }}
                          >
                            <TableCell sx={{ color: "white", fontFamily: "monospace", fontSize: 12 }}>
                              {caso.codigo}
                            </TableCell>
                            <TableCell sx={{ color: "grey.100" }}>{caso.entrada}</TableCell>
                            <TableCell>
                              <Chip label={s.label} color={s.color} size="small" />
                            </TableCell>
                            <TableCell sx={{ color: "grey.100" }}>
                              {caso.proxima ?? "—"}
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
