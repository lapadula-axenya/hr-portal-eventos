import { AnalyticsQuery } from "@/services/analyticsService";

/**
 * Returns only the params from globalFilters that are declared
 * in the query's paramsSchema, with non-empty values.
 */
export function filterParamsForQuery(
  globalFilters: Record<string, string>,
  query: AnalyticsQuery,
): Record<string, unknown> {
  const declared = new Set(query.paramsSchema.map((p) => p.name));
  return Object.fromEntries(
    Object.entries(globalFilters).filter(
      ([key, value]) => declared.has(key) && value !== "",
    ),
  );
}
