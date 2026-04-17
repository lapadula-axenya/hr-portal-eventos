import { useMemo } from "react";
import {
  getValueFromKeys,
  getHHT,
  getDaysBreakdown,
  normalizeFilters,
} from "./calculations";
import {
  DAYS_BY_MONTH,
  HHT_BY_MONTH,
  PREV_BY_MONTH,
  CID_GROUPS,
  CID_CHART_GROUPS,
  COMPANIES,
  HHT_COMPANY_INDEX,
  RESTRICTED_ACTIVITY,
} from "./data";
import { formatMonth, round2 } from "./utils";

export type DashboardFilters = {
  years: string[];
  months: string[];
  companies: string[];
  cidGroups: string[];
  statuses: string[];
  excludeAnomalies: boolean;
};

export function useDashboardData(filters: DashboardFilters) {
  return useMemo(() => {
    const allMonths = Object.keys(DAYS_BY_MONTH).sort();
    const { anomKeys, selC, selE, selS } = normalizeFilters(filters);

    // Filter months by year/month selection
    const filteredMonths = allMonths.filter((m) => {
      const [y, mo] = m.split("-");
      if (y < "2025") return false;
      if (filters.years.length > 0 && !filters.years.includes(y)) return false;
      if (filters.months.length > 0 && !filters.months.includes(mo))
        return false;
      return true;
    });

    const filteredMonthsYoy = allMonths.filter((m) => {
      const [y, mo] = m.split("-");
      const fy = filters.years.length > 0 ? filters.years : ["2025", "2026"];
      if (!fy.includes(y)) return false;
      if (filters.months.length > 0 && !filters.months.includes(mo))
        return false;
      return true;
    });

    // Absenteeism rate evolution
    const absenteeismLine = filteredMonths.map((m) => {
      const d = getDaysBreakdown(m, selE, selC, selS, anomKeys);
      const h = getHHT(m, selE);
      return {
        month: formatMonth(m),
        rate: h > 0 ? round2(((d.total * 7.33) / h) * 100) : 0,
      };
    });

    let totalNumerator = 0,
      totalDenominator = 0;
    filteredMonths.forEach((m) => {
      totalNumerator +=
        getDaysBreakdown(m, selE, selC, selS, anomKeys).total * 7.33;
      totalDenominator += getHHT(m, selE);
    });
    const kpiAbsenteeism =
      totalDenominator > 0
        ? round2((totalNumerator / totalDenominator) * 100)
        : 0;

    // Days lost bar chart
    const daysBarData = filteredMonths.map((m) => {
      const res = getDaysBreakdown(m, selE, selC, selS, anomKeys);
      const obj: Record<string, number | string> = { month: m };
      CID_GROUPS.forEach((c) => (obj[c] = res.byCid[c]));
      obj.total = CID_GROUPS.reduce((s, c) => s + (res.byCid[c] || 0), 0);
      return obj;
    });
    const kpiDaysLost = daysBarData.reduce(
      (s, d) => s + (d.total as number),
      0,
    );

    // CID breakdown lines
    const cidLines: Record<
      string,
      { series: { month: string; rate: number }[]; kpi: number }
    > = {};
    CID_CHART_GROUPS.forEach((c) => {
      const series = filteredMonths.map((m) => {
        let n = 0;
        selE.forEach((e) => {
          if (DAYS_BY_MONTH[m] && DAYS_BY_MONTH[m][e] && DAYS_BY_MONTH[m][e][c])
            selS.forEach((s) => {
              n += getValueFromKeys(DAYS_BY_MONTH[m][e][c][s], anomKeys);
            });
        });
        const h = getHHT(m, selE);
        return {
          month: formatMonth(m),
          rate: h > 0 ? round2(((n * 7.33) / h) * 100) : 0,
        };
      });
      let kn = 0,
        kd = 0;
      filteredMonths.forEach((m) => {
        selE.forEach((e) => {
          if (DAYS_BY_MONTH[m] && DAYS_BY_MONTH[m][e] && DAYS_BY_MONTH[m][e][c])
            selS.forEach((s) => {
              kn += getValueFromKeys(DAYS_BY_MONTH[m][e][c][s], anomKeys);
            });
        });
        kd += getHHT(m, selE);
      });
      cidLines[c] = {
        series,
        kpi: kd > 0 ? round2(((kn * 7.33) / kd) * 100) : 0,
      };
    });

    // Social security absenteeism
    const prevLine = filteredMonths.map((m) => {
      const a = PREV_BY_MONTH[m] || [0, 0];
      const h = HHT_BY_MONTH[m] ? HHT_BY_MONTH[m][0] : 0;
      return {
        month: formatMonth(m),
        general: h > 0 ? round2(((a[0] * 7.33) / h) * 100) : 0,
        cidF: h > 0 ? round2(((a[1] * 7.33) / h) * 100) : 0,
      };
    });
    let aG = 0,
      aF = 0,
      aD = 0;
    filteredMonths.forEach((m) => {
      const a = PREV_BY_MONTH[m] || [0, 0];
      aG += a[0];
      aF += a[1];
      aD += HHT_BY_MONTH[m] ? HHT_BY_MONTH[m][0] : 0;
    });
    const kpiPrevGeneral = aD > 0 ? round2(((aG * 7.33) / aD) * 100) : 0;
    const kpiPrevCidF = aD > 0 ? round2(((aF * 7.33) / aD) * 100) : 0;

    // Company comparison (month-by-month and year-over-year)
    const companyMonthly: Record<
      string,
      { series: { month: string; rate: number | null }[]; kpi: number }
    > = {};
    const companyYearly: Record<string, { year: string; rate: number }[]> = {};
    COMPANIES.forEach((e) => {
      const hi = HHT_COMPANY_INDEX[e];
      companyMonthly[e] = {
        series: filteredMonths.map((m) => {
          let d = 0;
          const ed = (DAYS_BY_MONTH[m] && DAYS_BY_MONTH[m][e]) || {};
          selC.forEach((c) => {
            if (ed[c])
              selS.forEach((s) => {
                d += getValueFromKeys(ed[c][s], anomKeys);
              });
          });
          const h = HHT_BY_MONTH[m] ? HHT_BY_MONTH[m][hi] : 0;
          return {
            month: formatMonth(m),
            rate: h > 0 ? round2(((d * 7.33) / h) * 100) : null,
          };
        }),
        kpi: (() => {
          let n = 0,
            d = 0;
          filteredMonths.forEach((m) => {
            const ed = (DAYS_BY_MONTH[m] && DAYS_BY_MONTH[m][e]) || {};
            selC.forEach((c) => {
              if (ed[c])
                selS.forEach((s) => {
                  n += getValueFromKeys(ed[c][s], anomKeys);
                });
            });
            d += HHT_BY_MONTH[m] ? HHT_BY_MONTH[m][hi] : 0;
          });
          return d > 0 ? round2(((n * 7.33) / d) * 100) : 0;
        })(),
      };
      companyYearly[e] = ["2025", "2026"].map((y) => {
        const ym = filteredMonthsYoy.filter((m) => m.startsWith(y));
        let n = 0,
          d = 0;
        ym.forEach((m) => {
          const ed = (DAYS_BY_MONTH[m] && DAYS_BY_MONTH[m][e]) || {};
          selC.forEach((c) => {
            if (ed[c])
              selS.forEach((s) => {
                n += getValueFromKeys(ed[c][s], anomKeys);
              });
          });
          d += HHT_BY_MONTH[m] ? HHT_BY_MONTH[m][hi] : 0;
        });
        return { year: y, rate: d > 0 ? round2(((n * 7.33) / d) * 100) : 0 };
      });
    });

    // CATs (occupational accidents)
    const catsData = filteredMonths.map((m) => {
      const h = HHT_BY_MONTH[m] ? HHT_BY_MONTH[m][0] : 0;
      const hc = Math.round(h / 161);
      const isJul = m === "2025-07";
      const hasPrev = m >= "2025-07" && m <= "2025-12" ? 1 : 0;
      return {
        month: formatMonth(m),
        cats: isJul ? 1 : 0,
        inc: isJul && hc > 0 ? round2((1 / hc) * 1000) : 0,
        prev: hasPrev && hc > 0 ? round2((hasPrev / hc) * 1000) : 0,
      };
    });

    return {
      filteredMonths,
      absenteeismLine,
      kpiAbsenteeism,
      daysBarData,
      kpiDaysLost,
      cidLines,
      prevLine,
      kpiPrevGeneral,
      kpiPrevCidF,
      companyMonthly,
      companyYearly,
      catsData,
    };
  }, [
    filters.years,
    filters.months,
    filters.companies,
    filters.cidGroups,
    filters.statuses,
    filters.excludeAnomalies,
  ]);
}

/** Aggregate restricted activity data by branch */
export function useRestrictedActivityData(selectedBranch: string | null) {
  return useMemo(() => {
    const aggDays: Record<string, number> = {};
    const aggPeople: Record<string, number> = {};
    RESTRICTED_ACTIVITY.forEach((r) => {
      aggDays[r.f] = (aggDays[r.f] || 0) + r.d;
      aggPeople[r.f] = (aggPeople[r.f] || 0) + 1;
    });
    const sortedBranches = Object.entries(aggDays).sort((a, b) => b[1] - a[1]);
    const maxDays = sortedBranches.length > 0 ? sortedBranches[0][1] : 1;

    const rows = selectedBranch
      ? RESTRICTED_ACTIVITY.filter((r) => r.f === selectedBranch)
      : [...RESTRICTED_ACTIVITY];
    rows.sort((a, b) => a.f.localeCompare(b.f) || b.d - a.d);

    return { aggDays, aggPeople, sortedBranches, maxDays, rows };
  }, [selectedBranch]);
}
