## ADDED Requirements

### Requirement: Select de empresa compacto no PageHeader
O Select de troca de empresa exibido no `PageHeader` para usuários KAM SHALL ter aparência visual compacta e sem bordas, equivalente ao `EllipsisText` usado para usuários não-KAM.

#### Scenario: Fonte do Select é caption
- **WHEN** o usuário KAM visualiza o PageHeader
- **THEN** o texto da empresa selecionada SHALL ter fonte de 0.75rem (equivalente ao MUI variant caption)

#### Scenario: Select sem bordas em estado normal
- **WHEN** o Select está no estado normal (sem foco)
- **THEN** não SHALL haver underline, outline ou borda visível ao redor do Select

#### Scenario: Select sem bordas ao receber foco
- **WHEN** o usuário clica ou foca no Select
- **THEN** não SHALL aparecer outline, border ou underline ao redor do Select

#### Scenario: Padding interno compacto
- **WHEN** o Select é renderizado
- **THEN** o padding interno SHALL ser zero ou mínimo, sem adicionar altura extra ao header
