import {
  getValueFromKeys,
  getHHT,
  getDaysBreakdown,
  normalizeFilters,
} from "../calculations";
import { DashCard, StatBox } from "../DashboardPrimitives";
import {
  DAYS_BY_MONTH,
  HHT_BY_MONTH,
  PREV_BY_MONTH,
  OKR_DATA,
  CID_GROUPS,
  CID_CHART_GROUPS,
  COMPANIES,
  HHT_COMPANY_INDEX,
} from "../data";
import { colors, CID_COLORS } from "../theme";
import type { DashboardFilters } from "../useDashboardData";
import { formatMonth, round2 } from "../utils";

type ReportPanelProps = {
  month: string;
  filters: DashboardFilters;
};

export function ReportPanel({ filters, month }: ReportPanelProps) {
  const { anomKeys, selC, selE, selS } = normalizeFilters(filters);

  const { byCid: cidDias, total: totalDias } = getDaysBreakdown(
    month,
    selE,
    selC,
    selS,
    anomKeys,
  );

  const hht = getHHT(month, selE);
  const taxaAbs = hht > 0 ? round2(((totalDias * 7.33) / hht) * 100) : 0;

  const cidTaxas: Record<string, number> = {};
  CID_CHART_GROUPS.forEach((c) => {
    let n = 0;
    selE.forEach((e) => {
      if (DAYS_BY_MONTH[month]?.[e]?.[c])
        selS.forEach((s) => {
          n += getValueFromKeys(DAYS_BY_MONTH[month][e][c][s], anomKeys);
        });
    });
    cidTaxas[c] = hht > 0 ? round2(((n * 7.33) / hht) * 100) : 0;
  });

  const af = PREV_BY_MONTH[month] || [0, 0];
  const hhtTotal = HHT_BY_MONTH[month] ? HHT_BY_MONTH[month][0] : 0;
  const prevG = hhtTotal > 0 ? round2(((af[0] * 7.33) / hhtTotal) * 100) : 0;
  const prevF = hhtTotal > 0 ? round2(((af[1] * 7.33) / hhtTotal) * 100) : 0;
  const okrEntry = OKR_DATA.find((o) => o.m === month);
  const catEntry = month === "2025-07" ? 1 : 0;

  const sectionTitle = {
    fontSize: 11,
    fontWeight: 600,
    color: colors.text,
    marginBottom: 8,
  };
  const chipRow = {
    display: "flex" as const,
    flexWrap: "wrap" as const,
    gap: 8,
    marginBottom: 16,
  };
  const cidChip = {
    display: "flex" as const,
    alignItems: "center" as const,
    gap: 6,
    background: colors.bg,
    borderRadius: 6,
    padding: "6px 12px",
    minWidth: 100,
  };
  const dot = (color: string) => ({
    width: 8,
    height: 8,
    borderRadius: 2,
    background: color,
    display: "inline-block" as const,
  });

  return (
    <DashCard
      title={"Relatório Mensal — " + formatMonth(month)}
      note={
        "Filtros aplicados: " +
        selS.join(", ") +
        " | " +
        (filters.companies.length > 0
          ? filters.companies.join(", ")
          : "Todas empresas")
      }
    >
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}
      >
        <StatBox label="Taxa de absenteísmo" value={taxaAbs.toFixed(2) + "%"} />
        <StatBox label="Dias perdidos" value={totalDias.toLocaleString()} />
        <StatBox label="Previd. geral" value={prevG.toFixed(2) + "%"} />
        <StatBox label="Previd. CID F" value={prevF.toFixed(2) + "%"} />
        <StatBox label="CATs no mês" value={catEntry} />
        {okrEntry && (
          <StatBox
            label="OKR Qualidade de Vida"
            value={okrEntry.p + "%"}
            sub={okrEntry.a + " ativos / " + okrEntry.e + " elegíveis"}
          />
        )}
      </div>

      <div style={sectionTitle}>Dias Perdidos por CID</div>
      <div style={chipRow}>
        {CID_GROUPS.map((c) => (
          <div key={c} style={cidChip}>
            <span style={dot(CID_COLORS[c])} />
            <span style={{ fontSize: 11, color: colors.muted }}>{c}</span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: colors.text,
                marginLeft: "auto",
              }}
            >
              {cidDias[c]}
            </span>
          </div>
        ))}
      </div>

      <div style={sectionTitle}>Taxa de Absenteísmo por CID</div>
      <div style={chipRow}>
        {CID_CHART_GROUPS.map((c) => (
          <div key={c} style={cidChip}>
            <span style={dot(CID_COLORS[c])} />
            <span style={{ fontSize: 11, color: colors.muted }}>{c}</span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: colors.text,
                marginLeft: "auto",
              }}
            >
              {cidTaxas[c].toFixed(2)}%
            </span>
          </div>
        ))}
      </div>

      <div style={sectionTitle}>Comparativo por empresa</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {COMPANIES.map((e) => {
          const hi = HHT_COMPANY_INDEX[e];
          let n = 0;
          const ed = DAYS_BY_MONTH[month]?.[e] || {};
          selC.forEach((c) => {
            if (ed[c])
              selS.forEach((s) => {
                n += getValueFromKeys(ed[c][s], anomKeys);
              });
          });
          const eh = HHT_BY_MONTH[month] ? HHT_BY_MONTH[month][hi] : 0;
          const rate = eh > 0 ? round2(((n * 7.33) / eh) * 100) : 0;
          return (
            <div
              key={e}
              style={{
                background: colors.bg,
                borderRadius: 6,
                padding: "8px 14px",
                flex: 1,
                minWidth: 140,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: colors.muted,
                  textTransform: "uppercase",
                  marginBottom: 3,
                }}
              >
                {e}
              </div>
              <div
                style={{ fontSize: 16, fontWeight: 600, color: colors.accent }}
              >
                {rate.toFixed(2)}%
              </div>
              <div style={{ fontSize: 10, color: colors.muted }}>
                {n} dias perdidos
              </div>
            </div>
          );
        })}
      </div>
    </DashCard>
  );
}
