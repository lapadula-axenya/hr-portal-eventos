## ADDED Requirements

### Requirement: companyQueryKey incluído nos base hooks de query

Os hooks `useBaseQuery`, `useBaseInfiniteQuery` e `useBaseItemQuery` SHALL incluir `companyQueryKey` no array de query key do TanStack Query.

#### Scenario: Troca de company dispara refetch nas queries que usam base hooks

- **WHEN** o usuário KAM seleciona uma empresa diferente
- **THEN** todas as queries que usam `useBaseQuery`, `useBaseInfiniteQuery` ou `useBaseItemQuery` SHALL refetchar automaticamente com o novo `X-Company-Id` no header

#### Scenario: Usuário não-KAM não é afetado

- **WHEN** um usuário com `PrincipalType.CUSTOMER` está autenticado
- **THEN** `companyQueryKey` é `[]` e o comportamento das queries SHALL ser idêntico ao anterior (sem refetch por troca de company)

### Requirement: companyQueryKey incluído nas queries avulsas

Os hooks `useDependentsQuery`, `useTicketTimelineQuery`, `usePrincipalDashboardsQuery`, `useTicketByBenefitCardQuery` e `useKpiQuery` SHALL incluir `companyQueryKey` no seu array de query key.

#### Scenario: Troca de company dispara refetch nas queries avulsas

- **WHEN** o usuário KAM seleciona uma empresa diferente
- **THEN** cada uma das 5 queries avulsas SHALL refetchar automaticamente

### Requirement: PRINCIPAL_ME e KAM_COMPANIES não incluem companyQueryKey

As queries `PRINCIPAL_ME` e `KAM_COMPANIES` SHALL permanecer sem `companyQueryKey` e sem `isCompanyReady` guard.

#### Scenario: principal/me não refetcha ao trocar de company

- **WHEN** o usuário KAM seleciona uma empresa diferente
- **THEN** a query `PRINCIPAL_ME` SHALL NOT disparar novo fetch

#### Scenario: KAM_COMPANIES não refetcha ao trocar de company

- **WHEN** o usuário KAM seleciona uma empresa diferente
- **THEN** a query `KAM_COMPANIES` SHALL NOT disparar novo fetch

### Requirement: CompanyContext expõe isCompanyReady

O `CompanyContext` SHALL expor o campo `isCompanyReady: boolean`, que é `true` quando o usuário não é KAM, ou quando é KAM e `selectedCompanyId !== null`.

#### Scenario: isCompanyReady true para usuários CUSTOMER

- **WHEN** o `principal.type` é `PrincipalType.CUSTOMER`
- **THEN** `isCompanyReady` SHALL ser `true` imediatamente após o mount

#### Scenario: isCompanyReady false para KAM sem company selecionada

- **WHEN** o `principal.type` é `PrincipalType.KAM` e `selectedCompanyId` é `null`
- **THEN** `isCompanyReady` SHALL ser `false`

#### Scenario: isCompanyReady true para KAM com company selecionada

- **WHEN** o `principal.type` é `PrincipalType.KAM` e `selectedCompanyId` não é `null`
- **THEN** `isCompanyReady` SHALL ser `true`

### Requirement: Queries bloqueiam até isCompanyReady para KAMs

Os base hooks (`useBaseQuery`, `useBaseInfiniteQuery`, `useBaseItemQuery`) e as 5 queries avulsas SHALL usar `enabled: isCompanyReady && (props.enabled ?? true)`.

#### Scenario: KAM não dispara requests antes de ter company selecionada

- **WHEN** um usuário KAM acaba de autenticar e `selectedCompanyId` ainda é `null`
- **THEN** nenhuma query coberta por este requisito SHALL disparar request ao backend

#### Scenario: KAM dispara requests após homeCompany ser definida

- **WHEN** o `useEffect` do `CompanyProvider` define a `homeCompany` via `setSelectedCompany`
- **THEN** todas as queries cobertas SHALL disparar com o header `X-Company-Id` correto
