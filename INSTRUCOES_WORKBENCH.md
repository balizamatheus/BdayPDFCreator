# 🚀 Guia do Workbench - BdayPDF Creator

## 1. Visão Geral do Workbench

O BdayPDF Creator apresenta uma interface workbench profissional estilo Photoshop/Figma para geração de cartões de felicitação. A interface é organizada em tela cheia com 3 colunas principais, proporcionando um ambiente de trabalho eficiente e intuitivo.

### Estrutura da Interface

```
┌─────────────────────────────────────────────────────────────────────────┐
│  HEADER (60px)                                                    │
│  [Logo]                    [Gerar em lote]                        │
├─────────┬────────────────────────────────────┬─────────────────────────┤
│         │                                    │                     │
│ TOOLBAR│         CANVAS (1fr)              │ PROPERTIES PANEL    │
│ (60px) │                                    │ (320px)             │
│         │  ┌────────────────────────────┐    │                     │
│  🖱️    │  │                        │    │  [Upload Excel]     │
│ Select │  │   PDF Preview           │    │                     │
│         │  │   (Zoom: 100%)         │    │  [Template PDF]     │
│  ✏️    │  │                        │    │                     │
│ Text   │  └────────────────────────────┘    │  [Posicionar Campos] │
│         │                                    │  (Accordion)        │
│  🔍    │                                    │                     │
│ Zoom   │                                    │  [Prévia dos Dados] │
│         │                                    │  (Month Tabs)       │
│         │                                    │                     │
│         │                                    │  [Baixar em Lote]   │
│         │                                    │                     │
└─────────┴────────────────────────────────────┴─────────────────────────┘
```

---

## 2. Componentes do Workbench

### 2.1 Header (60px)

**Elementos:**
- **Logo**: Ícone e texto "BdayPDF Creator"
- **Botão "Gerar em lote"**: Inicia geração de todos os cartões selecionados

**Funcionalidades:**
- Botão com ícone de execução
- Efeito hover com brilho azul
- Somente habilitado quando há cartões selecionados

### 2.2 Toolbar Esquerda (60px)

**Ferramentas Disponíveis:**
1. **Select (🖱️)**: Seleção de campos
2. **Text (✏️)**: Edição de texto
3. **Zoom (🔍)**: Zoom

**Comportamento:**
- Ícones grandes e claros
- Estado ativo destacado em azul
- Hover effect com fundo escuro
- *Nota: Atualmente as ferramentas são visuais apenas*

### 2.3 Canvas Central (1fr)

**Elementos:**
- **Header do Canvas**: Título "PDF Preview" e controles de zoom
- **Área de Conteúdo**: Iframe de preview ou placeholder
- **Controles de Zoom**: Botões - e +, display de nível atual

**Funcionalidades:**
- Zoom de 50% a 200% em incrementos de 10%
- Preview em tempo real do template PDF
- Placeholder quando nenhum template está carregado
- Background escuro (#2b2b2b)

**Controles de Zoom:**
- Botão **-**: Diminui zoom (mínimo 50%)
- **Display**: Mostra nível atual (ex: "100%")
- Botão **+**: Aumenta zoom (máximo 200%)

### 2.4 Painel de Propriedades Direita (320px)

#### 2.4.1 Seção Upload Excel

**Elementos:**
- Upload box com drag-and-drop
- File info quando arquivo está carregado
- Botão de remover

**Funcionalidades:**
- Suporta .xlsx e .xls
- Valida colunas obrigatórias
- Exibe nome e tamanho do arquivo
- Converte datas automaticamente

#### 2.4.2 Seção Template PDF

**Elementos:**
- Upload box com drag-and-drop
- Checkbox "Usar padrão"
- File info quando arquivo está carregado
- Botão de remover

**Funcionalidades:**
- Suporta arquivos PDF
- Opção de usar template padrão (`src/Template.pdf`)
- Exibe nome e tamanho do arquivo
- Habilita seção de posicionamento de campos

#### 2.4.3 Seção Posicionar Campos (Accordion)

**Elementos:**
- Título com ícone de accordion
- 3 grupos de campos (Nome, Vocativo, Data)
- Lista de campos configurados

**Campos Configuráveis:**

**Nome:**
- **X**: Coordenada horizontal (padrão: 107)
- **Y**: Coordenada vertical (padrão: 380)
- **Tamanho**: Tamanho da fonte (padrão: 27)
- **Alinhar**: Esquerda, Centro, Direita (padrão: Esquerda)
- **Botão "Atualizar"**: Salva configurações

**Vocativo:**
- **X**: Coordenada horizontal (padrão: 115)
- **Y**: Coordenada vertical (padrão: 412)
- **Tamanho**: Tamanho da fonte (padrão: 14)
- **Alinhar**: Esquerda, Centro, Direita (padrão: Esquerda)
- **Botão "Atualizar"**: Salva configurações
- *Nota: Automaticamente convertido para MAIÚSCULAS*

**Data:**
- **X**: Coordenada horizontal (padrão: 765)
- **Y**: Coordenada vertical (padrão: 490)
- **Tamanho**: Tamanho da fonte (padrão: 18)
- **Alinhar**: Esquerda, Centro, Direita (padrão: Direita)
- **Botão "Atualizar"**: Salva configurações
- *Nota: Formatado como "Brasília, DD de MMMM de YYYY"*

**Comportamento do Accordion:**
- Clique no título para expandir/recolher
- Ícone gira 180° quando expandido
- Transição suave de altura e opacidade

#### 2.4.4 Seção Prévia dos Dados

**Elementos:**
- Resumo de seleção (X/Y cartões selecionados)
- Abas de mês com checkboxes
- Contador por mês (selecionados/total)

**Funcionalidades:**
- Dados agrupados por mês
- Ordem cronológica (Janeiro a Dezembro)
- Checkbox para selecionar todos de um mês
- Estados visuais:
  - **Selecionado**: Checkbox marcado, fundo destacado
  - **Parcial**: Checkbox desmarcado, fundo parcialmente destacado
  - **Não selecionado**: Checkbox desmarcado, fundo normal

**Interação:**
- Clique no nome do mês: Abre modal de seleção
- Clique no checkbox: Seleciona/deseleciona todos do mês

#### 2.4.5 Seção Baixar em Lote

**Elementos:**
- Resumo de cartões gerados
- Lista de resultados
- Botão "Baixar ZIP"
- Botão "Resetar"

**Funcionalidades:**
- Exibe quantidade de PDFs gerados
- Lista todos os cartões gerados
- Download em lote como ZIP
- Reset de todos os dados

---

## 3. Modal de Seleção por Mês

### 3.1 Estrutura do Modal

```
┌─────────────────────────────────────────────────────────────────┐
│ [←]  Seleção de Cartões - Mês  [X]              [→]  │
├─────────────────────────────────────────────────────────────────┤
│  📅 X de Y cartões selecionados                            │
│  [Selecionar Todos]  [Desmarcar Todos]                     │
├─────────────────────────────────────────────────────────────────┤
│ ☐ | Nome           | Vocativo | Data        | Ação       │
│ ☑ | João Silva    | Caro João | 18/01/2026  | [Download]  │
│ ☐ | Maria Santos  | Prezada   | 20/01/2026  | [Download]  │
│ ☑ | Pedro Costa   | Querido    | 25/01/2026  | [Download]  │
├─────────────────────────────────────────────────────────────────┤
│  [✓ OK]           [⬇️ Baixar Selecionados]               │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Elementos do Modal

**Header:**
- **Botão Anterior (←)**: Navega para mês anterior
- **Título**: "Seleção de Cartões - [Nome do Mês]"
- **Botão Fechar (X)**: Fecha modal
- **Botão Próximo (→)**: Navega para próximo mês

**Body:**
- **Resumo**: Ícone de calendário + "X de Y cartões selecionados"
- **Botões de Ação**: "Selecionar Todos", "Desmarcar Todos"
- **Tabela**: Checkbox, Nome, Vocativo, Data, Ação
- **Checkbox "Selecionar Todos"**: No cabeçalho da tabela

**Footer:**
- **Botão OK**: Salva seleções e fecha modal
- **Botão Baixar Selecionados**: Baixa cartões selecionados como ZIP

### 3.3 Funcionalidades do Modal

**Navegação entre Meses:**
- Botões anterior/próximo habilitados apenas quando há meses adjacentes
- Navegação apenas para meses com dados
- Atualiza título e conteúdo do modal

**Seleção de Cartões:**
- Checkboxes individuais para cada cartão
- Checkbox "Selecionar Todos" no cabeçalho
- Botões "Selecionar Todos" e "Desmarcar Todos"
- Resumo atualizado em tempo real

**Download Individual:**
- Botão de download ao lado de cada cartão
- Baixa apenas o cartão específico

**Salvar Seleções:**
- Aplica seleções do modal para seleção principal
- Atualiza abas de mês no painel principal
- Atualiza contador de seleção
- Fecha modal

**Baixar Selecionados:**
- Salva seleções
- Gera PDFs para cartões selecionados
- Baixa como arquivo ZIP
- Fecha modal

---

## 4. Modal de Progresso

### 4.1 Estrutura

```
┌─────────────────────────────────────────────────────────────────┐
│  🔄 Gerando Cartões...                                    │
│  ┌───────────────────────────────────────────────────────┐   │
│  │ ████████████████████████░░░░░░░░░░░░░░░░░░░░░ │   │
│  └───────────────────────────────────────────────────────┘   │
│  15 de 30 cartões gerados                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Elementos

- **Título**: "🔄 Gerando Cartões..."
- **Barra de Progresso**: Preenchimento animado
- **Texto de Progresso**: "X de Y cartões gerados"

### 4.3 Comportamento

- Exibido durante geração em lote
- Barra preenchida progressivamente (0% a 100%)
- Texto atualizado a cada cartão gerado
- Fechado automaticamente ao completar

---

## 5. Sistema de Alertas

### 5.1 Tipos de Alertas

**Alerta de Sucesso:**
- Cor: Verde (#4caf50)
- Ícone: ✅
- Título: "Sucesso"
- Auto-fechamento: 5 segundos

**Alerta de Erro:**
- Cor: Vermelho (#f44336)
- Ícone: ❌
- Título: "Erro"
- Auto-fechamento: 5 segundos

### 5.2 Estrutura

```
┌─────────────────────────────────────────────────────────────────┐
│ [✅]  Sucesso                                               │
│  Mensagem de sucesso aqui                                    │
│                                             [✕]         │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Funcionalidades

- Animação de entrada (fade in)
- Animação de saída (fade out)
- Botão de fechamento manual
- Container de alertas no canto da tela
- Múltiplos alertas podem ser exibidos simultaneamente

---

## 6. Efeitos Visuais

### 6.1 Glitter Effects

**Descrição:**
- Efeitos de brilho que seguem o movimento do mouse
- Aplicado aos cards de upload no modal de boas-vindas
- Usa gradientes conic com texturas de ruído

**Implementação:**
- Listener unificado no container pai (`.upload-grid`)
- Calcula posição do mouse relativa a cada card
- Atualiza variáveis CSS para gradientes
- Sincroniza brilho entre cards vizinhos

**Variáveis CSS:**
```css
--mouse-x: 0px
--mouse-y: 0px
--ratio-x: .5
--ratio-y: .75
--light-size: 200px
```

### 6.2 Dark Theme

**Paleta de Cores:**
- Fundo principal: #1e1e1e
- Fundo secundário: #252526
- Fundo terciário: #2d2d30
- Fundo do canvas: #2b2b2b
- Bordas: #333333
- Texto principal: #ffffff
- Texto secundário: #cccccc
- Texto mudo: #888888
- Cor de destaque: #0078d4
- Cor de destaque hover: #106ebe
- Cor de sucesso: #4caf50
- Cor de erro: #f44336

### 6.3 Hover Effects

**Botões:**
- Fundo transparente → Fundo com transparência de cor
- Borda sólida → Borda com sombra
- Transform translateY(-1px) no hover
- Transform translateY(0) no active

**Cards:**
- Borda normal → Borda destacada
- Fundo normal → Fundo destacado
- Transição suave de 0.3s

**Inputs:**
- Borda normal → Borda destacada
- Foco com cor de destaque

---

## 7. Fluxo de Trabalho Detalhado

### 7.1 Fluxo Inicial

1. **Abrir Sistema**
   - Usuário abre `index.html` no navegador
   - Modal de boas-vindas é exibido

2. **Upload de Arquivos**
   - Usuário arrasta ou clica para upload de Excel
   - Sistema valida arquivo e exibe informações
   - Usuário arrasta ou clica para upload de PDF
   - OU marca checkbox "Usar padrão"
   - Sistema valida e exibe informações

3. **Iniciar Aplicação**
   - Botão "Iniciar Aplicação" é habilitado
   - Usuário clica no botão
   - Sistema carrega template PDF
   - Transição suave para workbench

### 7.2 Fluxo de Configuração

4. **Configurar Campos**
   - Usuário expande seção "Posicionar Campos"
   - Ajusta coordenadas X, Y para cada campo
   - Ajusta tamanho da fonte
   - Escolhe alinhamento
   - Clica em "Atualizar" para cada campo
   - Prévia é atualizada automaticamente

5. **Visualizar Dados**
   - Sistema exibe dados agrupados por mês
   - Usuário vê abas de mês
   - Usuário vê contador de seleção

### 7.3 Fluxo de Seleção

6. **Selecionar Cartões**
   - Usuário marca checkbox ao lado do mês
   - OU clica no nome do mês para abrir modal
   - No modal, usuário marca checkboxes individuais
   - Usa botões "Selecionar Todos" ou "Desmarcar Todos"
   - Navega entre meses se necessário
   - Clica em "OK" para salvar

### 7.4 Fluxo de Geração

7. **Gerar PDFs**
   - Usuário clica em "Gerar em lote"
   - Modal de progresso é exibido
   - Sistema gera PDFs sequencialmente
   - Barra de progresso é atualizada
   - Modal é fechado ao completar

8. **Baixar PDFs**
   - Usuário clica em "Baixar ZIP"
   - Sistema cria arquivo ZIP
   - Download é iniciado
   - Alerta de sucesso é exibido

---

## 8. Dicas de Uso

### 8.1 Posicionamento de Campos

- Use o zoom para visualizar melhor o template
- Ajuste as coordenadas gradualmente
- Use a prévia em tempo real para verificar
- O alinhamento afeta a posição horizontal do texto
  - **Esquerda**: Texto começa na coordenada X
  - **Centro**: Texto é centralizado na coordenada X
  - **Direita**: Texto termina na coordenada X

### 8.2 Seleção de Cartões

- Use as abas de mês para selecionar rapidamente
- Abra o modal para seleção detalhada
- Navegue entre meses no modal para verificar todos
- O contador mostra quantos cartões estão selecionados

### 8.3 Geração de PDFs

- Gere apenas os cartões necessários para economizar tempo
- O progresso é atualizado em tempo real
- Erros individuais não interrompem o processo
- Os nomes dos arquivos são sanitizados automaticamente

### 8.4 Download

- Use "Baixar ZIP" para baixar tudo de uma vez
- Use download individual no modal para cartões específicos
- O arquivo ZIP tem timestamp no nome
- Nomes duplicados recebem um contador automaticamente

---

## 9. Solução de Problemas

### 9.1 Template não aparece no canvas

- Verifique se o arquivo PDF foi carregado
- Verifique se o checkbox "Usar padrão" está marcado
- Tente recarregar o template
- Verifique se o arquivo `src/Template.pdf` existe

### 9.2 Campos não aparecem no PDF

- Verifique se as coordenadas estão corretas
- Verifique se o tamanho da fonte é positivo
- Verifique se o alinhamento está definido
- Clique em "Atualizar" após fazer alterações

### 9.3 Dados não aparecem

- Verifique se o arquivo Excel foi carregado
- Verifique se as colunas obrigatórias existem
- Verifique se há pelo menos uma linha de dados
- Tente recarregar o arquivo Excel

### 9.4 Seleção não funciona

- Verifique se os checkboxes estão visíveis
- Clique no nome do mês para abrir o modal
- Verifique se há dados para o mês selecionado
- Tente recarregar a página

### 9.5 Geração não inicia

- Verifique se há cartões selecionados
- Verifique se o template PDF está carregado
- Verifique se o arquivo Excel está carregado
- Tente selecionar cartões novamente

---

## 10. Atalhos e Comportamentos

### 10.1 Drag-and-Drop

- **Upload Excel**: Arraste arquivo Excel para a área indicada
- **Upload PDF**: Arraste arquivo PDF para a área indicada
- Visual: Borda fica verde quando arquivo está sobre a área

### 10.2 Click

- **Upload boxes**: Clique para abrir seletor de arquivo
- **Month tabs**: Clique para abrir modal de seleção
- **Accordion**: Clique para expandir/recolher
- **Toolbar items**: Clique para ativar ferramenta (visual)
- **Buttons**: Clique para executar ação

### 10.3 Checkbox

- **Month tabs**: Seleciona todos os cartões do mês
- **Modal table**: Seleciona cartão individual
- **Modal header**: Seleciona todos os cartões do modal

---

## 11. Responsividade

### 11.1 Desktop (> 768px)

- Layout completo de 3 colunas
- Canvas com tamanho completo
- Painel de propriedades com largura fixa

### 11.2 Mobile (≤ 768px)

- Layout adaptado para tela menor
- Toolbar reduzida
- Canvas com scroll horizontal
- Painel de propriedades em coluna única
- Botões em largura total

---

## 12. Notas Técnicas

### 12.1 Arquitetura

- **Vanilla JavaScript**: Sem frameworks externos
- **CSS Grid**: Layout de 3 colunas
- **Flexbox**: Alinhamento interno dos componentes
- **Event Delegation**: Otimização de event listeners

### 12.2 Performance

- **Geração Sequencial**: PDFs gerados um por um para evitar travamentos
- **Lazy Loading**: Componentes carregados sob demanda
- **CSS Transitions**: Animações otimizadas com GPU
- **Debouncing**: Otimização de eventos de mouse

### 12.3 Compatibilidade

- **Navegadores Modernos**: Chrome, Firefox, Edge, Safari
- **PDF-lib**: Compatível com a maioria dos PDFs
- **SheetJS**: Suporta .xlsx e .xls
- **JSZip**: Criação de ZIP compatível com todos os sistemas

---

**Última Atualização**: 2026-02-14  
**Versão**: 2.0  
**Status**: Produção
