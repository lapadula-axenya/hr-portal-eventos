export enum FilterOperator {
  EQ = "$eq",
  NOT = "$not",
  NULL = "$null",
  IN = "$in",
  GT = "$gt",
  GTE = "$gte",
  LT = "$lt",
  LTE = "$lte",
  BTW = "$btw",
  ILIKE = "$ilike",
  SW = "$sw",
  CONTAINS = "$contains",
}

export type FilterExpression<
  Operator extends FilterOperator,
  Value extends string = string,
> = `${Operator}:${Value}`;
