# BdayPDF Creator - Gerador de Cartões de Felicitação

Sistema web profissional para gerar cartões de felicitação em PDF personalizados a partir de arquivos Excel. Interface estilo workbench com suporte a templates PDF personalizados e geração em lote.

## 🌟 Recursos

- ✅ Interface workbench profissional estilo Photoshop/Figma
- ✅ Modal de boas-vindas com efeitos visuais
- ✅ Leitura de arquivos Excel (.xlsx, .xls)
- ✅ Suporte a templates PDF personalizados
- ✅ Opção de usar template padrão
- ✅ Posicionamento dinâmico de campos no PDF
- ✅ Agrupamento de dados por mês
- ✅ Seleção avançada de cartões
- ✅ Geração automática de PDFs personalizados
- ✅ Prévia em tempo real do PDF
- ✅ Download individual ou em lote (ZIP)
- ✅ Funciona diretamente no navegador (sem servidor)
- ✅ Dark theme profissional
- ✅ Efeitos visuais de glitter

## 📋 Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Arquivo Excel com as colunas: Nome, Vocativo, Data
- Arquivo PDF de template (opcional - pode usar o padrão)

## 🚀 Como Usar

### Passo 1: Abra o sistema

Basta abrir o arquivo [`index.html`](index.html:1) no seu navegador:
- Dê dois cliques no arquivo `index.html`
- Ou arraste o arquivo para uma aba do navegador

### Passo 2: Modal de Boas-Vindas

Ao abrir o sistema, você verá um modal de boas-vindas:

1. **Upload de Excel**:
   - Arraste seu arquivo Excel para a área indicada
   - Ou clique em "Selecionar Arquivo"
   - O sistema validará o arquivo e mostrará as informações

2. **Upload de Template PDF**:
   - Arraste seu template PDF para a área indicada
   - Ou clique em "Selecionar Arquivo"
   - **OU** marque a opção "Usar padrão" para usar o template padrão

3. **Iniciar Aplicação**:
   - Quando ambos os arquivos estiverem carregados, o botão "Iniciar Aplicação" será habilitado
   - Clique para entrar na interface workbench

### Passo 3: Interface Workbench

Após iniciar, você verá a interface workbench em tela cheia:

#### Header
- Logo do aplicativo
- Botão "Gerar em lote" para gerar todos os cartões

#### Toolbar (Esquerda)
- **Select**: Ferramenta de seleção
- **Text**: Ferramenta de edição de texto
- **Zoom**: Ferramenta de zoom

#### Canvas (Centro)
- Prévia do template PDF
- Controles de zoom (- e +)
- Nível de zoom atual (50% - 200%)

#### Painel de Propriedades (Direita)

1. **Upload Excel**:
   - Faça upload do arquivo Excel
   - Informações do arquivo serão exibidas

2. **Template PDF**:
   - Faça upload do template PDF
   - Ou marque "Usar padrão" para usar o template padrão

3. **Posicionar Campos**:
   - Clique na seção para expandir (accordion)
   - Configure as coordenadas X, Y para cada campo
   - Ajuste o tamanho da fonte
   - Escolha o alinhamento (Esquerda, Centro, Direita)
   - Clique em "Atualizar" para salvar cada campo
   - A prévia será atualizada automaticamente

4. **Prévia dos Dados**:
   - Dados agrupados por mês
   - Clique em um mês para abrir o modal de seleção
   - Marque o checkbox para selecionar todos os cartões de um mês
   - O contador mostra quantos cartões estão selecionados

### Passo 4: Seleção de Cartões

Existem duas formas de selecionar cartões:

#### Método 1: Seleção por Mês
1. No painel "Prévia dos Dados", marque o checkbox ao lado do nome do mês
2. Isso selecionará todos os cartões daquele mês
3. O contador será atualizado automaticamente

#### Método 2: Seleção Detalhada (Modal)
1. Clique no nome do mês para abrir o modal de seleção
2. No modal, você verá todos os cartões daquele mês
3. Marque os checkboxes individuais para selecionar cartões específicos
4. Use os botões "Selecionar Todos" ou "Desmarcar Todos"
5. Navegue entre os meses usando as setas
6. Clique em "OK" para salvar as seleções
7. Ou clique em "Baixar Selecionados" para baixar imediatamente

### Passo 5: Geração de PDFs

1. Selecione os cartões que deseja gerar
2. Clique no botão "Gerar em lote" no header
3. Uma barra de progresso mostrará o andamento
4. Aguarde até que todos os cartões sejam gerados

### Passo 6: Download dos PDFs

#### Download Individual
- No modal de seleção por mês, clique no ícone de download ao lado de cada cartão

#### Download em Lote
- Após a geração, clique em "Baixar ZIP" no painel de resultados
- Todos os PDFs serão baixados em um arquivo ZIP

#### Download de Seleção Específica
- No modal de seleção, clique em "Baixar Selecionados"
- Apenas os cartões selecionados serão baixados como ZIP

## 📁 Estrutura do Arquivo Excel

O arquivo Excel deve conter as seguintes colunas:

| Coluna | Descrição | Exemplo |
|--------|-----------|---------|
| Nome | Nome da pessoa | João Silva |
| Vocativo | Vocativo de tratamento | Caro João |
| Data | Data do evento | 18/01/2026 |

### Exemplo de arquivo Excel:

| Nome | Vocativo | Data |
|------|----------|------|
| João Silva | Caro João | 18/01/2026 |
| Maria Santos | Prezada Maria | 20/01/2026 |
| Pedro Costa | Querido Pedro | 25/01/2026 |

## 📦 Arquivos do Projeto

- [`index.html`](index.html:1) - Interface principal do sistema
- [`style.css`](style.css:1) - Estilos e design responsivo
- [`script.js`](script.js:1) - Lógica JavaScript para leitura de Excel e geração de PDF
- [`criar_excel_exemplo.html`](criar_excel_exemplo.html:1) - Gerador de arquivo Excel de exemplo
- [`src/Template.pdf`](src/Template.pdf) - Template PDF padrão

## 🎨 Configuração de Campos

### Campos Disponíveis

1. **Nome**:
   - Posição X: Coordenada horizontal
   - Posição Y: Coordenada vertical
   - Tamanho: Tamanho da fonte
   - Alinhamento: Esquerda, Centro ou Direita

2. **Vocativo**:
   - Posição X: Coordenada horizontal
   - Posição Y: Coordenada vertical
   - Tamanho: Tamanho da fonte
   - Alinhamento: Esquerda, Centro ou Direita
   - **Automaticamente convertido para MAIÚSCULAS**

3. **Data**:
   - Posição X: Coordenada horizontal
   - Posição Y: Coordenada vertical
   - Tamanho: Tamanho da fonte
   - Alinhamento: Esquerda, Centro ou Direita
   - **Formatado automaticamente como "Brasília, DD de MMMM de YYYY"**

### Posicionamento Padrão

| Campo | X | Y | Tamanho | Alinhamento |
|-------|---|---|---------|-------------|
| Nome | 107 | 380 | 27 | left |
| Vocativo | 115 | 412 | 14 | left |
| Data | 765 | 490 | 18 | right |

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura da página
- **CSS3** - Estilos e design responsivo
- **JavaScript** - Lógica da aplicação
- **SheetJS (xlsx)** - Leitura de arquivos Excel
- **pdf-lib** - Manipulação de PDFs
- **JSZip** - Criação de arquivos ZIP
- **Download.js** - Facilita downloads de arquivos

## 💡 Dicas

- O sistema funciona totalmente offline (após carregar as bibliotecas CDN)
- Você pode gerar quantos cartões quiser
- Cada cartão é gerado como um PDF separado
- Use o zoom para visualizar melhor o template
- Os nomes dos arquivos PDF são sanitizados automaticamente
- Nomes duplicados recebem um contador automaticamente
- A formatação das datas é automática (Brasília, DD de MMMM de YYYY)

## 🐛 Solução de Problemas

### O arquivo Excel não é aceito
- Verifique se o arquivo tem a extensão .xlsx ou .xls
- Certifique-se de que o arquivo não está corrompido

### Erro "Colunas obrigatórias faltando"
- Verifique se o arquivo Excel tem as colunas: Nome, Vocativo, Data
- Verifique a ortografia (maiúsculas/minúsculas)

### Os PDFs não estão sendo baixados
- Verifique se o navegador permite downloads
- Desative bloqueadores de pop-up

### O sistema não funciona offline
- As bibliotecas são carregadas via CDN, então é necessário conexão com a internet na primeira vez

### Template padrão não carrega
- Verifique se o arquivo `src/Template.pdf` existe no projeto
- Se não existir, faça upload de um template PDF manualmente

### O glitter effect não funciona
- Verifique se as imagens de glitter estão sendo carregadas
- O efeito requer conexão com internet para carregar as imagens

## 📝 Criar Arquivo Excel de Exemplo

Para testar o sistema, você pode:
1. Criar um arquivo Excel manualmente com as colunas Nome, Vocativo, Data
2. Usar o arquivo [`criar_excel_exemplo.html`](criar_excel_exemplo.html:1) para gerar um exemplo automaticamente

## 🎉 Como Funciona

1. **Welcome Modal**: O usuário carrega Excel e template PDF
2. **Leitura**: O sistema lê o arquivo usando SheetJS
3. **Validação**: Verifica se as colunas obrigatórias estão presentes
4. **Workbench**: Interface profissional para configuração
5. **Posicionamento**: Usuário configura as posições dos campos no PDF
6. **Seleção**: Usuário seleciona quais cartões deseja gerar
7. **Geração**: Sistema gera PDFs usando pdf-lib
8. **Download**: Permite baixar os PDFs individualmente ou como ZIP

## 🎨 Interface

### Dark Theme
O sistema utiliza um tema escuro profissional para melhor conforto visual e foco no conteúdo.

### Efeitos Visuais
- **Glitter Effects**: Efeitos de brilho que seguem o mouse nos cards de upload
- **Hover Effects**: Efeitos hover em botões e elementos interativos
- **Transições Suaves**: Animações de transição em todos os elementos

### Layout Responsivo
O sistema se adapta automaticamente a diferentes tamanhos de tela, incluindo dispositivos móveis.

## 📄 Licença

Este projeto é livre para uso pessoal e comercial.

---

Desenvolvido com ❤️ usando tecnologias web modernas
