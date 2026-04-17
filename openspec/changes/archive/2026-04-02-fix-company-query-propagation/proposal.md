## Why

Após a implementação do company switching para KAMs, o header `X-Company-Id` não está sendo propagado corretamente nas requests porque as queries do TanStack Query não incluem o `companyQueryKey` em seus arrays de chave — causando que nenhuma query refaça o fetch ao trocar de empresa, e que a carga inicial para KAMs dispare requests sem o header antes que a `homeCompany` seja selecionada.

## What Changes

- `useBaseQuery`, `useBaseInfiniteQuery` e `useBaseItemQuery` passam a incluir `companyQueryKey` no array de query key, garantindo refetch automático ao trocar de empresa
- 5 queries avulsas (`useDependentsQuery`, `useTicketTimelineQuery`, `usePrincipalDashboardsQuery`, `useTicketByBenefitCardQuery`, `useKpiQuery`) recebem o mesmo tratamento
- `CompanyContext` expõe `isCompanyReady` (true quando não-KAM, ou quando é KAM e já tem company selecionada)
- Os 3 base hooks e as 5 queries avulsas adicionam `enabled: isCompanyReady` para evitar requests sem header na carga inicial de KAMs
- `PRINCIPAL_ME` e `KAM_COMPANIES` permanecem sem `companyQueryKey` (não dependem de company)

## Capabilities

### New Capabilities

- `company-query-propagation`: Sincronização do `companyQueryKey` nas queries do TanStack Query e guarda de `isCompanyReady` para evitar requests prematuras

### Modified Capabilities

<!-- Nenhuma mudança de requisitos em specs existentes -->

## Impact

- `src/queries/useBaseQuery.ts` — adiciona `companyQueryKey` no queryKey e `enabled` guard
- `src/queries/useBaseInfiniteQuery.ts` — idem
- `src/queries/useBaseItemQuery.ts` — idem
- `src/queries/useDependentsQuery.ts`, `useTicketTimelineQuery.ts`, `usePrincipalDashboardsQuery.ts`, `useTicketByBenefitCardQuery.ts`, `useKpiQuery.ts` — idem individualmente
- `src/contexts/CompanyContext.tsx` — expõe `isCompanyReady` no contexto
