import { Chip } from "../DashboardPrimitives";
import {
  CID_GROUPS,
  COMPANIES,
  MONTH_NAMES,
  MONTH_NUMBERS,
  STATUS_OPTIONS,
} from "../data";
import { colors } from "../theme";
import type { DashboardFilters } from "../useDashboardData";
import { toggle } from "../utils";

type FiltersBarProps = {
  filters: DashboardFilters;
  setYears: (v: string[]) => void;
  setMonths: (v: string[]) => void;
  setCompanies: (v: string[]) => void;
  setCidGroups: (v: string[]) => void;
  setStatuses: (v: string[]) => void;
  setExcludeAnomalies: (v: boolean) => void;
};

const labelStyle = {
  fontSize: 9,
  fontWeight: 700,
  color: colors.muted,
  marginBottom: 5,
  textTransform: "uppercase" as const,
  letterSpacing: 1,
};

function FilterGroup(props: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={labelStyle}>{props.label}</div>
      {props.children}
    </div>
  );
}

export function FiltersBar({
  filters,
  setCidGroups,
  setCompanies,
  setExcludeAnomalies,
  setMonths,
  setStatuses,
  setYears,
}: FiltersBarProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 18,
        marginBottom: 22,
        padding: "14px 18px",
        background: colors.bg,
        border: "1px solid " + colors.border,
        borderRadius: 10,
      }}
    >
      <FilterGroup label="Ano">
        <div style={{ display: "flex", gap: 4 }}>
          {["2025", "2026"].map((y) => (
            <Chip
              key={y}
              on={filters.years.includes(y)}
              label={y}
              onClick={() => toggle(filters.years, setYears, y)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Mês">
        <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {MONTH_NUMBERS.map((m, i) => (
            <Chip
              key={m}
              on={filters.months.includes(m)}
              label={MONTH_NAMES[i]}
              onClick={() => toggle(filters.months, setMonths, m)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Subestipulante">
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {COMPANIES.map((e) => (
            <Chip
              key={e}
              on={filters.companies.includes(e)}
              label={e}
              onClick={() => toggle(filters.companies, setCompanies, e)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="CID">
        <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {CID_GROUPS.map((c) => (
            <Chip
              key={c}
              on={filters.cidGroups.includes(c)}
              label={c}
              onClick={() => toggle(filters.cidGroups, setCidGroups, c)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Status">
        <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {STATUS_OPTIONS.map((s) => (
            <Chip
              key={s}
              on={filters.statuses.includes(s)}
              label={s}
              onClick={() => toggle(filters.statuses, setStatuses, s)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Anomalias">
        <div style={{ display: "flex", gap: 3 }}>
          <Chip
            on={filters.excludeAnomalies}
            label="Excluir anomalias"
            onClick={() => setExcludeAnomalies(!filters.excludeAnomalies)}
          />
        </div>
      </FilterGroup>
    </div>
  );
}
