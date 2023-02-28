// Récupération de la fenêtre modale
const modalSettings = document.querySelector('#settings-modal');
const modalCalc = document.querySelector('#calculator-modal');
const modalHorlogerie = document.querySelector('#horlogerie-modal');
const modalTictactoe = document.querySelector('#tictactoe-modal');

// Récupération de l'en-tête de la fenêtre modale
const header = document.querySelectorAll('.modal-header');

// Récupération du coin inférieur droit de la fenêtre modale
const resizer = document.querySelector('.resizer');

// Initialisation des variables pour le glissement et le redimensionnement
let isDragging = false;
let isResizing = false;
let startX, startY, startWidth, startHeight;
let startXcalc, startYcalc, startWidthcalc, startHeightcalc;
let startXhorlo, startYhorlo, startWidthhorlo, startHeighthorlo;
let startXtictac, startYtictac, startWidthtictac, startHeighttictac;

// Ajout de l'événement "mousedown" sur l'en-tête de la fenêtre modale
header.forEach(element => {
    element.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX - modalSettings.offsetLeft;
    startY = e.clientY - modalSettings.offsetTop;
    startXcalc = e.clientX - modalCalc.offsetLeft;
    startYcalc = e.clientY - modalCalc.offsetTop;
    startXhorlo = e.clientX - modalHorlogerie.offsetLeft;
    startYhorlo = e.clientY - modalHorlogerie.offsetTop;
    startXtictac = e.clientX - modalTictactoe.offsetLeft;
    startYtictac = e.clientY - modalTictactoe.offsetTop;
    });
});
// Ajout de l'événement "mousemove" sur le document
document.addEventListener('mousemove', e => {
  if (isDragging) {
    modalSettings.style.left = e.clientX - startX + 'px';
    modalSettings.style.top = e.clientY - startY + 'px';
    modalCalc.style.left = e.clientX - startXcalc + 'px';
    modalCalc.style.top = e.clientY - startYcalc + 'px';
    modalHorlogerie.style.left = e.clientX - startXhorlo + 'px';
    modalHorlogerie.style.top = e.clientY - startYhorlo + 'px';
    modalTictactoe.style.left = e.clientX - startXtictac + 'px';
    modalTictactoe.style.top = e.clientY - startYtictac + 'px';
  }
  if (isResizing) {
    modalSettings.style.width = startWidth + e.clientX - startX + 'px';
    modalSettings.style.height = startHeight + e.clientY - startY + 'px';
    modalCalc.style.width = startWidthcalc + e.clientX - startXcalc + 'px';
    modalCalc.style.height = startHeightcalc + e.clientY - startYcalc + 'px';
    modalHorlogerie.style.width = startWidthhorlo + e.clientX - startXhorlo + 'px';
    modalHorlogerie.style.height = startHeighthorlo + e.clientY - startYhorlo + 'px';
    modalTictactoe.style.width = startWidthtictac + e.clientX - startXtictac + 'px';
    modalTictactoe.style.height = startHeighttictac + e.clientY - startYtictac + 'px';
  }
});

// Ajout de l'événement "mouseup" sur le document
document.addEventListener('mouseup', () => {
  isDragging = false;
  isResizing = false;
});

// Ajout de l'événement "mousedown" sur le coin inférieur droit de la fenêtre modale
resizer.addEventListener('mousedown', e => {
    isResizing = true;
    startWidth = parseInt(document.defaultView.getComputedStyle(modalSettings).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(modalSettings).height, 10);
    startWidthcalc = parseInt(document.defaultView.getComputedStyle(modalCalc).width, 10);
    startHeightcalc = parseInt(document.defaultView.getComputedStyle(modalCalc).height, 10);
    startWidthhorlo = parseInt(document.defaultView.getComputedStyle(modalHorlogerie).width, 10);
    startHeighthorlo = parseInt(document.defaultView.getComputedStyle(modalHorlogerie).height, 10);
    startWidthtictac = parseInt(document.defaultView.getComputedStyle(modalTictactoe).width, 10);
    startHeighttictac = parseInt(document.defaultView.getComputedStyle(modalTictactoe).height, 10);
    startX = e.clientX;
    startY = e.clientY;
    startXcalc = e.clientX;
    startYcalc = e.clientY;
    startXhorlo = e.clientX;
    startYhorlo = e.clientY;
    startXtictac = e.clientX;
    startYtictac = e.clientY;
    e.preventDefault();
});