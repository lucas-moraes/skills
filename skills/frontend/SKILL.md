---
name: frontend
description: "This skill transforms UI requirements into highly reusable, accessible, and testable frontend component specifications and code."
---

# Arquiteto de Componentes Frontend Senior

Esta skill transforma requisitos de interface em especificações e códigos de componentes frontend altamente reutilizáveis, acessíveis e testáveis. Ela aplica os princípios de Component-Driven Development (CDD) e garante que cada componente possua uma API de propriedades (Props) robusta, suporte a variantes visuais, internacionalização e identificadores únicos (`id` e `data-testid`) essenciais para automação de testes (QA), analytics e acessibilidade.

## Workflow

1. **Decomposição Anatômica:** Analisar a interface solicitada e dividi-la em sub-elementos lógicos, variantes visuais e mapear os estados de UI necessários (Hover, Focus, Disabled, Loading).
2. **Estratégia de Identificação:** Definir como o componente receberá ou gerará automaticamente seus IDs e `data-testid` para a árvore de elementos internos.
3. **Modelagem da API (Props):** Estruturar o contrato de propriedades em TypeScript, incluindo tipagem para variantes, estados, textos internacionalizáveis e documentando com JSDoc.
4. **Vínculo de Acessibilidade (A11y):** Utilizar os IDs mapeados para conectar labels, descrições (`aria-describedby`), gerenciar estados de foco e garantir os atributos `aria-*` corretos para cada estado da UI.
5. **Geração da Resposta:** Entregar a especificação técnica completa, o código de referência resiliente e exemplos práticos de uso conforme o formato padrão.

## Types

| Propriedade           | Tipo                 | Obrigatório | Descrição / Propósito                                                                                              |
| :-------------------- | :------------------- | :---------- | :----------------------------------------------------------------------------------------------------------------- |
| `id`                  | `string`             | Não         | Identificador único do DOM. Se omitido, deve usar um gerador automático (ex: `useId`). Crucial para labels e A11y. |
| `data-testid`         | `string`             | Sim         | Identificador exclusivo para seletores de testes automatizados (Cypress/Playwright).                               |
| `variant`             | `string` (Union)     | Não         | Define o estilo visual baseado nos Design Tokens (ex: `'primary' \| 'secondary'`).                                 |
| `size`                | `string` (Union)     | Não         | Define a escala dimensional do componente (ex: `'sm' \| 'md' \| 'lg'`).                                            |
| `isLoading`           | `boolean`            | Não         | Controla o estado de carregamento, desativando interações e alterando a acessibilidade (`aria-busy`).              |
| `className` / `style` | `string` \| `object` | Não         | Permite a extensão de estilos e posicionamento pelo componente pai sem quebrar o isolamento.                       |
| `children`            | `ReactNode` \| `any` | Depende     | Conteúdo interno do componente (obrigatório em componentes de container/wrapper).                                  |

## Rules

- **NUNCA** crie um componente sem uma propriedade de identificação raiz (`data-testid`) e identificadores para elementos interativos internos.
- **NUNCA** insira lógica de negócio acoplada (chamadas diretas de API/Fetch) dentro de componentes visuais de UI.
- **NUNCA** deixe textos de interface ou labels internos fixos (hardcoded) sem dar a opção de serem sobrescritos via props para suporte a i18n (internacionalização).
- **SEMPRE** utilize TypeScript rígido para tipar as propriedades e documentar comportamentos com JSDoc.
- **SEMPRE** derive os IDs dos sub-elementos críticos a partir do ID principal do componente (ex: `${id}-close-button`).
- **SEMPRE** garanta suporte total a teclado (Tab, Enter, Space, Esc) e trate visualmente os estados de `:focus-visible` para acessibilidade.
- **SEMPRE** reflita estados lógicos (como `disabled` ou `loading`) nos atributos nativos do HTML e ARIA (`disabled`, `aria-disabled`, `aria-busy`).

## Edge Cases

- **ID Omitido pelo Desenvolvedor:** O componente deve se antecipar e gerar um fallback de ID dinâmico único em tempo de execução para não quebrar regras de acessibilidade.
- **Múltiplas Instâncias na Mesma Tela:** Os IDs internos derivados não podem colidir se o componente for renderizado várias vezes (ex: múltiplos Modais em uma página).
- **Estado de Loading Ativo durante Clique:** O componente deve bloquear cliques repetidos (debounce/disabled) quando `isLoading` for verdadeiro para evitar múltiplos envios de formulário.
- **Texto Muito Longo (Overflow):** O componente deve prever comportamento para textos maiores que o container (truncamento com reticências ou quebra de linha tratada) sem quebrar o layout.

## Examples

### 🧩 Componente: CustomButton

**Anatomia Rastreável e Estados:**

- Elemento Botão Raiz: recebe `data-testid`, `id`, gerencia estados `:hover`, `:focus-visible`, e `:disabled`.
- Ícone de Loading (se ativo): recebe `data-testid="${testId}-spinner"` e `aria-hidden="true"`.

**Código de Referência (React + TS):**

```tsx
import React, { useId } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "data-testid": string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string; // Suporte a i18n para o texto de carregamento
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  id,
  "data-testid": testId,
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingText = "Carregando...",
  disabled,
  children,
  className = "",
  ...props
}) => {
  const generatedId = useId();
  const buttonId = id || generatedId;
  const isButtonDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      id={buttonId}
      data-testid={testId}
      disabled={isButtonDisabled}
      aria-busy={isLoading}
      className={`btn btn-${variant} btn-${size} ${isLoading ? "is-loading" : ""} ${className}`}
    >
      {isLoading ? (
        <>
          <span className="spinner" data-testid={`${testId}-spinner`} aria-hidden="true" />
          <span className="sr-only">{loadingText}</span>
          <span className="btn-text-loading">{loadingText}</span>
        </>
      ) : (
        <span className="btn-content">{children}</span>
      )}
    </button>
  );
};
```
