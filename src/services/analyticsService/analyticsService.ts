import { ApiResponse } from "@/types/apiResponse";
import {
  AnalyticsDashboard,
  AnalyticsDashboardDetail,
  ExecuteQueryResponse,
} from "./analyticsService.type";

const analyticsDashboardsMock: AnalyticsDashboard[] = [
  {
    id: "analytics-001",
    name: "NR-1 e Saúde Mental",
    slug: "saude-mental",
    description: "Evidência clínica e mapeamento de risco psicossocial para adequação à NR-1",
    category: "Saúde",
    filters: null,
    bigquerySource: null,
  },
  {
    id: "analytics-002",
    name: "Previsão de fatura",
    slug: "previsao-fatura",
    description: "Projeção da fatura de benefícios e impacto potencial da gestão Axenya",
    category: "Financeiro",
    filters: null,
    bigquerySource: null,
  },
  {
    id: "analytics-003",
    name: "Auditoria e economia",
    slug: "auditoria",
    description: "Auditoria ativa de reembolsos e parceiros — onde encontramos economia",
    category: "Auditoria",
    filters: null,
    bigquerySource: null,
  },
];

const analyticsDashboardDetailsMock: Record<string, AnalyticsDashboardDetail> = {
  "saude-populacional": {
    ...analyticsDashboardsMock[0],
    queries: [
      {
        slug: "beneficiarios-por-tipo",
        name: "Beneficiários por Tipo",
        description: "Distribuição entre titulares e dependentes",
        chartType: "pie",
        chartConfig: {},
        layout: { row: 0, col: 0, width: 6, height: 4 },
        paramsSchema: [],
        displayOrder: 1,
      },
      {
        slug: "beneficiarios-ativos-inativos",
        name: "Ativos vs Inativos",
        description: "Proporção de beneficiários ativos e inativos",
        chartType: "bar",
        chartConfig: {},
        layout: { row: 0, col: 6, width: 6, height: 4 },
        paramsSchema: [],
        displayOrder: 2,
      },
    ],
  },
  "movimentacoes": {
    ...analyticsDashboardsMock[1],
    queries: [
      {
        slug: "movimentacoes-por-status",
        name: "Movimentações por Status",
        description: "Status das movimentações do período",
        chartType: "pie",
        chartConfig: {},
        layout: { row: 0, col: 0, width: 6, height: 4 },
        paramsSchema: [],
        displayOrder: 1,
      },
      {
        slug: "movimentacoes-por-tipo",
        name: "Movimentações por Tipo",
        description: "Inclusões, exclusões e alterações",
        chartType: "bar",
        chartConfig: {},
        layout: { row: 0, col: 6, width: 6, height: 4 },
        paramsSchema: [],
        displayOrder: 2,
      },
    ],
  },
};

const queryResultsMock: Record<string, ExecuteQueryResponse> = {
  "beneficiarios-por-tipo": {
    data: [
      { tipo: "Titular", quantidade: 10 },
      { tipo: "Dependente", quantidade: 10 },
    ],
    cached: true,
    queryTimeMs: 42,
  },
  "beneficiarios-ativos-inativos": {
    data: [
      { status: "Ativo", quantidade: 18 },
      { status: "Inativo", quantidade: 2 },
    ],
    cached: true,
    queryTimeMs: 38,
  },
  "movimentacoes-por-status": {
    data: [
      { status: "Concluído", quantidade: 7 },
      { status: "Em andamento", quantidade: 2 },
      { status: "Solicitado", quantidade: 2 },
      { status: "Pendente", quantidade: 1 },
    ],
    cached: true,
    queryTimeMs: 55,
  },
  "movimentacoes-por-tipo": {
    data: [
      { tipo: "Inclusão", quantidade: 8 },
      { tipo: "Exclusão", quantidade: 2 },
      { tipo: "Alteração", quantidade: 2 },
    ],
    cached: true,
    queryTimeMs: 48,
  },
};

export async function getAllAnalyticsDashboards(
  _params?: Record<string, unknown>,
): Promise<ApiResponse<AnalyticsDashboard>> {
  return {
    data: analyticsDashboardsMock,
    meta: {
      itemsPerPage: 10,
      totalItems: 3,
      currentPage: 1,
      totalPages: 1,
    },
  };
}

export async function getAnalyticsDashboard(
  slug: string,
): Promise<AnalyticsDashboardDetail> {
  return (
    analyticsDashboardDetailsMock[slug] ??
    analyticsDashboardDetailsMock["saude-populacional"]
  );
}

export async function executeAnalyticsQuery(
  slug: string,
  _params: Record<string, unknown> = {},
): Promise<ExecuteQueryResponse> {
  return queryResultsMock[slug] ?? { data: [], cached: true, queryTimeMs: 0 };
}

export async function getFilterValues(
  _dashboardSlug: string,
  _filterName: string,
  _cascadingParams: Record<string, string> = {},
): Promise<string[]> {
  return [];
}
