## 1. CompanyContext — expor isCompanyReady

- [x] 1.1 Adicionar `isCompanyReady: boolean` ao tipo `CompanyContextType` em `src/contexts/CompanyContext.tsx`
- [x] 1.2 Calcular `isCompanyReady = !isKam || !!selectedCompanyId` no corpo do `CompanyProvider`
- [x] 1.3 Incluir `isCompanyReady` no objeto `value` passado ao `CompanyContext.Provider`

## 2. Base hooks — companyQueryKey e isCompanyReady

- [x] 2.1 Em `src/queries/useBaseQuery.ts`: consumir `useCompanyContext()`, adicionar `companyQueryKey` no `queryKey` e usar `enabled: isCompanyReady && (enabled ?? true)`
- [x] 2.2 Em `src/queries/useBaseInfiniteQuery.ts`: idem — `companyQueryKey` no `queryKey` e `enabled: isCompanyReady && (enabled ?? true)`
- [x] 2.3 Em `src/queries/useBaseItemQuery.ts`: idem — `companyQueryKey` no `queryKey` e `enabled: isCompanyReady && !!enabled && !!entityId`

## 3. Queries avulsas — companyQueryKey e isCompanyReady

- [x] 3.1 Em `src/queries/useKpiQuery.ts`: consumir `useCompanyContext()`, adicionar `companyQueryKey` no `queryKey` e `enabled: isCompanyReady`
- [x] 3.2 Em `src/queries/useDependentsQuery.ts`: adicionar `companyQueryKey` no `queryKey` e `enabled: isCompanyReady && !!enabled && !!holderId`
- [x] 3.3 Em `src/queries/useTicketTimelineQuery.ts`: adicionar `companyQueryKey` no `queryKey` e `enabled: isCompanyReady && !!ticketId`
- [x] 3.4 Em `src/queries/usePrincipalDashboardsQuery.ts`: adicionar `companyQueryKey` no `queryKey` e `enabled: isCompanyReady && !!principalId`
- [x] 3.5 Em `src/queries/useTicketByBenefitCardQuery.ts`: adicionar `companyQueryKey` no `queryKey` e `enabled: isCompanyReady && !!benefitCardId`
