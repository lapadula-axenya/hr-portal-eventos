## Context

O `CompanyContext` já expõe `companyQueryKey` (`[selectedCompanyId]` para KAMs, `[]` para outros), e o `companyStore` já injeta o `X-Company-Id` no interceptor do Axios. O problema é que os hooks de query (`useBaseQuery`, `useBaseInfiniteQuery`, `useBaseItemQuery` e queries avulsas) não incluem `companyQueryKey` nos seus arrays de chave — então o TanStack Query não detecta a mudança de company e não refetcha os dados.

Adicionalmente, KAMs sofrem um problema de timing na carga inicial: as queries disparam antes que o `useEffect` do `CompanyProvider` defina a `homeCompany`, gerando requests sem o header `X-Company-Id`.

## Goals / Non-Goals

**Goals:**
- Todas as queries (exceto `PRINCIPAL_ME` e `KAM_COMPANIES`) refetcham automaticamente ao trocar de empresa
- KAMs não disparam requests antes de ter uma `selectedCompanyId` definida
- A solução é centralizada nos base hooks, com mudanças mínimas nas queries avulsas

**Non-Goals:**
- Persistência da `selectedCompanyId` entre sessões (localStorage/sessionStorage)
- Mudança na lógica de inicialização da `homeCompany` (useEffect continua como está)
- Alterar `PRINCIPAL_ME` ou `KAM_COMPANIES`

## Decisions

### 1. Adicionar `companyQueryKey` no array de query key dos base hooks

`companyQueryKey` é `[]` para não-KAMs e `[selectedCompanyId]` para KAMs com company selecionada. Ao incluí-lo no queryKey, o TanStack Query considera cada `companyId` como um cache separado e refetcha quando o valor muda.

```
queryKey: [queryKey, authQueryKey, companyQueryKey, params]
```

**Alternativa considerada:** Invalidar manualmente o cache via `queryClient.invalidateQueries` no `setSelectedCompany`. Descartada porque exige acoplar o `queryClient` ao `CompanyContext` e listar explicitamente quais keys invalidar — mais frágil que deixar o TanStack Query gerenciar via queryKey.

### 2. Expor `isCompanyReady` no `CompanyContext`

`isCompanyReady` é `true` quando o usuário não é KAM, ou quando é KAM e `selectedCompanyId !== null`. Os base hooks e queries avulsas usam `enabled: isCompanyReady && (props.enabled ?? true)`.

```
isCompanyReady = !isKam || !!selectedCompanyId
```

Isso bloqueia as queries até que o estado de company esteja resolvido, evitando o roundtrip inicial sem header.

**Alternativa considerada:** Calcular `isKam` nos próprios hooks consumindo o `CompanyContext`. Descartada pois `isKam` depende do `principal`, que já está disponível no `CompanyContext` — centralizar em `isCompanyReady` evita duplicar a lógica.

### 3. Queries avulsas recebem `companyQueryKey` diretamente

As 5 queries avulsas (`useDependentsQuery`, `useTicketTimelineQuery`, `usePrincipalDashboardsQuery`, `useTicketByBenefitCardQuery`, `useKpiQuery`) consomem `useCompanyContext()` diretamente e adicionam `companyQueryKey` no seu `queryKey` e `isCompanyReady` no `enabled`.

**Alternativa considerada:** Migrar essas queries para os base hooks. Descartada pois cada uma tem assinatura específica (parâmetros individuais como `holderId`, `ticketId`), e migrar introduziria refatoração além do escopo.

## Risks / Trade-offs

- **Cache separado por company**: Com `companyQueryKey` no queryKey, o TanStack Query mantém cache separado para cada `companyId`. Ao trocar de volta para uma company já visitada, os dados em cache serão exibidos imediatamente (stale-while-revalidate). Isso é o comportamento esperado e desejável.

- **`isCompanyReady` bloqueia KAMs até a homeCompany ser detectada**: O `useEffect` no `CompanyProvider` é assíncrono — KAMs verão loading enquanto a `homeCompany` é resolvida. Esse delay já existia antes (as queries retornavam dados errados); agora simplesmente não disparam. Aceitável.

- **Queries avulsas com `holderId`/`ticketId` escopadas por company**: `useDependentsQuery`, `useTicketByBenefitCardQuery` e `useTicketTimelineQuery` são scoped a entidades específicas. Incluir `companyQueryKey` é correto — um dependente em company A é diferente de um em company B.

## Migration Plan

Sem breaking changes de API ou migração de dados. A mudança é puramente no layer de query keys do frontend. Deploy direto sem steps adicionais.
