# 🔗 Sincronização de Brilho: Efeito de Superfície Única

## 1. Problema Identificado
O código atual aplica o `onpointermove` individualmente em cada card. Isso faz com que as variáveis CSS de um card só sejam atualizadas quando o mouse está diretamente sobre ele, impedindo que o brilho de um card "vaze" para o vizinho.

## 2. Nova Lógica de JavaScript
Substitua o bloco de código que percorre `document.getElementsByClassName("upload-card")` por este listener unificado. Ele deve ser aplicado ao container que agrupa os cards (ex: `.upload-section` ou o container pai direto).

```javascript
// Localize o container que contém os cards de Excel e Template
const uploadContainer = document.querySelector(".upload-section"); // Ou o seletor do container pai
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