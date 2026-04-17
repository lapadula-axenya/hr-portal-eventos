## ADDED Requirements

### Requirement: Exibição do tipo do principal na listagem
A listagem de principals SHALL exibir o campo `type` de cada principal. Principals com `type === KAM` MUST ser visualmente diferenciados dos principals `CUSTOMER`.

#### Scenario: KAM aparece na listagem
- **WHEN** um administrador acessa a listagem de principals
- **THEN** principals com `type === KAM` SHALL aparecer na lista com um badge ou indicador visual de tipo `KAM`

#### Scenario: CUSTOMER sem indicador especial
- **WHEN** um administrador acessa a listagem de principals
- **THEN** principals com `type === CUSTOMER` SHALL ser exibidos sem badge especial de tipo

### Requirement: Ações de edição desabilitadas para KAM
A listagem de principals SHALL desabilitar ou ocultar as ações de edição (alterar roles, desativar, reativar) para principals com `type === KAM`. Essas ações MUST NOT ser acessíveis por administradores CUSTOMER.

#### Scenario: Ações indisponíveis para KAM
- **WHEN** um administrador CUSTOMER visualiza um principal KAM na listagem
- **THEN** as ações de alterar roles, desativar e reativar SHALL estar desabilitadas ou ocultas para esse principal

#### Scenario: Ações disponíveis para CUSTOMER
- **WHEN** um administrador CUSTOMER visualiza um principal CUSTOMER na listagem
- **THEN** as ações de edição SHALL estar disponíveis normalmente, sem alteração de comportamento
