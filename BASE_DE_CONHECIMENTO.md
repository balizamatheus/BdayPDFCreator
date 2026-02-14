# Base de Conhecimento - BdayPDF Creator

## 📋 Visão Geral do Projeto

Sistema web profissional para geração automática de cartões de felicitação em PDF personalizados a partir de dados em arquivos Excel. O sistema apresenta uma interface estilo workbench (similar ao Photoshop/Figma) com modal de boas-vindas para upload inicial, posicionamento dinâmico de campos em templates PDF e geração em lote com seleção por mês.

---

## 🎯 Funcionalidades Principais

### 1. Modal de Boas-Vindas (Welcome Modal)
- **Interface Photoshop-inspired** com efeitos de glitter (brilho) que seguem o movimento do mouse
- Upload drag-and-drop para arquivo Excel e template PDF
- Opção de usar template padrão (`src/Template.pdf`)
- Validação automática de arquivos
- Botão "Iniciar Aplicação" habilitado quando ambos os arquivos são carregados
- Transição suave para a interface workbench

### 2. Interface Workbench (Tela Cheia)
Layout profissional em tela cheia com 3 colunas:

#### Header (60px)
- Logo do aplicativo
- Botão "Gerar em lote" com ícone e efeitos hover

#### Toolbar Esquerda (60px)
- **Select**: Ferramenta de seleção de campos
- **Text**: Ferramenta de edição de texto
- **Zoom**: Ferramenta de zoom

#### Canvas Central (1fr)
- Prévia do PDF template com controles de zoom
- Zoom de 50% a 200% em incrementos de 10%
- Placeholder quando nenhum template está carregado
- Visualização em tempo real com dados de exemplo

#### Painel de Propriedades Direita (320px)
- Seção de Upload Excel
- Seção de Template PDF com opção de usar padrão
- Seção de Posicionamento de Campos (accordion)
- Seção de Prévia dos Dados com abas por mês
- Seção de Baixar em Lote

### 3. Upload de Arquivo Excel
- Interface drag-and-drop intuitiva
- Suporte aos formatos `.xlsx` e `.xls`
- Validação automática de colunas obrigatórias (Nome, Vocativo, Data)
- Exibição de informações do arquivo (nome e tamanho)
- Tratamento de datas em diferentes formatos (Date objects, números Excel, strings)
- Conversão automática para formato português: "Brasília, DD de MMMM de YYYY"

### 4. Upload de Template PDF Personalizado
- Carregamento de templates PDF personalizados
- Interface drag-and-drop para upload de PDF
- Validação de formato de arquivo
- Opção de usar template padrão de `src/Template.pdf`
- Prévia do template carregado no canvas central

### 5. Posicionamento Dinâmico de Campos
- Interface accordion para configurar campos no template PDF
- Campos configuráveis:
  - **Nome** (coordenadas X, Y, tamanho da fonte, alinhamento)
  - **Vocativo** (coordenadas X, Y, tamanho da fonte, alinhamento)
  - **Data** (coordenadas X, Y, tamanho da fonte, alinhamento)
- Opções de alinhamento: Esquerda, Centro, Direita
- Prévia em tempo real do PDF com dados de exemplo
- Lista de campos configurados com suas posições

### 6. Agrupamento de Dados por Mês
- Parsing automático de datas
- Ordenação cronológica dos meses (Janeiro a Dezembro)
- Abas de navegação entre meses no painel de propriedades
- Contador de cartões por mês (selecionados/total)
- Checkbox para selecionar/deselecionar todos os cartões de um mês
- Indicadores visuais de estado (selecionado, parcial, não selecionado)

### 7. Modal de Seleção por Mês
- Modal dedicado para visualizar e selecionar cartões de um mês específico
- Tabela com Nome, Vocativo, Data e botão de download individual
- Navegação entre meses (anterior/próximo)
- Botões "Selecionar Todos" e "Desmarcar Todos"
- Checkbox "Selecionar Todos" no cabeçalho da tabela
- Resumo de cartões selecionados
- Botão "OK" para salvar seleções
- Botão "Baixar Selecionados" para download imediato

### 8. Sistema de Seleção de Cartões
- Seleção individual de cartões através de checkboxes
- Seleção em lote por mês
- Contador de cartões selecionados (X/Y)
- Geração de PDFs apenas para cartões selecionados
- Download de cartões selecionados como arquivo ZIP

### 9. Geração de PDFs
- Geração em lote de todos os cartões selecionados
- Barra de progresso visual durante a geração
- Contador de cartões gerados
- Tratamento de erros individuais por cartão
- Sanitização de nomes de arquivo (remoção de acentos, espaços, caracteres especiais)
- Tratamento de nomes duplicados com contador

### 10. Download de PDFs
- Download individual de cada cartão (botão na tabela do modal)
- Download em lote de todos os PDFs gerados como arquivo ZIP
- Download de cartões selecionados como arquivo ZIP
- Nomes de arquivo sanitizados para compatibilidade
- Timestamp nos nomes dos arquivos ZIP

### 11. Sistema de Alertas
- Alertas de sucesso (verde) e erro (vermelho)
- Auto-fechamento após 5 segundos
- Animações de entrada e saída
- Ícones visuais para cada tipo de alerta
- Botão de fechamento manual

### 12. Efeitos Visuais
- **Dark Theme**: Paleta de cores profissional escura
- **Glitter Effects**: Efeitos de brilho que seguem o mouse nos cards de upload
- **Unified Mouse Tracking**: Listener único no container pai para sincronização de brilho
- **Hover Effects**: Efeitos hover em botões, cards e elementos interativos
- **Transições Suaves**: Animações de transição em todos os elementos

---

## 🔧 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica da página
- **CSS3** - Estilização e design responsivo
  - Variáveis CSS para cores
  - Flexbox e Grid layouts
  - Animações e transições
  - Media queries para responsividade
  - Efeitos de glitter com gradientes conic
- **JavaScript (Vanilla)** - Lógica da aplicação

### Bibliotecas JavaScript (CDN)

| Biblioteca | Versão | Função |
|-----------|--------|--------|
| **SheetJS (xlsx)** | 0.18.5 | Leitura e processamento de arquivos Excel |
| **html2canvas** | 1.4.1 | Captura de elementos HTML como imagem (mantido para compatibilidade) |
| **jsPDF** | 2.5.1 | Geração de PDFs (mantido para compatibilidade) |
| **pdf-lib** | 1.17.1 | Manipulação e modificação de PDFs |
| **Download.js** | 1.4.7 | Facilita downloads de arquivos |
| **JSZip** | 3.10.1 | Criação de arquivos ZIP para download em lote |

---

## 📊 Estrutura de Dados

### Formato do Arquivo Excel
O arquivo Excel deve conter as seguintes colunas obrigatórias:

| Coluna | Tipo | Descrição | Exemplo |
|--------|------|-----------|---------|
| Nome | Texto | Nome completo da pessoa | "Cel Av Nicolas Silva Mendes" |
| Vocativo | Texto | Tratamento pessoal | "Ao Senhor" |
| Data | Data | Data do evento (DD/MM/YYYY) | "05/03/2026" |

### Formatação de Datas
- **Entrada**: DD/MM/YYYY (ex: 05/03/2026)
- **Saída**: "Brasília, DD de MMMM de YYYY" (ex: "Brasília, 05 de Março de 2026")
- Suporta datas como objetos Date, números Excel ou strings
- Nomes dos meses em português

---

## 🏗️ Arquitetura do Código

### Estrutura de Arquivos

```
BdayPDFCreator/
├── index.html                    # Interface principal do sistema (431 linhas)
├── script.js                     # Lógica JavaScript (1838 linhas)
├── style.css                     # Estilos e design (2106 linhas)
├── criar_excel_exemplo.html      # Gerador de Excel de exemplo
├── README.md                     # Documentação do usuário
├── memory_bank.md                # Memória técnica do projeto
├── BASE_DE_CONHECIMENTO.md       # Este arquivo
├── INSTRUCOES_WORKBENCH.md      # Instruções do workbench
├── sincronizar_brilho_unificado.md # Documentação do efeito de brilho
├── exemplo.md                    # Exemplo de código para glitter effects
└── src/
    ├── iconlogo.svg              # Ícone do aplicativo
    ├── logo.svg                # Logo do aplicativo
    ├── textlogo.svg            # Logo em texto
    ├── textlogo1.svg           # Logo em texto alternativo
    ├── Template.pdf            # Template PDF padrão
    └── Template - Copia.pdf    # Cópia do template
```

### Componentes Principais

#### index.html
- **Welcome Modal**:
  - Glitter effects com imagens de ruído
  - Upload cards para Excel e Template PDF
  - Checkbox para usar template padrão
  - Botão "Iniciar Aplicação"

- **Workbench Interface**:
  - Header com logo e botão "Gerar em lote"
  - Left toolbar com ícones de ferramentas
  - Center canvas com iframe de preview e controles de zoom
  - Right properties panel com múltiplas seções
  - Month selection modal com navegação
  - Progress modal para feedback visual
  - Alert container para notificações

#### script.js
**Variáveis Globais:**
- `excelData` - Array com dados do Excel
- `pdfTemplateBytes` - Bytes do template PDF
- `pdfTemplateDoc` - Documento PDF carregado
- `fieldPositions` - Posições dos campos no PDF
- `dataByMonth` - Dados agrupados por mês
- `generatedPDFs` - Array de PDFs gerados
- `selectedIndices` - Set de índices de cartões selecionados
- `selectedMonths` - Set de meses selecionados
- `modalSelectedIndices` - Set de índices selecionados no modal
- `currentModalMonth` - Mês atual no modal
- `currentZoom` - Nível de zoom atual (50-200)
- `welcomeExcelFile`, `welcomeTemplateFile` - Arquivos do welcome modal
- `welcomeExcelData`, `welcomeTemplateBytes` - Dados do welcome modal
- `useDefaultTemplate`, `useDefaultTemplateMain` - Flags de template padrão

**Funções Principais:**

**Welcome Modal:**
- `handleWelcomeExcel()` - Processa upload de Excel no modal
- `handleWelcomeTemplate()` - Processa upload de PDF no modal
- `toggleDefaultTemplate()` - Alterna uso de template padrão no modal
- `loadDefaultTemplate()` - Carrega template padrão no modal
- `checkWelcomeFilesLoaded()` - Verifica se ambos os arquivos foram carregados
- `startApplication()` - Inicia a aplicação e transiciona para workbench

**File Handling:**
- `handleFile()` - Processa upload de Excel no workbench
- `handlePDFTemplate()` - Processa upload de PDF no workbench
- `handlePDFTemplateSelect()` - Handler para input de PDF
- `resetUpload()` - Reseta upload de Excel
- `resetPDFTemplate()` - Reseta template PDF
- `resetWelcomeExcel()` - Reseta Excel do welcome modal
- `resetWelcomeTemplate()` - Reseta template do welcome modal

**Template Default:**
- `toggleDefaultTemplateMain()` - Alterna uso de template padrão no workbench
- `loadDefaultTemplateMain()` - Carrega template padrão no workbench

**UI Updates:**
- `displayPreview()` - Exibe prévia dos dados
- `displayDataByMonth()` - Exibe dados agrupados por mês
- `updateFieldList()` - Atualiza lista de campos configurados
- `initializeFieldInputs()` - Inicializa inputs com posições atuais
- `updatePDFPreview()` - Atualiza prévia do PDF
- `updateSelectionCounter()` - Atualiza contador de seleção
- `updateMonthTabStatus()` - Atualiza status das abas de mês
- `updateSelectAllModalCheckbox()` - Atualiza checkbox selecionar todos
- `updateModalSummary()` - Atualiza resumo do modal
- `updateModalNavigationButtons()` - Atualiza botões de navegação

**PDF Generation:**
- `generatePDFTemplateCard()` - Gera um cartão individual
- `generateAllPDFTemplateCards()` - Gera todos os cartões selecionados
- `generateAllCards()` - Wrapper para geração em lote

**Downloads:**
- `downloadSingleCard()` - Download de cartão individual
- `downloadAllCards()` - Download de todos os cartões como ZIP
- `downloadSelectedCards()` - Download de cartões selecionados como ZIP
- `downloadSelectedFromModal()` - Download do modal

**Field Positioning:**
- `updateFieldPosition()` - Atualiza posição de campo
- `resetAll()` - Reseta todos os dados

**Month Modal:**
- `openMonthModal()` - Abre modal de seleção por mês
- `closeMonthModal()` - Fecha modal
- `toggleMonthSelection()` - Alterna seleção de mês
- `showMonthContent()` - Exibe conteúdo do mês
- `toggleModalSelection()` - Alterna seleção no modal
- `selectAllInModal()` - Seleciona todos no modal
- `deselectAllInModal()` - Deseleciona todos no modal
- `toggleSelectAllModal()` - Alterna selecionar todos
- `saveModalSelections()` - Salva seleções do modal
- `navigateMonth()` - Navega entre meses

**Utilities:**
- `formatDatePortuguese()` - Formata data em português
- `excelDateToJSDate()` - Converte data Excel para JS Date
- `formatFileSize()` - Formata tamanho de arquivo
- `parseMonthFromDate()` - Extrai mês de data
- `groupDataByMonth()` - Agrupa dados por mês
- `removeAccents()` - Remove acentos de strings
- `showAlert()` - Sistema de alertas
- `showSuccessAlert()` - Alerta de sucesso
- `showErrorAlert()` - Alerta de erro
- `closeAlert()` - Fecha alerta
- `fromCenter()` - Função matemática para glitter effect

**Zoom:**
- `zoomIn()` - Aumenta zoom
- `zoomOut()` - Diminui zoom
- `updateZoom()` - Atualiza visualização de zoom

#### style.css
**Sistema de Cores (Dark Theme):**
```css
--bg-primary: #1e1e1e        /* Fundo principal */
--bg-secondary: #252526      /* Fundo secundário */
--bg-tertiary: #2d2d30      /* Fundo terciário */
--bg-canvas: #2b2b2b         /* Fundo do canvas */
--border-color: #333333       /* Cor das bordas */
--text-primary: #ffffff       /* Texto principal */
--text-secondary: #cccccc     /* Texto secundário */
--text-muted: #888888        /* Texto mudo */
--accent-color: #0078d4     /* Cor de destaque */
--accent-hover: #106ebe       /* Cor de destaque hover */
--success-color: #4caf50     /* Cor de sucesso */
--error-color: #f44336       /* Cor de erro */
--warning-color: #ff9800     /* Cor de aviso */
```

**Glitter Effect Variables:**
```css
--background: rgb(20, 20, 20)
--background-card-content: rgba(44, 44, 44, 1)
--glitter: url("https://assets.codepen.io/13471/noise-base.png")
--glitter2: url("https://assets.codepen.io/13471/noise-top.png")
--ratio-x: .5
--ratio-y: .75
--light-size: 200px
--mouse-x: 0px
--mouse-y: 0px
```

**Componentes Estilizados:**
- Welcome modal com glitter effects
- Upload cards com drag-and-drop e hover effects
- Workbench layout (header, toolbar, canvas, properties panel)
- Month tabs com estados visuais
- Month modal com navegação
- Progress bar animada
- Results panel
- Alerts com animações
- Accordion sections
- Toolbar items
- Canvas com zoom controls
- Responsividade para dispositivos móveis

---

## 🔄 Fluxo de Trabalho

### Fluxo Principal do Usuário

```
1. Abertura do Sistema
   ↓
2. Modal de Boas-Vindas
   - Upload de arquivo Excel
   - Upload de template PDF ou usar padrão
   ↓
3. Clicar em "Iniciar Aplicação"
   ↓
4. Interface Workbench
   - Visualizar template PDF no canvas
   - Configurar posições dos campos (Nome, Vocativo, Data)
   - Visualizar dados agrupados por mês
   ↓
5. Seleção de Cartões
   - Selecionar meses inteiros via checkboxes nas abas
   - Ou abrir modal de mês para seleção individual
   ↓
6. Geração de PDFs
   - Clicar em "Gerar em lote"
   - Aguardar progresso
   ↓
7. Download dos PDFs
   - Baixar todos como ZIP
   - Ou baixar seleção específica como ZIP
```

### Fluxo de Dados

```
Excel File → FileReader → SheetJS → excelData (Array)
                                               ↓
PDF Template → FileReader → pdf-lib → pdfTemplateDoc
                                               ↓
excelData + fieldPositions → generatePDFTemplateCard()
                                               ↓
PDF Bytes → Blob → Download (individual ou ZIP)
```

---

## 🎨 Configuração de Campos PDF

### Posições Padrão (Iniciais)

| Campo | X | Y | Tamanho | Alinhamento | Fonte | Cor |
|-------|---|---|---------|-------------|-------|-----|
| Nome | 107 | 380 | 27 | left | Times Roman Italic | #1f5684 |
| Vocativo | 115 | 412 | 14 | left | Times Roman Italic | #1f5684 |
| Data | 765 | 490 | 18 | right | Times Roman | #0d3b66 |

### Fontes Disponíveis
- `PDFLib.StandardFonts.TimesRoman` - Normal
- `PDFLib.StandardFonts.TimesRomanItalic` - Itálico

### Cores RGB
- Nome/Vocativo: `rgb(31/255, 86/255, 132/255)` (#1f5684)
- Data: `rgb(13/255, 59/255, 102/255)` (#0d3b66)

### Transformações de Texto
- Vocativo é convertido para UPPERCASE automaticamente

---

## 📱 Responsividade

### Breakpoints
- **Desktop**: > 768px
- **Mobile**: ≤ 768px

### Ajustes Mobile
- Redução de padding e fontes
- Layout de coluna única
- Barra lateral reduzida
- Tabela com scroll horizontal
- Botões em largura total

---

## 🔒 Validações

### Validação de Excel
- Verifica extensão do arquivo (.xlsx ou .xls)
- Verifica tipo MIME
- Valida presença de colunas: Nome, Vocativo, Data
- Verifica se há pelo menos uma linha de dados

### Validação de PDF
- Verifica tipo MIME (application/pdf)
- Valida carregamento do documento PDF

### Validação de Campos
- Valida coordenadas numéricas
- Valida tamanho de fonte positivo
- Valida alinhamento válido

---

## 🐛 Tratamento de Erros

### Tipos de Erros Tratados
- Arquivo Excel inválido
- Colunas obrigatórias faltando
- Erro ao ler arquivo PDF
- Erro ao gerar PDF
- Template não carregado
- Erro ao criar arquivo ZIP

### Sistema de Alertas
- Alertas de erro (vermelho)
- Alertas de sucesso (verde)
- Auto-fechamento após 5 segundos
- Botão de fechamento manual

---

## 💡 Recursos Avançados

### Agrupamento por Mês
- Parsing automático de datas
- Ordenação cronológica dos meses
- Abas de navegação entre meses
- Contador de cartões por mês
- Estados visuais (selecionado, parcial, não selecionado)

### Formatação de Datas
- Conversão de diferentes formatos
- Formato de saída em português
- Prefixo "Brasília, "
- Nomes dos meses em português

### Sanitização de Nomes de Arquivo
- Remove acentos usando normalize
- Substitui espaços por underscores
- Mantém apenas caracteres alfanuméricos e underscores
- Tratamento de nomes duplicados com contador

### Efeitos de Glitter
- Listener unificado no container pai
- Cálculo de posição do mouse relativo a cada card
- Variáveis CSS para gradientes conic
- Sincronização de brilho entre cards vizinhos

### Seleção Avançada
- Seleção individual por checkbox
- Seleção em lote por mês
- Modal dedicado para seleção detalhada
- Navegação entre meses no modal
- Download de seleção específica

---

## 📚 Dependências Externas

### CDNs Utilizados

```html
<!-- SheetJS para Excel -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<!-- html2canvas (mantido para compatibilidade) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

<!-- jsPDF (mantido para compatibilidade) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

<!-- pdf-lib para manipulação de PDF -->
<script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>

<!-- JSZip para criação de arquivos ZIP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>

<!-- Download.js -->
<script src="https://unpkg.com/downloadjs@1.4.7/download.min.js"></script>
```

---

## 🚀 Como Executar

### Modo de Execução
O sistema funciona **totalmente no navegador**, sem necessidade de servidor:

1. Abra o arquivo [`index.html`](index.html:1) em qualquer navegador moderno
2. As bibliotecas são carregadas via CDN (requer conexão com internet na primeira vez)
3. Após o carregamento inicial, o sistema funciona offline

### Navegadores Compatíveis
- Google Chrome (recomendado)
- Mozilla Firefox
- Microsoft Edge
- Safari

---

## 📊 Métricas do Código

| Arquivo | Linhas | Linguagem |
|---------|--------|-----------|
| index.html | 431 | HTML |
| script.js | 1838 | JavaScript |
| style.css | 2106 | CSS |
| criar_excel_exemplo.html | 154 | HTML |
| **Total** | **4529** | - |

---

## 🔮 Funcionalidades Futuras (Possíveis)

- [ ] Suporte a mais campos customizáveis
- [ ] Salvar configurações de template
- [ ] Preview de cada cartão antes da geração
- [ ] Exportar configurações de campos
- [ ] Suporte a múltiplas páginas no template
- [ ] Edição de dados na prévia
- [ ] Histórico de templates utilizados
- [ ] Suporte a imagens no template
- [ ] Funcionalidade completa das ferramentas do toolbar (Select, Text)
- [ ] Arrastar e soltar campos diretamente no canvas

---

## 📝 Notas Importantes

1. **Offline**: O sistema funciona offline após carregar as bibliotecas CDN
2. **Privacidade**: Todos os dados são processados localmente no navegador
3. **Performance**: Geração de PDFs é processada sequencialmente para evitar travamentos
4. **Compatibilidade**: Template PDF deve ser compatível com pdf-lib
5. **Tamanho**: Não há limite rígido de tamanho de arquivo, mas arquivos muito grandes podem afetar performance
6. **Glitter Effects**: Implementados com listener unificado para sincronização entre cards
7. **ZIP Downloads**: Utiliza JSZip para criar arquivos de download em lote

---

## 🤝 Suporte e Manutenção

### Pontos de Atenção
- Manter compatibilidade com versões das bibliotecas CDN
- Atualizar validações conforme necessário
- Monitorar mudanças na API do pdf-lib
- Testar em diferentes navegadores regularmente
- Manter arquivo `src/Template.pdf` disponível

### Documentação Relacionada
- [`README.md`](README.md:1) - Documentação para usuário final
- [`memory_bank.md`](memory_bank.md:1) - Memória técnica do desenvolvedor
- [`INSTRUCOES_WORKBENCH.md`](INSTRUCOES_WORKBENCH.md:1) - Instruções do workbench
- [`sincronizar_brilho_unificado.md`](sincronizar_brilho_unificado.md:1) - Documentação do efeito de brilho

---

**Última Atualização**: 2026-02-14  
**Versão**: 2.0  
**Status**: Produção
