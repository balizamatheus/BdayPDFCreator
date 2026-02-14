# Exemplo de Efeito Glitter para Upload Cards

Este documento contém o código de exemplo para implementar efeitos de glitter (brilho) em cards de upload, conforme utilizado no BdayPDF Creator.

## 📋 Visão Geral

O efeito de glitter cria um brilho dinâmico que segue o movimento do mouse sobre os cards de upload no modal de boas-vindas. O efeito utiliza gradientes conic com texturas de ruído para criar um visual moderno e atraente.

## 🎨 Implementação no BdayPDF Creator

### HTML Structure

No arquivo [`index.html`](index.html:1), o efeito é aplicado aos cards de upload no modal de boas-vindas:

```html
<div class="welcome-modal" id="welcomeModal">
    <!-- Imagens de glitter (ruído) -->
    <img class="glitter" src="https://assets.codepen.io/13471/noise-base.png" loading=lazy>
    <img class="glitter" src="https://assets.codepen.io/13471/noise-top.png" loading=lazy>

    <div class="welcome-content">
        <!-- Upload cards -->
        <div id="upload-grid" class="upload-grid">
            <div class="upload-card" id="welcomeExcelCard">
                <!-- Conteúdo do card -->
            </div>
            <div class="upload-card" id="welcomeTemplateCard">
                <!-- Conteúdo do card -->
            </div>
        </div>
    </div>
</div>
```

### CSS Variables

No arquivo [`style.css`](style.css:1), as variáveis CSS para o efeito são definidas:

```css
:root {
    /* Glitter Effect Variables */
    --background: rgb(20, 20, 20);
    --background-card-content: rgba(44, 44, 44, 1);
    --glitter: url("https://assets.codepen.io/13471/noise-base.png");
    --glitter2: url("https://assets.codepen.io/13471/noise-top.png");
    --ratio-x: .5;
    --ratio-y: .75;
    --light-size: 200px;
    --mouse-x: 0px;
    --mouse-y: 0px;
}
```

### CSS Styling

```css
/* Glitter Images */
.glitter {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
}

/* Upload Cards */
.upload-card {
    position: relative;
    background-color: rgba(33, 33, 33, 1);
    border-radius: 10px;
    height: 260px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    image-rendering: pixelate;
}

/* Card Before (Color gradient) */
.upload-card:before {
    content: "";
    background-color: rgba(255, 255, 255, 0);
    border-radius: inherit;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    transition-delay: 0s;
    z-index: 1;
}

.upload-card:before {
    content: "";
    background-image:
        conic-gradient(from 0deg at calc(0% + var(--mouse-x)) calc(0% + var(--mouse-y)),
            #FFBD8C 0%, #FD8585 11%, #FD8585 15%, #F882FF 27%, #F882FF 31%,
            #8785FE 42%, #8785FE 46%, #9AFCFF 55%, #9AFCFF 59%, #99FD9C 70%,
            #99FD9C 74%, #FFFD84 87%, #FFFD84 91%, #FFBD8C 100%),
        radial-gradient(calc(var(--light-size)*1.5) circle at var(--mouse-x) var(--mouse-y),
            rgba(255,255,255,.7), rgba(0, 0, 0, .5) 50%),
        radial-gradient(calc(var(--light-size)*1.5) circle at var(--mouse-x) var(--mouse-y),
            transparent, rgb(33,22,44) 60%, var(--background) 120%);
    background-blend-mode: hue, color-dodge;
    transition-delay: 0s;
    z-index: 1;
}

/* Card After (Light effect) */
.upload-card:after {
    content: "";
    --bgoffsetx: calc(3px * var(--ratio-x));
    --bgoffsety: calc(3px * var(--ratio-y));
    --pointerx: calc(100% * var(--ratio-x));
    --pointery: calc(100% * var(--ratio-y));

    background-color: var(--background-card-content);
    background-image:
        radial-gradient(var(--light-size) circle at var(--pointerx) var(--pointery), rgba(0,0,0,0.75), black),
        radial-gradient(var(--light-size) circle at var(--pointerx) var(--pointery), #252525cc, rgb(16, 16, 16) calc(var(--light-size) * 1)),
        var(--glitter2),
        var(--glitter2);
    background-position: center, center, center, calc(var(--bgoffsetx)*1) calc(var(--bgoffsety)*1);
    background-size: 300px 300px;
    background-blend-mode: normal, color-burn, color-dodge;
    filter: brightness(1.4) contrast(.725);

    opacity: 0;
    z-index: 2;
}

.upload-card:after {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 9px;
    height: calc(100% - 2px);
    width: calc(100% - 2px);
    transition-delay: 0.1s;
    z-index: 2;
}

/* Hover Effects */
#upload-grid:hover > .upload-card:before {
    opacity: 1;
    transition-delay: 0.1s;
}

#upload-grid:hover > .upload-card:after {
    opacity: .925;
    transition-delay: 0s;
}
```

### JavaScript Implementation

No arquivo [`script.js`](script.js:1), o listener unificado é implementado no DOMContentLoaded:

```javascript
// Inicialização ao carregar a página
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

// Função matemática para efeito de glitter
function fromCenter({ x, y }) {
    return Math.min(Math.max(0, Math.sqrt((y - .5) * (y - .5) + (x - .5) * (x - .5)) / .5), 1);
}
```

## 🔧 Como Funciona

### 1. Imagens de Ruído (Noise)

Duas imagens de ruído são carregadas:
- `noise-base.png`: Textura base para o efeito
- `noise-top.png`: Textura superior para o efeito

Essas imagens são usadas como background-image nos pseudo-elementos `::after`.

### 2. Gradientes Conic

O pseudo-elemento `::before` usa um gradiente conic com múltiplas cores:
- Começa em `calc(0% + var(--mouse-x))`, `calc(0% + var(--mouse-y))`
- Cria um arco-íris de cores que segue o mouse
- Usa `background-blend-mode: hue, color-dodge` para misturar cores

### 3. Gradientes Radiais

O pseudo-elemento `::after` usa múltiplos gradientes radiais:
- Primeiro gradiente: Cria um ponto de luz com sombra
- Segundo gradiente: Cria um halo de luz
- Mistura com as texturas de ruído usando `color-dodge`

### 4. Listener Unificado

O JavaScript usa um listener único no container pai (`.upload-grid`):
- Calcula a posição do mouse relativa a CADA card
- Atualiza as variáveis CSS `--mouse-x`, `--mouse-y`, `--ratio-x`, `--ratio-y`
- Isso permite que o brilho "vaze" de um card para o vizinho

### 5. Estados de Hover

- **Normal**: Opacidade 0 nos pseudo-elementos
- **Hover**: Opacidade 1 em `::before`, 0.925 em `::after`
- Transições suaves com delay para criar efeito sequencial

## 🎯 Benefícios da Implementação Unificada

### Sincronização de Brilho
O listener unificado permite que o brilho de um card "vaze" para o vizinho, criando um efeito mais natural e contínuo.

### Performance
Um único listener é mais eficiente que múltiplos listeners em cada card.

### Manutenibilidade
O código fica mais organizado e fácil de manter.

## 📝 Adaptação para Outros Projetos

Para usar este efeito em outros projetos:

1. **Copiar as variáveis CSS** para seu `:root`
2. **Adicionar as imagens de glitter** ao seu HTML
3. **Aplicar os estilos CSS** aos cards desejados
4. **Implementar o listener JavaScript** no container pai
5. **Ajustar as cores** do gradiente conic conforme necessário
6. **Ajustar o tamanho da luz** com `--light-size`

## 🎨 Personalização

### Cores do Gradiente Conic

Modifique as cores no gradiente conic para criar diferentes efeitos:

```css
background-image:
    conic-gradient(from 0deg at calc(0% + var(--mouse-x)) calc(0% + var(--mouse-y)),
        /* Suas cores aqui */
        #FF0000 0%, #00FF00 25%, #0000FF 50%, #FFFF00 75%, #FF00FF 100%),
    /* Resto do código... */
```

### Tamanho da Luz

Ajuste `--light-size` para controlar o tamanho do ponto de luz:

```css
:root {
    --light-size: 200px; /* Aumente para luz maior */
}
```

### Intensidade do Efeito

Ajuste a opacidade dos pseudo-elementos para controlar a intensidade:

```css
.upload-card:after {
    opacity: .925; /* Aumente para efeito mais intenso */
}
```

## 🔍 Troubleshooting

### O efeito não aparece

1. Verifique se as imagens de glitter estão carregando
2. Verifique se as variáveis CSS estão definidas
3. Verifique se o listener JavaScript está sendo executado
4. Verifique se o container `.upload-grid` existe

### O brilho não segue o mouse

1. Verifique se o listener está no container correto
2. Verifique se as variáveis CSS estão sendo atualizadas
3. Verifique se o `pointermove` está funcionando

### O efeito não é suave

1. Ajuste os delays de transição
2. Ajuste a duração das transições
3. Verifique se há conflitos com outras animações

## 📚 Recursos Relacionados

- [`sincronizar_brilho_unificado.md`](sincronizar_brilho_unificado.md:1) - Documentação detalhada da sincronização de brilho
- [`BASE_DE_CONHECIMENTO.md`](BASE_DE_CONHECIMENTO.md:1) - Documentação completa do sistema
- [`style.css`](style.css:1) - Implementação completa dos estilos
- [`script.js`](script.js:1) - Implementação completa do JavaScript

---

**Última Atualização**: 2026-02-14  
**Versão**: 2.0  
**Status**: Produção
