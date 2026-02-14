# 🔗 Sincronização de Brilho: Efeito de Superfície Única

## 1. Problema Identificado

O código original aplicava o `onpointermove` individualmente em cada card. Isso fazia com que as variáveis CSS de um card só fossem atualizadas quando o mouse estava diretamente sobre ele, impedindo que o brilho de um card "vazasse" para o vizinho.

### Comportamento Original (Problema)

```javascript
// ❌ Problema: Listener individual em cada card
document.querySelectorAll('.upload-card').forEach(card => {
    card.onpointermove = e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        const RATIO = {
            x: x / rect.width,
            y: y / rect.height
        };

        card.style.setProperty("--ratio-x", RATIO.x);
        card.style.setProperty("--ratio-y", RATIO.y);
    };
});
```

**Problema**: Quando o mouse está sobre o Card A, apenas o Card A atualiza suas variáveis. O Card B (vizinho) não sabe onde o mouse está, então seu brilho não é afetado.

## 2. Nova Lógica de JavaScript

### Solução: Listener Unificado no Container Pai

Substitua o bloco de código que percorre `document.getElementsByClassName("upload-card")` por este listener unificado. Ele deve ser aplicado ao container que agrupa os cards (ex: `.upload-grid` ou o container pai direto).

### Implementação Atual no BdayPDF Creator

No arquivo [`script.js`](script.js:1), a implementação atualizada está no evento `DOMContentLoaded`:

```javascript
// ✅ Solução: Listener unificado no container pai
document.addEventListener('DOMContentLoaded', () => {
    // Define dimensões do corpo para efeito de glitter
    document.body.style.setProperty("--dw", document.body.clientWidth + "px");
    document.body.style.setProperty("--dh", document.body.clientHeight + "px");

    // Mouse tracking para efeito de glitter - listener unificado no container pai
    const uploadContainer = document.querySelector(".upload-grid");
    const cards = document.getElementsByClassName("upload-card");

    if (uploadContainer) {
        uploadContainer.onpointermove = e => {
            for (const card of cards) {
                const rect = card.getBoundingClientRect();

                // Calcula a posição do mouse em relação a CADA card,
                // mesmo que o mouse não esteja sobre ele no momento.
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Define as variáveis de posição (necessárias para o gradiente)
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);

                // Mantém a lógica de RATIO que você já utiliza
                const RATIO = {
                    x: x / rect.width,
                    y: y / rect.height
                };

                card.style.setProperty("--ratio-x", RATIO.x);
                card.style.setProperty("--ratio-y", RATIO.y);
            }
        };
    }
});
```

## 3. Como Funciona a Sincronização

### Visualização do Comportamento

```
┌─────────────────────────────────────────────────────────────────┐
│  Container Pai (.upload-grid)                                │
│  ┌─────────────┐  ┌─────────────┐                        │
│  │   Card A    │  │   Card B    │                        │
│  │             │  │             │                        │
│  │             │  │             │                        │
│  └─────────────┘  └─────────────┘                        │
│                                                             │
│  🖱️ Mouse aqui                                             │
└─────────────────────────────────────────────────────────────────┘
```

### Com Listener Unificado

1. **Mouse move no Container Pai**
   - Evento `pointermove` é capturado no container `.upload-grid`

2. **Loop por Todos os Cards**
   - JavaScript itera por todos os cards (`upload-card`)
   - Calcula posição do mouse relativa a CADA card

3. **Atualização de Variáveis CSS**
   - `--mouse-x`, `--mouse-y`: Coordenadas do mouse relativas ao card
   - `--ratio-x`, `--ratio-y`: Proporção da posição no card

4. **Resultado Visual**
   - Card A: Brilho forte (mouse está perto)
   - Card B: Brilho médio (mouse está a uma distância)
   - Ambos os cards atualizam suas variáveis CSS simultaneamente

### Com Listener Individual (Antes)

```
Mouse no Card A:
- Card A: ✅ Atualiza variáveis CSS
- Card B: ❌ Não atualiza (mouse não está sobre ele)

Resultado: Brilho não "vaza" de um card para o outro
```

## 4. Benefícios da Sincronização

### 4.1 Efeito Visual Melhor

- **Brilho Contínuo**: O brilho flui naturalmente de um card para o outro
- **Transição Suave**: Não há interrupções quando o mouse passa de um card para outro
- **Experiência Mais Imersiva**: O efeito parece mais orgânico e profissional

### 4.2 Performance Otimizada

- **Menos Listeners**: Um único listener em vez de múltiplos
- **Menos Overhead**: O navegador gerencia menos eventos
- **Código Mais Limpo**: Lógica centralizada e organizada

### 4.3 Manutenibilidade Melhor

- **Código Centralizado**: Lógica em um único lugar
- **Fácil de Debugar**: Um ponto de entrada para todos os eventos
- **Fácil de Modificar**: Alterações afetam todos os cards

## 5. Detalhes Técnicos

### 5.1 Cálculo de Posição Relativa

```javascript
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;
```

- `getBoundingClientRect()`: Retorna posição e dimensões do card
- `e.clientX`, `e.clientY`: Coordenadas do mouse na viewport
- `rect.left`, `rect.top`: Posição do card na viewport
- Subtração: Calcula posição do mouse relativa ao card

### 5.2 Cálculo de Proporção (Ratio)

```javascript
const RATIO = {
    x: x / rect.width,
    y: y / rect.height
};
```

- `x / rect.width`: Proporção horizontal (0 a 1)
- `y / rect.height`: Proporção vertical (0 a 1)
- Usado para posicionar gradientes conic

### 5.3 Atualização de Variáveis CSS

```javascript
card.style.setProperty("--mouse-x", `${x}px`);
card.style.setProperty("--mouse-y", `${y}px`);
card.style.setProperty("--ratio-x", RATIO.x);
card.style.setProperty("--ratio-y", RATIO.y);
```

- `setProperty()`: Define valor de variável CSS
- Variáveis são usadas nos gradientes conic e radial
- Atualização em tempo real durante o movimento do mouse

## 6. Adaptação para Outros Projetos

### Passo 1: Identificar o Container

Encontre o elemento pai que contém todos os cards:

```javascript
const container = document.querySelector(".seu-container");
const cards = document.getElementsByClassName("seus-cards");
```

### Passo 2: Implementar o Listener

```javascript
if (container) {
    container.onpointermove = e => {
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

            const RATIO = {
                x: x / rect.width,
                y: y / rect.height
            };

            card.style.setProperty("--ratio-x", RATIO.x);
            card.style.setProperty("--ratio-y", RATIO.y);
        }
    };
}
```

### Passo 3: Definir Variáveis CSS

Certifique-se de que as variáveis CSS estão definidas no `:root`:

```css
:root {
    --mouse-x: 0px;
    --mouse-y: 0px;
    --ratio-x: .5;
    --ratio-y: .75;
    --light-size: 200px;
}
```

## 7. Troubleshooting

### 7.1 O Efeito Não Funciona

**Verificações:**
1. O container existe? `console.log(container)`
2. Os cards existem? `console.log(cards)`
3. O listener está sendo adicionado? Adicione `console.log` dentro do listener
4. As variáveis CSS estão definidas? Verifique o `:root`

### 7.2 O Brilho Não Sincroniza

**Verificações:**
1. O listener está no container correto?
2. O loop está iterando por todos os cards?
3. As variáveis CSS estão sendo atualizadas?
4. O CSS está usando as variáveis corretamente?

### 7.3 Performance Ruim

**Soluções:**
1. Use `requestAnimationFrame` para otimizar atualizações
2. Limite a frequência de atualizações com `throttle` ou `debounce`
3. Reduza o número de cards se houver muitos

### 7.4 Compatibilidade com Navegadores

**Considerações:**
- `pointermove`: Funciona em navegadores modernos
- Para suporte mais amplo, use `mousemove` como fallback
- `getBoundingClientRect()`: Suportado em todos os navegadores modernos

## 8. Exemplo com requestAnimationFrame

Para otimizar ainda mais a performance:

```javascript
if (uploadContainer) {
    let isUpdating = false;

    uploadContainer.onpointermove = e => {
        if (isUpdating) return;
        isUpdating = true;

        requestAnimationFrame(() => {
            for (const card of cards) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);

                const RATIO = {
                    x: x / rect.width,
                    y: y / rect.height
                };

                card.style.setProperty("--ratio-x", RATIO.x);
                card.style.setProperty("--ratio-y", RATIO.y);
            }
            isUpdating = false;
        });
    };
}
```

## 9. Comparação: Antes vs Depois

### Antes (Listener Individual)

| Aspecto | Descrição |
|----------|-----------|
| **Listeners** | Múltiplos (um por card) |
| **Performance** | Menos eficiente |
| **Sincronização** | Não sincroniza entre cards |
| **Código** | Repetido em cada card |
| **Manutenibilidade** | Mais difícil de manter |

### Depois (Listener Unificado)

| Aspecto | Descrição |
|----------|-----------|
| **Listeners** | Único (no container pai) |
| **Performance** | Mais eficiente |
| **Sincronização** | Sincroniza todos os cards |
| **Código** | Centralizado e organizado |
| **Manutenibilidade** | Fácil de manter e modificar |

## 10. Recursos Relacionados

- [`exemplo.md`](exemplo.md:1) - Exemplo completo de implementação do efeito glitter
- [`BASE_DE_CONHECIMENTO.md`](BASE_DE_CONHECIMENTO.md:1) - Documentação completa do sistema
- [`style.css`](style.css:1) - Implementação completa dos estilos CSS
- [`script.js`](script.js:1) - Implementação completa do JavaScript

## 11. Conclusão

A implementação de um listener unificado no container pai resolve o problema de sincronização do brilho entre cards vizinhos. Esta abordagem:

1. **Melhora a experiência visual** com brilho contínuo
2. **Otimiza a performance** com menos listeners
3. **Facilita a manutenção** com código centralizado
4. **É fácil de adaptar** para outros projetos

Esta é a implementação atual utilizada no BdayPDF Creator para criar o efeito de glitter profissional nos cards de upload do modal de boas-vindas.

---

**Última Atualização**: 2026-02-14  
**Versão**: 2.0  
**Status**: Produção
