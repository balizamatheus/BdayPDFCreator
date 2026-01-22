# Gerador de Cartões de Felicitação Automáticos

Sistema web para gerar cartões de felicitação em PDF personalizados a partir de um arquivo Excel.

## 🌟 Recursos

- ✅ Interface web intuitiva e responsiva
- ✅ Leitura de arquivos Excel (.xlsx, .xls)
- ✅ Geração automática de PDFs personalizados
- ✅ Prévia dos cartões antes de gerar
- ✅ Design decorativo e colorido
- ✅ Funciona diretamente no navegador (sem servidor)
- ✅ **Suporte a templates PDF personalizados**
- ✅ **Posicionamento de campos no template PDF**

## 📋 Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Arquivo Excel com as colunas: Nome, Vocativo, Data

## 🚀 Como Usar

### Passo 1: Abra o sistema

Basta abrir o arquivo [`index.html`](index.html:1) no seu navegador:
- Dê dois cliques no arquivo `index.html`
- Ou arraste o arquivo para uma aba do navegador

### Passo 2: Escolha o tipo de template

1. **Template HTML/CSS** (Padrão):
   - Usa um design pré-definido e colorido
   - Ideal para uso rápido

2. **Template PDF Personalizado**:
   - Carregue seu próprio template PDF
   - Posicione os campos (Nome, Vocativo, Data) no template
   - Ideal para usar seu design existente

### Passo 3: Carregue o arquivo Excel

1. Clique em "Selecionar Arquivo" ou arraste seu arquivo Excel para a área indicada
2. O sistema validará o arquivo e mostrará uma prévia dos dados

### Passo 4: (Opcional) Configure o template PDF

Se você escolheu "Template PDF Personalizado":

1. Carregue seu arquivo PDF de template
2. Selecione cada campo (Nome, Vocativo, Data)
3. Ajuste as coordenadas X, Y e o tamanho da fonte
4. Clique em "Atualizar" para salvar a posição

### Passo 5: Revise os dados

- Verifique a tabela com todos os cartões que serão gerados
- Clique em "👁️ Ver" para visualizar cada cartão individualmente

### Passo 6: Gere os cartões

1. Clique em "🎨 Gerar Todos os Cartões"
2. Aguarde o processo de geração (barra de progresso)
3. Baixe os PDFs individualmente ou todos de uma vez

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

## 🎨 Design do Cartão

Cada cartão gerado inclui:
- Bordas decorativas coloridas (azul, verde, laranja)
- Cabeçalho com estrelas
- Título "PARABÉNS!" em destaque
- Vocativo personalizado
- Nome em destaque (tamanho grande, cor azul)
- Mensagem de felicitação
- Data do evento
- Rodapé com confetes decorativos

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura da página
- **CSS3** - Estilos e design responsivo
- **JavaScript** - Lógica da aplicação
- **SheetJS (xlsx)** - Leitura de arquivos Excel
- **html2canvas** - Captura do cartão como imagem
- **jsPDF** - Geração de PDFs

## 💡 Dicas

- O sistema funciona totalmente offline (após carregar as bibliotecas CDN)
- Você pode gerar quantos cartões quiser
- Cada cartão é gerado como um PDF separado
- Os PDFs são baixados automaticamente

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

## 📝 Criar Arquivo Excel de Exemplo

Para testar o sistema, você pode:
1. Criar um arquivo Excel manualmente com as colunas Nome, Vocativo, Data
2. Usar o arquivo [`criar_excel_exemplo.html`](criar_excel_exemplo.html:1) para gerar um exemplo automaticamente

## 📄 Licença

Este projeto é livre para uso pessoal e comercial.

## 🎉 Como Funciona

1. **Upload**: O usuário carrega um arquivo Excel
2. **Leitura**: O sistema lê o arquivo usando SheetJS
3. **Validação**: Verifica se as colunas obrigatórias estão presentes
4. **Prévia**: Mostra os dados em uma tabela e permite visualizar cada cartão
5. **Geração**: Converte cada cartão HTML em imagem usando html2canvas
6. **PDF**: Cria um PDF para cada cartão usando jsPDF
7. **Download**: Permite baixar os PDFs individualmente ou todos juntos

---

Desenvolvido com ❤️ usando tecnologias web modernas
