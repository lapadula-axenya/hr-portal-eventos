/**
 * Shared calculation utilities for the mock dashboard.
 * Used by both useDashboardData (multi-month aggregation) and ReportPanel (single month).
 */

import {
  DAYS_BY_MONTH,
  HHT_BY_MONTH,
  CID_GROUPS,
  COMPANIES,
  STATUS_OPTIONS,
  HHT_COMPANY_INDEX,
} from "./data";

/** Sum values from an object by specific keys */
export function getValueFromKeys(
  obj: Record<string, number> | undefined,
  keys: string[],
): number {
  if (!obj) return 0;
  return keys.reduce((sum, k) => sum + (obj[k] || 0), 0);
}

/** Calculate HHT (hours) for a given month and set of companies */
export function getHHT(month: string, selectedCompanies: string[]): number {
  if (!HHT_BY_MONTH[month]) return 0;
  if (
    selectedCompanies.length === 0 ||
    selectedCompanies.length === Object.keys(HHT_COMPANY_INDEX).length
  )
    return HHT_BY_MONTH[month][0];
  let s = 0;
  for (const company of selectedCompanies) {
    const idx = HHT_COMPANY_INDEX[company];
    if (idx != null) s += HHT_BY_MONTH[month][idx];
  }
  return s;
}

/** Calculate days breakdown for a given month, returning total and per-CID counts */
export function getDaysBreakdown(
  month: string,
  selE: string[],
  selC: string[],
  selS: string[],
  anomKeys: string[],
): { total: number; byCid: Record<string, number> } {
  if (!DAYS_BY_MONTH[month])
    return { total: 0, byCid: {} as Record<string, number> };
  let total = 0;
  const byCid: Record<string, number> = {};
  CID_GROUPS.forEach((c) => (byCid[c] = 0));
  selE.forEach((e) => {
    if (!DAYS_BY_MONTH[month][e]) return;
    selC.forEach((c) => {
      if (!DAYS_BY_MONTH[month][e][c]) return;
      selS.forEach((s) => {
        const v = getValueFromKeys(DAYS_BY_MONTH[month][e][c][s], anomKeys);
        total += v;
        byCid[c] += v;
      });
    });
  });
  return { total, byCid };
}

/** Normalize filter arrays — use all options when empty */
export function normalizeFilters(filters: {
  companies: string[];
  cidGroups: string[];
  statuses: string[];
  excludeAnomalies: boolean;
}) {
  return {
    selE: filters.companies.length > 0 ? filters.companies : [...COMPANIES],
    selC: filters.cidGroups.length > 0 ? filters.cidGroups : [...CID_GROUPS],
    selS: filters.statuses.length > 0 ? filters.statuses : [...STATUS_OPTIONS],
    anomKeys: filters.excludeAnomalies ? ["F"] : ["F", "T"],
  };
}
