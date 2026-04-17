## ADDED Requirements

### Requirement: PrincipalType enum
O tipo `Principal` SHALL incluir um campo `type` com enum `PrincipalType { CUSTOMER, KAM }`. O campo MUST ser não-nulo. Quando ausente na resposta da API, o sistema SHALL tratar como `CUSTOMER`.

#### Scenario: Principal com type CUSTOMER
- **WHEN** a API retorna um principal com `type: "CUSTOMER"`
- **THEN** o sistema SHALL tratar o principal como usuário de empresa única

#### Scenario: Principal com type KAM
- **WHEN** a API retorna um principal com `type: "KAM"`
- **THEN** o sistema SHALL ativar o contexto de múltiplas empresas para esse usuário

#### Scenario: Principal sem campo type (compatibilidade)
- **WHEN** a API retorna um principal sem o campo `type`
- **THEN** o sistema SHALL assumir `type: "CUSTOMER"` e manter o comportamento atual

### Requirement: CompanyWithMeta type
O sistema SHALL definir o tipo `CompanyWithMeta` com campos `id: string`, `name: string`, `isHome: boolean` e `isActive: boolean`. Este tipo representa a shape de resposta do endpoint `GET /companies`.

#### Scenario: Empresa home sem header ativo
- **WHEN** `GET /companies` é chamado sem `X-Company-Id` ativo
- **THEN** a empresa com `isHome=true` SHALL aparecer na lista, mas `isActive` pode ser `false` para todas

#### Scenario: Empresa ativa com header
- **WHEN** `GET /companies` é chamado com `X-Company-Id` definido
- **THEN** a empresa correspondente SHALL ter `isActive=true`

### Requirement: companyStore singleton
O sistema SHALL ter um módulo singleton `src/lib/companyStore.ts` que expõe `get(): string | null` e `set(id: string | null): void`. Este módulo MUST ser acessível fora do React para uso pelo interceptor Axios.

#### Scenario: Leitura antes de definir
- **WHEN** `companyStore.get()` é chamado antes de qualquer `set()`
- **THEN** SHALL retornar `null`

#### Scenario: Leitura após definir
- **WHEN** `companyStore.set("empresa-id")` é chamado
- **THEN** `companyStore.get()` SHALL retornar `"empresa-id"`

### Requirement: clientApi injeta X-Company-Id
O interceptor do `clientApi` SHALL ler `companyStore.get()` e, quando não-nulo, adicionar o header `X-Company-Id` à requisição.

#### Scenario: KAM com empresa selecionada
- **WHEN** `companyStore.get()` retorna um ID de empresa
- **THEN** toda requisição via `clientApi` SHALL incluir `X-Company-Id: <id>`

#### Scenario: CUSTOMER sem empresa no store
- **WHEN** `companyStore.get()` retorna `null`
- **THEN** o header `X-Company-Id` SHALL ser omitido da requisição

### Requirement: CompanyContext para KAM
O sistema SHALL ter um `CompanyContext` que, ao montar para um principal KAM, busca `GET /companies`, define a empresa com `isHome=true` como ativa via `setSelectedCompany(id)`, e expõe `{ selectedCompanyId, companies, setSelectedCompany, companyQueryKey }`.

#### Scenario: Inicialização para KAM
- **WHEN** o `CompanyProvider` monta com `principal.type === KAM`
- **THEN** o sistema SHALL chamar `GET /companies`
- **THEN** o sistema SHALL chamar `setSelectedCompany` com o `id` da empresa onde `isHome=true`

#### Scenario: Não inicializa para CUSTOMER
- **WHEN** o `CompanyProvider` monta com `principal.type === CUSTOMER`
- **THEN** o sistema SHALL manter `selectedCompanyId` como `null`
- **THEN** o sistema SHALL NOT chamar `GET /companies`

### Requirement: setSelectedCompany atualiza singleton e estado React
A função `setSelectedCompany(id)` do `CompanyContext` SHALL chamar `companyStore.set(id)` e `setSelectedCompanyId(id)` sempre juntos, nessa ordem.

#### Scenario: Troca de empresa
- **WHEN** `setSelectedCompany("nova-empresa-id")` é chamado
- **THEN** `companyStore.get()` SHALL retornar `"nova-empresa-id"` imediatamente
- **THEN** o `selectedCompanyId` no contexto React SHALL ser atualizado, disparando re-render

### Requirement: companyQueryKey para revalidação de queries
O `CompanyContext` SHALL expor `companyQueryKey: string[]` derivado do `selectedCompanyId`. Queries que dependem de empresa MUST incluir este array em suas query keys para revalidação automática ao trocar empresa.

#### Scenario: companyQueryKey com empresa selecionada
- **WHEN** `selectedCompanyId` é `"empresa-id"`
- **THEN** `companyQueryKey` SHALL ser `["empresa-id"]`

#### Scenario: Mudança de empresa invalida queries
- **WHEN** `setSelectedCompany("nova-empresa-id")` é chamado
- **THEN** todas as queries cujas keys incluem o `companyQueryKey` anterior SHALL ser re-executadas automaticamente pelo React Query
