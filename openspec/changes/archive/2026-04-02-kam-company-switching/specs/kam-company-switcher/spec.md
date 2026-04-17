## ADDED Requirements

### Requirement: Company switcher visível apenas para KAM
O `PageHeader` SHALL exibir um componente de seleção de empresa apenas quando `principal.type === KAM`. Para `type === CUSTOMER`, o layout SHALL permanecer idêntico ao atual.

#### Scenario: KAM vê o switcher
- **WHEN** um principal com `type === KAM` está autenticado
- **THEN** o `PageHeader` SHALL exibir um seletor de empresa interativo

#### Scenario: CUSTOMER não vê o switcher
- **WHEN** um principal com `type === CUSTOMER` está autenticado
- **THEN** o `PageHeader` SHALL exibir o nome da empresa de forma estática, sem interação
- **THEN** o layout SHALL ser visualmente idêntico ao comportamento atual

### Requirement: Switcher exibe lista de empresas acessíveis
O company switcher SHALL exibir todas as empresas retornadas por `GET /companies`, indicando visualmente qual é a empresa atualmente ativa.

#### Scenario: Lista de empresas no switcher
- **WHEN** o KAM abre o switcher
- **THEN** todas as empresas acessíveis SHALL ser listadas

#### Scenario: Empresa ativa destacada
- **WHEN** o switcher é aberto
- **THEN** a empresa correspondente ao `selectedCompanyId` do `CompanyContext` SHALL ser visualmente destacada

#### Scenario: Empresa home no primeiro load
- **WHEN** o KAM abre o switcher antes de ter trocado de empresa
- **THEN** a empresa com `isHome=true` SHALL ser exibida como selecionada

### Requirement: Seleção de empresa dispara troca de contexto
Ao selecionar uma empresa no switcher, o sistema SHALL chamar `setSelectedCompany(id)` do `CompanyContext`.

#### Scenario: KAM seleciona empresa
- **WHEN** o KAM clica em uma empresa no switcher
- **THEN** o sistema SHALL chamar `setSelectedCompany` com o `id` da empresa selecionada
- **THEN** o switcher SHALL fechar e exibir o nome da nova empresa ativa no header
- **THEN** as queries da tela SHALL ser re-executadas com o novo `X-Company-Id`
