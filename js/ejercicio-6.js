console.log('Javascript HW Ejercicio #6');

// Seleccionamos la pantalla del timer y los botones de control.
const display = document.querySelector('#timer-display');
const startButton = document.querySelector('#startButton');
const pauseButton = document.querySelector('#pauseButton');
const resetButton = document.querySelector('#resetButton');

// Key exclusiva para guardar el tiempo acumulado.
const timerStorageKey = 'exercise6ElapsedTime';

// startTime marca el momento de inicio; elapsedTime guarda el tiempo acumulado.
let startTime = 0;
let elapsedTime = Number(localStorage.getItem(timerStorageKey)) || 0;
let timerInterval;

// Convierte milisegundos en formato HH:MM:SS:MS.
const timeToString = (time) => {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMS = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMS);


    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(3, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Calcula el tiempo transcurrido desde startTime y actualiza el DOM.
const printTime = () => {
    elapsedTime = Date.now() - startTime;
    display.innerHTML = timeToString(elapsedTime);
}

// Mostramos el tiempo guardado al cargar la pagina.
display.innerHTML = timeToString(elapsedTime);

// Inicia o reanuda el temporizador respetando el tiempo ya transcurrido.
const start = () => {
    startTime = Date.now() - elapsedTime;

    // Limpiamos cualquier intervalo anterior para evitar timers duplicados.
    clearInterval(timerInterval);

    timerInterval = setInterval(printTime, 10);
}

// Pausa el intervalo y guarda el tiempo actual.
const pause = () => {
    clearInterval(timerInterval);
    localStorage.setItem(timerStorageKey, elapsedTime);
}

// Detiene el timer, vuelve a cero y guarda ese reset.
const reset = () => {
    clearInterval(timerInterval);
    display.innerHTML = "00:00:00:000";
    elapsedTime = 0;
    localStorage.setItem(timerStorageKey, elapsedTime);
}

// Si el usuario recarga o sale de la pagina, guardamos el ultimo tiempo.
window.addEventListener('beforeunload', () => {
    localStorage.setItem(timerStorageKey, elapsedTime);
});

// Conectamos cada boton con su accion.
startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
