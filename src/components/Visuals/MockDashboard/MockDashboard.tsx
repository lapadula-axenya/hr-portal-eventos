"use client";

import { useState } from "react";
import {
  DashboardHeader,
  FiltersBar,
  ReportSelector,
  ReportPanel,
  AbsenteeismChart,
  DaysLostChart,
  CidLinesChart,
  OkrChart,
  CatsChart,
  PrevCharts,
  CompanyComparison,
  RestrictedActivitySection,
} from "./sections";
import { colors } from "./theme";
import { useDashboardData, type DashboardFilters } from "./useDashboardData";

export function MockDashboard() {
  // Filter state
  const [years, setYears] = useState(["2025", "2026"]);
  const [months, setMonths] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [cidGroups, setCidGroups] = useState<string[]>([]);
  const [statuses, setStatuses] = useState(["Ativo"]);
  const [excludeAnomalies, setExcludeAnomalies] = useState(true);

  // UI state
  const [barHidden, setBarHidden] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [reportMonth, setReportMonth] = useState("");
  const [reportOpen, setReportOpen] = useState(false);

  const filters: DashboardFilters = {
    years,
    months,
    companies,
    cidGroups,
    statuses,
    excludeAnomalies,
  };

  const data = useDashboardData(filters);

  const lastMonth =
    data.filteredMonths.length > 0
      ? data.filteredMonths[data.filteredMonths.length - 1]
      : "2026-02";

  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        color: colors.text,
        padding: "0 0 2rem",
        maxWidth: 920,
        margin: "auto",
      }}
    >
      <DashboardHeader lastMonth={lastMonth} />

      <FiltersBar
        filters={filters}
        setYears={setYears}
        setMonths={setMonths}
        setCompanies={setCompanies}
        setCidGroups={setCidGroups}
        setStatuses={setStatuses}
        setExcludeAnomalies={setExcludeAnomalies}
      />

      <ReportSelector
        months={data.filteredMonths}
        selectedMonth={reportMonth}
        setSelectedMonth={setReportMonth}
        isOpen={reportOpen}
        setIsOpen={setReportOpen}
      />

      {reportOpen && reportMonth && (
        <ReportPanel month={reportMonth} filters={filters} />
      )}

      <AbsenteeismChart data={data.absenteeismLine} kpi={data.kpiAbsenteeism} />

      <DaysLostChart
        data={data.daysBarData}
        barHidden={barHidden}
        setBarHidden={setBarHidden}
      />

      <CidLinesChart cidLines={data.cidLines} />

      <OkrChart />

      <CatsChart data={data.catsData} />

      <PrevCharts
        data={data.prevLine}
        kpiGeneral={data.kpiPrevGeneral}
        kpiCidF={data.kpiPrevCidF}
      />

      <RestrictedActivitySection
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />

      <CompanyComparison
        companyYearly={data.companyYearly}
        companyMonthly={data.companyMonthly}
      />
    </div>
  );
}
