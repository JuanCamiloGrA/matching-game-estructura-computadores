// Definición de conceptos y sus definiciones
const concepts = [
    {
        term: "Tiempo de Acceso",
        definition: "Tiempo que tarda la computadora en leer o escribir datos en la memoria."
    },
    {
        term: "Memoria Cache",
        definition: "Memoria de alta velocidad y pequeño tamaño que almacena temporalmente los datos más utilizados por el procesador."
    },
    {
        term: "Acceso Secuencial",
        definition: "Método de acceso a datos donde cada elemento solo puede ser accedido después de leer los elementos previos en secuencia."
    },
    {
        term: "Registro",
        definition: "Pequeña unidad de almacenamiento de alta velocidad dentro del procesador para operaciones rápidas."
    },
    {
        term: "Procesador",
        definition: "Componente que interpreta y ejecuta instrucciones, realizando operaciones aritméticas y lógicas."
    },
    {
        term: "Arquitectura de Computador",
        definition: "Diseño conceptual que define la estructura y comportamiento de un sistema de computación."
    },
    {
        term: "Acceso Directo",
        definition: "Método de acceso a datos donde cualquier ubicación de memoria puede ser accedida directamente sin leer datos previos."
    },
    {
        term: "Memoria Volátil",
        definition: "Tipo de memoria que pierde su contenido cuando se corta la energía eléctrica."
    },
    {
        term: "Memoria No Volátil",
        definition: "Tipo de memoria que mantiene los datos almacenados incluso sin alimentación eléctrica."
    },
    {
        term: "Bus de Datos",
        definition: "Canal que transporta datos entre el procesador, la memoria y otros componentes del sistema."
    },
    {
        term: "Bus de Direcciones",
        definition: "Canal que lleva información sobre la ubicación donde se leerán o escribirán los datos."
    }
];

// Variables globales
let timer;
let timeLeft = 180;
let correctAnswers = 0;
let incorrectAnswers = 0;
let userAnswers = {};
let shuffledConcepts = [];

// Elementos DOM
const instructionsElement = document.getElementById('instructions');
const gameBoardElement = document.getElementById('game-board');
const gameOverElement = document.getElementById('game-over');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const timerElement = document.getElementById('timer-value');
const correctCountElement = document.getElementById('correct-count');
const incorrectCountElement = document.getElementById('incorrect-count');
const finalScoreElement = document.getElementById('final-score');
const feedbackElement = document.getElementById('feedback');
const conceptsContainer = document.getElementById('concepts');
const definitionsContainer = document.getElementById('definitions');

// Event Listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Función para iniciar el juego
function startGame() {
    instructionsElement.classList.add('hidden');
    gameBoardElement.classList.remove('hidden');
    
    // Reiniciar variables
    timeLeft = 180;
    correctAnswers = 0;
    incorrectAnswers = 0;
    userAnswers = {};
    updateScore();
    
    // Mezclar conceptos
    shuffledConcepts = [...concepts].sort(() => Math.random() - 0.5);
    
    // Generar elementos arrastrables y zonas de destino
    createDraggables();
    createDropTargets();
    
    // Iniciar temporizador
    startTimer();
    
    // Configurar drag and drop
    setupDragAndDrop();
}

// Función para reiniciar el juego
function restartGame() {
    gameOverElement.classList.add('hidden');
    startGame();
}

// Función para iniciar el temporizador
function startTimer() {
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Función para actualizar la visualización del temporizador
function updateTimerDisplay() {
    timerElement.textContent = timeLeft;
}

// Función para actualizar la puntuación
function updateScore() {
    correctCountElement.textContent = correctAnswers;
    incorrectCountElement.textContent = incorrectAnswers;
}

// Función para crear elementos arrastrables
function createDraggables() {
    conceptsContainer.innerHTML = '';
    
    shuffledConcepts.forEach(conceptObj => {
        const draggable = document.createElement('div');
        draggable.classList.add('draggable');
        draggable.setAttribute('draggable', 'true');
        draggable.dataset.term = conceptObj.term;
        draggable.textContent = conceptObj.term;
        
        conceptsContainer.appendChild(draggable);
    });
}

// Función para crear zonas de destino
function createDropTargets() {
    definitionsContainer.innerHTML = '';
    
    // Mezclar de nuevo para que las definiciones tengan un orden diferente
    const shuffledDefinitions = [...shuffledConcepts].sort(() => Math.random() - 0.5);
    
    shuffledDefinitions.forEach(conceptObj => {
        const dropTarget = document.createElement('div');
        dropTarget.classList.add('drop-target');
        
        const definitionText = document.createElement('p');
        definitionText.textContent = conceptObj.definition;
        
        const dropZone = document.createElement('div');
        dropZone.classList.add('drop-zone');
        dropZone.dataset.term = conceptObj.term;
        dropZone.textContent = 'Arrastra un concepto aquí';
        
        dropTarget.appendChild(definitionText);
        dropTarget.appendChild(dropZone);
        
        definitionsContainer.appendChild(dropTarget);
    });
}

// Configurar eventos de arrastrar y soltar
function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });
        
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });
    
    dropZones.forEach(dropZone => {
        dropZone.addEventListener('dragover', e => {
            e.preventDefault();
            dropZone.classList.add('highlight');
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('highlight');
        });
        
        dropZone.addEventListener('drop', e => {
            e.preventDefault();
            dropZone.classList.remove('highlight');
            
            const dragging = document.querySelector('.dragging');
            
            // Si la zona ya tiene un concepto, no permitir otro
            if (dropZone.querySelector('.dropped-item')) {
                return;
            }
            
            // Crear elemento para el concepto soltado
            const droppedItem = document.createElement('div');
            droppedItem.classList.add('dropped-item');
            droppedItem.textContent = dragging.textContent;
            droppedItem.dataset.term = dragging.dataset.term;
            
            // Verificar si es correcto
            const isCorrect = dragging.dataset.term === dropZone.dataset.term;
            
            if (isCorrect) {
                droppedItem.classList.add('correct');
                dropZone.classList.add('correct');
                correctAnswers++;
            } else {
                droppedItem.classList.add('incorrect');
                dropZone.classList.add('incorrect');
                incorrectAnswers++;
            }
            
            // Guardar respuesta del usuario
            userAnswers[dropZone.dataset.term] = {
                userAnswer: dragging.dataset.term,
                isCorrect: isCorrect
            };
            
            // Actualizar puntuación
            updateScore();
            
            // Añadir el elemento a la zona de destino
            dropZone.textContent = '';
            dropZone.appendChild(droppedItem);
            
            // Ocultar el elemento arrastrable original
            dragging.style.display = 'none';
            
            // Verificar si todos los conceptos han sido colocados
            if (Object.keys(userAnswers).length === shuffledConcepts.length) {
                endGame();
            }
        });
    });
}

// Función para finalizar el juego
function endGame() {
    clearInterval(timer);
    
    gameBoardElement.classList.add('hidden');
    gameOverElement.classList.remove('hidden');
    
    finalScoreElement.textContent = correctAnswers;
    
    generateFeedback();
}

// Función para generar retroalimentación
function generateFeedback() {
    feedbackElement.innerHTML = '';
    
    // Mostrar solo los conceptos incorrectos para no sobrecargar la retroalimentación
    const incorrectItems = Object.keys(userAnswers).filter(term => !userAnswers[term].isCorrect);
    
    if (incorrectItems.length === 0) {
        const perfectScore = document.createElement('div');
        perfectScore.classList.add('feedback-item', 'correct');
        perfectScore.textContent = '¡Felicidades! Has acertado todos los conceptos.';
        feedbackElement.appendChild(perfectScore);
        return;
    }
    
    const feedbackHeader = document.createElement('h4');
    feedbackHeader.textContent = 'Conceptos que debes repasar:';
    feedbackElement.appendChild(feedbackHeader);
    
    incorrectItems.forEach(term => {
        const userAnswer = userAnswers[term].userAnswer;
        
        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item', 'incorrect');
        
        const conceptObj = concepts.find(c => c.term === term);
        
        feedbackItem.innerHTML = `
            <strong>${term}</strong>: ${conceptObj.definition}<br>
            <small>Seleccionaste: "${userAnswer}"</small>
        `;
        
        feedbackElement.appendChild(feedbackItem);
    });
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    // Mantener el juego en la pantalla de instrucciones hasta que se presione "Comenzar"
    instructionsElement.classList.remove('hidden');
    gameBoardElement.classList.add('hidden');
    gameOverElement.classList.add('hidden');
});
