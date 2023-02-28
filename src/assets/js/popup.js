// Récupération de la fenêtre modale
const modalSettings = document.querySelector('#settings-modal');
const modalCalc = document.querySelector('#calculator-modal');
const modalHorlogerie = document.querySelector('#horlogerie-modal');
const modalTictactoe = document.querySelector('#tictactoe-modal');

// Récupération de l'en-tête de la fenêtre modale
const header = document.querySelector('.modal-header');
const headerCalc = document.querySelector('.modal-header-calc');
const headerHorlo = document.querySelector('.modal-header-horlo');
const headerTictac = document.querySelector('.modal-header-tictac');

// Récupération du coin inférieur droit de la fenêtre modale
const resizer = document.querySelector('.resizer');
const resizerCalc = document.querySelector('.resizer-calc');
const resizerHorlo = document.querySelector('.resizer-horlo');
const resizerTictac = document.querySelector('.resizer-tictac');

// Initialisation des variables pour le glissement et le redimensionnement
let isDragging = false;
let isDraggingCalc = false;
let isDraggingHorlo = false;
let isDraggingTictac = false;
let isResizing = false;
let isResizingCalc = false;
let isResizingHorlo = false;
let isResizingTictac = false;
let startX, startY, startWidth, startHeight;
let startXcalc, startYcalc, startWidthcalc, startHeightcalc;
let startXhorlo, startYhorlo, startWidthhorlo, startHeighthorlo;
let startXtictac, startYtictac, startWidthtictac, startHeighttictac;

// Ajout de l'événement "mousedown" sur l'en-tête de la fenêtre modale
header.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX - modalSettings.offsetLeft;
    startY = e.clientY - modalSettings.offsetTop;
});

headerCalc.addEventListener('mousedown', e => {
    isDraggingCalc = true;
    startXcalc = e.clientX - modalCalc.offsetLeft;
    startYcalc = e.clientY - modalCalc.offsetTop;
});

headerHorlo.addEventListener('mousedown', e => {
    isDraggingHorlo = true;
    startXhorlo = e.clientX - modalHorlogerie.offsetLeft;
    startYhorlo = e.clientY - modalHorlogerie.offsetTop;
});

headerTictac.addEventListener('mousedown', e => {
    isDraggingTictac = true;
    startXtictac = e.clientX - modalTictactoe.offsetLeft;
    startYtictac = e.clientY - modalTictactoe.offsetTop;
}); 

// Ajout de l'événement "mousemove" sur le document
document.addEventListener('mousemove', e => {
    if (isDragging) {
        modalSettings.style.left = e.clientX - startX + 'px';
        modalSettings.style.top = e.clientY - startY + 'px';
    }
    if(isDraggingCalc) {
        modalCalc.style.left = e.clientX - startXcalc + 'px';
        modalCalc.style.top = e.clientY - startYcalc + 'px';
    }
    if(isDraggingHorlo) {
        modalHorlogerie.style.left = e.clientX - startXhorlo + 'px';
        modalHorlogerie.style.top = e.clientY - startYhorlo + 'px';
    }
    if(isDraggingTictac) {
        modalTictactoe.style.left = e.clientX - startXtictac + 'px';
        modalTictactoe.style.top = e.clientY - startYtictac + 'px';
    }

    if (isResizing) {
        modalSettings.style.width = startWidth + e.clientX - startX + 'px';
        modalSettings.style.height = startHeight + e.clientY - startY + 'px';
    }
    if(isResizingCalc) {
        modalCalc.style.width = startWidthcalc + e.clientX - startXcalc + 'px';
        modalCalc.style.height = startHeightcalc + e.clientY - startYcalc + 'px';
    }
    if(isResizingHorlo) {
        modalHorlogerie.style.width = startWidthhorlo + e.clientX - startXhorlo + 'px';
        modalHorlogerie.style.height = startHeighthorlo + e.clientY - startYhorlo + 'px';
    }
    if(isResizingTictac) {
        modalTictactoe.style.width = startWidthtictac + e.clientX - startXtictac + 'px';
        modalTictactoe.style.height = startHeighttictac + e.clientY - startYtictac + 'px';
    }
});

// Ajout de l'événement "mouseup" sur le document
document.addEventListener('mouseup', () => {
    isDragging = false;
    isDraggingCalc = false;
    isDraggingHorlo = false;
    isDraggingTictac = false;
    isResizing = false;
    isResizingCalc = false;
    isResizingHorlo = false;
    isResizingTictac = false;
});

// Ajout de l'événement "mousedown" sur le coin inférieur droit de la fenêtre modale
resizer.addEventListener('mousedown', e => {
    isResizing = true;
    startWidth = parseInt(document.defaultView.getComputedStyle(modalSettings).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(modalSettings).height, 10);
    startX = e.clientX;
    startY = e.clientY;
    e.preventDefault();
});

// Ajout de l'événement "mousemove" sur le coin inférieur droit de la fenêtre modale
resizer.addEventListener('mousemove', e => {
    if (isResizing && !isDragging && (e.buttons === 1 || e.witch === 1)) {
        modalSettings.style.width = startWidth + e.clientX - startX + 'px';
        modalSettings.style.height = startHeight + e.clientY - startY + 'px';
    }
});

// Ajout de l'événement "mouseup" sur le coin inférieur droit de la fenêtre modale
resizer.addEventListener('mouseup', () => {
    isResizing = false;
});

resizerCalc.addEventListener('mousedown', e => {
    isResizingCalc = true;
    startWidthcalc = parseInt(document.defaultView.getComputedStyle(modalCalc).width, 10);
    startHeightcalc = parseInt(document.defaultView.getComputedStyle(modalCalc).height, 10);
    startXcalc = e.clientX;
    startYcalc = e.clientY;
    e.preventDefault();
});

resizerHorlo.addEventListener('mousedown', e => {
    isResizingHorlo = true;
    startWidthhorlo = parseInt(document.defaultView.getComputedStyle(modalHorlogerie).width, 10);
    startHeighthorlo = parseInt(document.defaultView.getComputedStyle(modalHorlogerie).height, 10);
    startXhorlo = e.clientX;
    startYhorlo = e.clientY;
    e.preventDefault();
});

resizerTictac.addEventListener('mousedown', e => {
    isResizingTictac = true;
    startWidthtictac = parseInt(document.defaultView.getComputedStyle(modalTictactoe).width, 10);
    startHeighttictac = parseInt(document.defaultView.getComputedStyle(modalTictactoe).height, 10);
    startXtictac = e.clientX;
    startYtictac = e.clientY;
    e.preventDefault();
});