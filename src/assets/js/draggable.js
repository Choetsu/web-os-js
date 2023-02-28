// Récupérer tous les éléments draggable
const draggableElements = document.querySelectorAll('.draggable');

// Stocker les coordonnées initiales de chaque élément draggable
const draggableElementsPositions = {};
draggableElements.forEach(element => {
    draggableElementsPositions[element.id] = {
        x: 0,
        y: 0
    };
});

// Récupérer les coordonnées finales des éléments depuis localStorage
const droppedElementsPositions = JSON.parse(localStorage.getItem('droppedElementsPositions')) || {};

// Utiliser les coordonnées finales pour définir la position initiale de chaque élément
// draggableElements.forEach(element => {
//   const id = element.id;
//   const startPosition = droppedElementsPositions[id] || draggableElementsPositions[id];
//   element.style.transform = `translate(${startPosition.x}px, ${startPosition.y}px)`;
//   draggableElementsPositions[id] = startPosition;
// });

// Ajouter les événements de souris pour tous les éléments draggable
draggableElements.forEach(element => {
    element.addEventListener('mousedown', dragStart);
});

// Ajouter les événements de souris pour la dropzone
const dropzone = document.querySelector('.dropzone');
dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('drop', drop);

// Fonction de démarrage du drag
function dragStart(e) {
    // Stocker les coordonnées initiales de l'élément
    const id = e.target.id;
    draggableElementsPositions[id].x = e.clientX;
    draggableElementsPositions[id].y = e.clientY;
        
    // startX = e.clientX;
    // startY = e.clientY;

    // // Stocker l'ID de l'élément déplacé dans e.dataTransfer
    // e.dataTransfer.setData("text", e.target.id);
            
    // Définir l'effet de drag
    e.dataTransfer.effectAllowed = 'move';

    // Ajouter l'événement de drag à l'élément
    e.target.addEventListener('mousemove', dragOver);
    e.target.addEventListener('mouseup', dragEnd);
}

// Fonction de fin de drag
function dragEnd(e) {
    // Retirer l'événement de drag de l'élément
    e.target.removeEventListener('mousemove', dragOver);
    e.target.removeEventListener('mouseup', dragEnd);

    // Stocker les coordonnées finales de l'élément
    const id = e.target.id;
    const draggableElement = document.getElementById(id);
    const computedStyle = getComputedStyle(draggableElement);
    const finalX = parseInt(computedStyle.left);
    const finalY = parseInt(computedStyle.top);
    droppedElementsPositions[id] = {
        x: finalX,
        y: finalY
    };

    // Sauvegarder les coordonnées finales des éléments dans localStorage
    localStorage.setItem('droppedElementsPositions', JSON.stringify(droppedElementsPositions));

    // Définir la position finale de l'élément
    e.target.style.transform = `translate(${finalX}px, ${finalY}px)`;
}

// Fonction de survol pendant le drag
function dragOver(e) {
    e.preventDefault();

    // Récupérer l'élément déplacé
    const id = e.target.id;
    const draggableElement = document.getElementById(id);

    // Calculer le décalage par rapport à la position initiale ou finale selon si l'élément a été déposé dans la dropzone
    const elementStartPosition = droppedElementsPositions[id] || draggableElementsPositions[id];
    const offsetX = e.clientX - elementStartPosition.x;
    const offsetY = e.clientY - elementStartPosition.y;

    // Récupérer la position actuelle de l'élément
    const currentX = parseInt(draggableElement.style.left) || 0;
    const currentY = parseInt(draggableElement.style.top) || 0;

    // Calculer la nouvelle position de l'élément
    const newX = currentX + offsetX;
    const newY = currentY + offsetY;

    // Déplacer l'élément à la nouvelle position
    draggableElement.style.transform = `translate(${newX}px, ${newY}px)`;
}

function drop(e) {
    e.preventDefault();

    // Récupérer l'élément déplacé
    const id = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);

    // Ajouter l'élément à la dropzone
    dropzone.appendChild(draggableElement);

    // Mettre à jour la position initiale de l'élément déplacé
    const initialX = droppedElementsPositions[id] ? droppedElementsPositions[id].x : draggableElementsPositions[id].x;
    const initialY = droppedElementsPositions[id] ? droppedElementsPositions[id].y : draggableElementsPositions[id].y;
    draggableElement.style.transform = `translate(${initialX}px, ${initialY}px)`;
    // Réinitialiser les coordonnées initiales de l'élément
    draggableElementsPositions[id] = {
        x: initialX,
        y: initialY
    };

    // Stocker les coordonnées finales de l'élément déposé dans la dropzone
    const finalX = initialX + e.clientX - draggableElementsPositions[id].x;
    const finalY = initialY + e.clientY - draggableElementsPositions[id].y;
    droppedElementsPositions[id] = {
        x: finalX,
        y: finalY
    };

    // Définir la position finale de l'élément déposé
    draggableElement.style.transform = `translate(${finalX}px, ${finalY}px)`;
}