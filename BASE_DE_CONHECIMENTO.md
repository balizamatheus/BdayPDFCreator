# Base de Conhecimento - Cartões Automáticos

## 📋 Visão Geral do Projeto

Sistema web para geração automática de cartões de felicitação em PDF personalizados a partir de dados em arquivos Excel. O sistema permite que o usuário carregue um template PDF personalizado, posicione os campos dinamicamente e gere múltiplos cartões com dados de um arquivo Excel.

---

## 🎯 Funcionalidades Principais

### 1. Upload de Arquivo Excel
- **Interface drag-and-drop** intuitiva para upload de arquivos
- Suporte aos formatos `.xlsx` e `.xls`
- Validação automática de colunas obrigatórias
- Exibição de informações do arquivo (nome e tamanho)
- Tratamento de datas em diferentes formatos

### 2. Upload de Template PDF Personalizado
- Carregamento de templates PDF personalizados
- Interface drag-and-drop para upload de PDF
- Validação de formato de arquivo
- Prévia do template carregado

### 3. Posicionamento Dinâmico de Campos
- Interface para posicionar campos no template PDF
- Campos configuráveis:
  - **Nome** (coordenadas X, Y, tamanho da fonte, alinhamento)
  - **Vocativo** (coordenadas X, Y, tamanho da fonte, alinhamento)
  - **Data** (coordenadas X, Y, tamanho da fonte, alinhamento)
- Opções de alinhamento: Esquerda, Centro, Direita
- Prévia em tempo real do PDF com dados de exemplo
- Lista de campos configurados com suas posições

### 4. Prévia dos Dados
- Exibição de resumo total de cartões a serem gerados
- Agrupamento de dados por mês
- Abas para navegação entre meses
- Tabela com dados de cada cartão
- Botão para download individual de cada cartão

### 5. Geração de PDFs
- Geração em lote de todos os cartões
- Barra de progresso visual durante a geração
- Contador de cartões gerados
- Tratamento de erros individuais por cartão

### 6. Download de PDFs
- Download individual de cada cartão
- Download em lote de todos os PDFs gerados
- Nomes de arquivo sanitizados para compatibilidade

### 7. Navegação por Seções
- Barra lateral flutuante com ícones de navegação
- Seções: Upload, Template, Prévia, Gerar, Resultados
- Transições suaves entre seções
- Título dinâmico do cabeçalho

### 8. Sistema de Alertas
- Alertas de sucesso e erro
- Auto-fechamento após 5 segundos
- Animações de entrada e saída
- Ícones visuais para cada tipo de alerta

---

## 🔧 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica da página
- **CSS3** - Estilização e design responsivo
  - Variáveis CSS para cores
  - Flexbox e Grid layouts
  - Animações e transições
  - Media queries para responsividade
- **JavaScript (Vanilla)** - Lógica da aplicação

### Bibliotecas JavaScript (CDN)

| Biblioteca | Versão | Função |
|-----------|--------|--------|
| **SheetJS (xlsx)** | 0.18.5 | Leitura e processamento de arquivos Excel |
| **html2canvas** | 1.4.1 | Captura de elementos HTML como imagem (não utilizado atualmente) |
| **jsPDF** | 2.5.1 | Geração de PDFs (não utilizado atualmente) |
| **pdf-lib** | 1.17.1 | Manipulação e modificação de PDFs |
| **Download.js** | 1.4.7 | Facilita downloads de arquivos |

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

---

## 🏗️ Arquitetura do Código

### Estrutura de Arquivos

```
CartoesAutomaticos/
├── index.html                    # Interface principal do sistema
├── script.js                     # Lógica JavaScript (837 linhas)
├── style.css                     # Estilos e design (1204 linhas)
├── criar_excel_exemplo.html      # Gerador de Excel de exemplo
├── README.md                     # Documentação do usuário
├── memory_bank.md                # Memória técnica do projeto
├── BASE_DE_CONHECIMENTO.md       # Este arquivo
└── src/
    ├── Template.pdf              # Template PDF padrão
    └── Template - Copia.pdf      # Cópia do template
```

### Componentes Principais

#### index.html
- Estrutura semântica com seções bem definidas
- Seções principais:
  - Upload Section (Excel)
  - PDF Template Section
  - Preview Section
  - Progress Section
  - Results Section
- Barra lateral flutuante para navegação
- Container de alertas

#### script.js
**Variáveis Globais:**
- `excelData` - Array com dados do Excel
- `pdfTemplateBytes` - Bytes do template PDF
- `pdfTemplateDoc` - Documento PDF carregado
- `fieldPositions` - Posições dos campos no PDF
- `dataByMonth` - Dados agrupados por mês
- `generatedPDFs` - Array de PDFs gerados

**Funções Principais:**
- `handleFile()` - Processa upload de Excel
- `handlePDFTemplate()` - Processa upload de PDF
- `updateFieldPosition()` - Atualiza posição de campo
- `updatePDFPreview()` - Atualiza prévia do PDF
- `generatePDFTemplateCard()` - Gera um cartão individual
- `generateAllPDFTemplateCards()` - Gera todos os cartões
- `displayPreview()` - Exibe prévia dos dados
- `displayDataByMonth()` - Exibe dados agrupados por mês
- `downloadSingleCard()` - Download de cartão individual
- `downloadAllCards()` - Download de todos os cartões
- `showAlert()` - Sistema de alertas
- `navigateToSection()` - Navegação entre seções

#### style.css
**Sistema de Cores:**
```css
--color1: #345bac  /* Azul claro */
--color2: #274c9a  /* Azul médio */
--color3: #1a3e89  /* Azul escuro */
--color4: #0d2f77  /* Azul muito escuro */
--color5: #002065  /* Azul profundo */
--white: #ffffff
```

**Componentes Estilizados:**
- Upload boxes com drag-and-drop
- Tabelas de dados com hover effects
- Progress bar animada
- Cards de resultados
- Barra lateral flutuante
- Alertas com animações
- Modais
- Responsividade para dispositivos móveis

---

## 🔄 Fluxo de Trabalho

### Fluxo Principal do Usuário

```
1. Upload de Template PDF
   ↓
2. Posicionamento de Campos (Nome, Vocativo, Data)
   ↓
3. Upload de Arquivo Excel
   ↓
4. Validação e Prévia dos Dados
   ↓
5. (Opcional) Download Individual
   ↓
6. Geração em Lote
   ↓
7. Download dos PDFs
```

### Fluxo de Dados

```
Excel File → FileReader → SheetJS → excelData (Array)
                                              ↓
PDF Template → FileReader → pdf-lib → pdfTemplateDoc
                                              ↓
excelData + fieldPositions → generatePDFTemplateCard()
                                              ↓
PDF Bytes → Blob → Download
```

---

## 🎨 Configuração de Campos PDF

### Posições Padrão (Iniciais)

| Campo | X | Y | Tamanho | Alinhamento | Fonte | Cor |
|-------|---|---|---------|-------------|-------|-----|
| Nome | 105 | 380 | 40 | left | Times Roman Italic | #1f5684 |
| Vocativo | 115 | 425 | 20 | left | Times Roman Italic | #1f5684 |
| Data | 765 | 490 | 18 | right | Times Roman | #0d3b66 |

### Fontes Disponíveis
- `PDFLib.StandardFonts.TimesRoman` - Normal
- `PDFLib.StandardFonts.TimesRomanItalic` - Itálico

### Cores RGB
- Nome/Vocativo: `rgb(31/255, 86/255, 132/255)` (#1f5684)
- Data: `rgb(13/255, 59/255, 102/255)` (#0d3b66)

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

### Formatação de Datas
- Conversão de diferentes formatos
- Formato de saída em português
- Prefixo "Brasília, "
- Nomes dos meses em português

### Sanitização de Nomes de Arquivo
- Remove caracteres especiais
- Substitui espaços por underscores
- Mantém apenas caracteres alfanuméricos

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
| index.html | 187 | HTML |
| script.js | 837 | JavaScript |
| style.css | 1204 | CSS |
| criar_excel_exemplo.html | 154 | HTML |
| **Total** | **2382** | - |

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

---

## 📝 Notas Importantes

1. **Offline**: O sistema funciona offline após carregar as bibliotecas CDN
2. **Privacidade**: Todos os dados são processados localmente no navegador
3. **Performance**: Geração de PDFs é processada sequencialmente para evitar travamentos
4. **Compatibilidade**: Template PDF deve ser compatível com pdf-lib
5. **Tamanho**: Não há limite rígido de tamanho de arquivo, mas arquivos muito grandes podem afetar performance

---

## 🤝 Suporte e Manutenção

### Pontos de Atenção
- Manter compatibilidade com versões das bibliotecas CDN
- Atualizar validações conforme necessário
- Monitorar mudanças na API do pdf-lib
- Testar em diferentes navegadores regularmente

### Documentação Relacionada
- [`README.md`](README.md:1) - Documentação para usuário final
- [`memory_bank.md`](memory_bank.md:1) - Memória técnica do desenvolvedor

---

**Última Atualização**: 2026-01-21  
**Versão**: 1.0  
**Status**: Produção
