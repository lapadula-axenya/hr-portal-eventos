## Context

Atualmente todos os usuários do portal são CUSTOMER — possuem empresa única e fixa. O `Principal` retornado por `GET /principal/me` contém `company` diretamente, e o interceptor do `clientApi` apenas injeta o token Firebase. Não há conceito de empresa ativa ou troca de contexto.

O backend está introduzindo o tipo `KAM`, que pode estar associado a múltiplas empresas. Ele usa o header `X-Company-Id` para determinar em qual empresa o KAM está operando. Para CUSTOMER, o backend ignora esse header.

O problema central no frontend é que o interceptor Axios roda fora do React e não pode ler Context diretamente.

## Goals / Non-Goals

**Goals:**
- KAM consegue selecionar empresa ativa via switcher no header
- Todas as requisições do `clientApi` carregam `X-Company-Id` para KAM
- Trocar empresa invalida e refaz todas as queries ativas
- CUSTOMER não é afetado — nenhuma mudança de comportamento
- Principal listing exibe `type` e protege ações de edição para KAM

**Non-Goals:**
- Persistência da empresa selecionada entre sessões (não requerido)
- Suporte a múltiplos tabs com empresas diferentes
- Qualquer UI de gestão de associações KAM-empresa (é feito via API key pelo backend)

## Decisions

### D1 — Singleton + useState como dupla obrigatória

**Decisão:** Usar um módulo singleton (`companyStore.ts`) em conjunto com `useState` no `CompanyContext`.

**Problema:** O interceptor Axios precisa de leitura síncrona fora do React. React Context não é acessível fora da árvore de componentes. Usar apenas `useState` resolve o re-render mas não alcança o interceptor. Usar apenas o singleton não dispara re-render nem revalidação de queries.

**Solução:** Os dois são sempre atualizados juntos pela função `setSelectedCompany(id)`:
1. `companyStore.set(id)` — interceptor lê antes do próximo request
2. `setSelectedCompanyId(id)` — React re-renderiza, `companyQueryKey` muda, queries re-executam

**Alternativa descartada:** Ler `queryClient.getQueryData()` no interceptor — tecnicamente possível mas abusa do TanStack Query que é para server state, não UI state.

**Analogia com o código existente:** O interceptor já usa `getAuth().currentUser` do Firebase (singleton). O `companyStore` segue o mesmo padrão.

### D2 — CompanyContext inicializado apenas para KAM

**Decisão:** O `CompanyProvider` detecta o `type` do principal e só ativa o contexto para KAM.

**Motivação:** CUSTOMER não tem empresa variável — `principal.company` já é a fonte de verdade. Inicializar o CompanyContext para CUSTOMER seria lógica desnecessária e poderia gerar requests extras sem valor.

**Consequência:** O interceptor só injeta `X-Company-Id` quando `companyStore` tem valor (o que só acontece para KAM). Para CUSTOMER, o header nunca é enviado — comportamento idêntico ao atual.

### D3 — companyQueryKey para revalidação automática

**Decisão:** Derivar um `companyQueryKey = [selectedCompanyId]` do `CompanyContext`, e incluí-lo nas query keys das queries que dependem de empresa.

**Motivação:** Segue o padrão já estabelecido pelo `authQueryKey` no `AuthContext`. Quando o company ID muda, React Query detecta a nova chave e re-executa automaticamente — sem invalidação manual.

**Impacto:** Queries que não dependem de empresa (ex: dados globais) não precisam incluir o `companyQueryKey`.

### D4 — Empresa inicial é a `isHome=true`

**Decisão:** Ao montar o `CompanyProvider` para um KAM, buscar `GET /companies`, encontrar a empresa com `isHome=true` e chamar `setSelectedCompany` com ela.

**Motivação:** O backend faz fallback para home company quando não há header. Inicializar com `isHome=true` garante consistência entre o que o backend usa e o que o frontend exibe.

**Edge case:** A resposta de `GET /companies` sem `X-Company-Id` não terá `isActive=true` em nenhuma empresa. O switcher usa `isHome=true` como indicador visual da empresa padrão nesse primeiro load.

### D5 — Company switcher no PageHeader existente

**Decisão:** Adicionar o switcher dentro do `PageHeader` existente, condicionado a `principal.type === KAM`.

**Motivação:** O `PageHeader` já exibe o nome da empresa e tem acesso ao `principal`. É o ponto natural para a troca de contexto de empresa. Para CUSTOMER, o layout permanece idêntico.

## Risks / Trade-offs

**[Race condition no primeiro request]** → O `CompanyProvider` faz um fetch assíncrono para obter as empresas antes de definir o `companyStore`. Requests que saiam antes disso completar não terão `X-Company-Id`. Mitigação: o backend faz fallback para home company, então o comportamento é correto mesmo sem o header.

**[Tabs múltiplos]** → O `companyStore` é um módulo singleton de memória — cada tab tem o seu próprio. Trocar empresa em uma tab não afeta outra. Não é um requisito atual, mas vale documentar.

**[Queries sem companyQueryKey]** → Queries que deveriam depender de empresa mas não incluem `companyQueryKey` continuarão mostrando dados da empresa anterior após a troca. Requer atenção ao identificar quais queries precisam do key.

## Migration Plan

Não há migração de dados. A mudança é aditiva:
1. CUSTOMER não é afetado — nenhuma mudança de comportamento ou visual
2. KAM passa a ter o switcher disponível assim que o backend entregar `type=KAM` no response
3. Deploy pode ser feito a qualquer momento sem coordenação especial com o backend — se `type` não vier no response, o código trata como CUSTOMER por padrão
