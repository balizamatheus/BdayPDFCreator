# 🚀 Plano de Refatoração: BdayPDF Creator Workbench

## 1. Visão Geral do Projeto Atual
O projeto é um sistema funcional chamado "Cartões Automáticos" que gera PDFs a partir de um Excel.
- **Stack:** Vanilla JS, HTML5, CSS3, `pdf-lib`, `xlsx` (SheetJS) e `download.js`.
- **Estado Atual:** Layout baseado em seções verticais (Upload, Template, Prévia, Resultados).
- **Objetivo:** Refatorar para uma interface "Workbench" de tela cheia (estilo Photoshop/Figma) mantendo a lógica de processamento local.

## 2. Nova Arquitetura de UI (CSS Grid)
A IA deve reorganizar o `index.html` e o `style.css` para um layout fixo de 100vh:
- **Estrutura:** - `header` (60px): Logo e botão de ação global "GENERATE BATCH".
  - `main.app-body`: Grid de 3 colunas [60px (Toolbar) | 1fr (Canvas) | 320px (Properties Panel)].

## 3. Mapeamento de Funcionalidades Existentes
As funções e variáveis do `script.js` devem ser preservadas e realocadas na nova UI:

### A. Painel de Propriedades (Direita)
- **Data Mapping:** Substituir os inputs manuais de coordenadas por dropdowns que vinculam os campos do PDF (`fieldPositions`) às colunas detectadas no `excelData`.
- **Uploads:** Integrar as áreas de Drag-and-drop de Excel e PDF no topo deste painel.
- **Live Preview:** Mover os controles de navegação de registros (Abas de meses e botões de navegação) para a base deste painel.

### B. Área de Canvas (Centro)
- **Visualização:** O container de prévia do PDF (`updatePDFPreview`) deve ficar centralizado no canvas com fundo escuro (#2b2b2b).
- **Interatividade:** Manter a capacidade de posicionar campos, mas agora dentro deste ambiente de workbench.

### C. Toolbar (Esquerda)
- Adicionar botões de ícones para as ferramentas existentes: Seleção de campos, Edição de Texto e Zoom.

## 4. Requisitos Técnicos para a Refatoração
- **Preservação de Lógica:** Não remover as funções de sanitização de nomes, tratamento de datas (Brasília, DD de MMMM...) ou geração em lote (`generateAllPDFTemplateCards`).
- **Estilização:** Migrar as cores atuais para um tema Dark Mode coeso (Painéis: #1e1e1e, Bordas: #333333).
- **Responsividade:** Manter as validações e alertas de erro/sucesso funcionando via `showAlert()`.

## 5. Comando para a IA
> "Analise o arquivo `BASE_DE_CONHECIMENTO.md` para entender as variáveis globais e funções do meu `script.js`. Aplique a reestruturação visual descrita neste plano, movendo a lógica de entrada para o painel lateral direito e a visualização para o centro, garantindo que o fluxo de geração de PDF permaneça intacto."