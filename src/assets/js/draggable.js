// Ouvrir la base de données
const dbRequest = indexedDB.open("DraggableDB", 1);

// Gérer les erreurs d'ouverture de la base de données
dbRequest.onerror = function(event) {
    // console.log("Erreur d'ouverture de la base de données");
};

// Initialiser la base de données
dbRequest.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore("positions", { keyPath: "id" });
};

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


// Ajouter les événements de souris pour tous les éléments draggable
draggableElements.forEach(element => {
    element.addEventListener('mousedown', dragStart);
});

// Ajouter les événements de souris pour la dropzone
const dropzone = document.querySelector('.dropzone');
dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('drop', drop);

// Récupérer les coordonnées finales des éléments depuis IndexedDB
const droppedElementsPositions = {};
dbRequest.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction("positions", "readonly");
    const objectStore = transaction.objectStore("positions");
    const request = objectStore.getAll();

    request.onerror = function(event) {
        // console.log("Erreur lors de la récupération des positions");
    };

    request.onsuccess = function(event) {
        const positions = event.target.result;
        positions.forEach(position => {
            droppedElementsPositions[position.id] = {
                x: position.x,
                y: position.y
            };
        });

        // Utiliser les coordonnées finales pour définir la position initiale de chaque élément
        draggableElements.forEach(element => {
            const id = element.id;
            const startPosition = droppedElementsPositions[id] || draggableElementsPositions[id];
            element.style.transform = `translate(${startPosition.x}px, ${startPosition.y}px)`;
            draggableElementsPositions[id] = startPosition;
        });
    };
};

// Fonction de démarrage du drag
function dragStart(e) {
    // Stocker les coordonnées initiales de l'élément
    const id = e.target.id;
    draggableElementsPositions[id].x = e.clientX;
    draggableElementsPositions[id].y = e.clientY;

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

    // Stocker les coordonnées finales dans IndexedDB
    const db = dbRequest.result;
    const transaction = db.transaction("positions", "readwrite");
    const objectStore = transaction.objectStore("positions");
    objectStore.put({
        id: id,
        x: finalX,
        y: finalY
    });
}

// Fonction de drag
function dragOver(e) {
    // Empêcher le comportement par défaut
    e.preventDefault();
  
    // Calculer la nouvelle position de l'élément
    const id = e.target.id;
    const draggableElement = document.getElementById(id);
    const startPosition = droppedElementsPositions[id] || draggableElementsPositions[id];
    const diffX = e.clientX - startPosition.x;
    const diffY = e.clientY - startPosition.y;
    const computedStyle = window.getComputedStyle(draggableElement); 
    const currentTransform = computedStyle.getPropertyValue("transform"); 
    const match = currentTransform.match(/matrix\((.*)\)/); 
    const matrix = match ? match[1].split(",") : [0, 0, 0, 0, 0, 0]; 
    const offsetX = parseInt(matrix[4]);
    const offsetY = parseInt(matrix[5]);
    const newX = offsetX + diffX;
    const newY = offsetY + diffY;
  
    // Déplacer l'élément à la nouvelle position
    draggableElement.style.transform = `translate(${newX}px, ${newY}px)`;
  
    // Mettre à jour les coordonnées initiales de l'élément
    draggableElementsPositions[id].x = e.clientX;
    draggableElementsPositions[id].y = e.clientY;
}
  

// Fonction de drop
function drop(e) {
    // Empêcher le comportement par défaut
    e.preventDefault();

    // Retirer l'élément de la dropzone
    const id = e.dataTransfer.getData('text/plain');
    // const draggableElement = document.getElementById(id);
    // draggableElement.parentNode.removeChild(draggableElement);

    // Supprimer les coordonnées finales de l'élément de IndexedDB
    const db = dbRequest.result;
    const transaction = db.transaction("positions", "readwrite");
    const objectStore = transaction.objectStore("positions");
    objectStore.delete(id);
}