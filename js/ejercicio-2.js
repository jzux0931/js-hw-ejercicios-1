console.log('Javascript HW Ejercicio #2');

// Seleccionamos los botones que controlan el contador.
const countClicks = document.querySelector('.countClicks');
const resetClicks = document.querySelector('.resetClicks');

// Usamos una key unica para guardar el estado.
const clicksStorageKey = 'exercise2Clicks';

// Al cargar la pagina, intentamos recuperar el contador guardado.
let count = Number(localStorage.getItem(clicksStorageKey)) || 0;

// Pintamos el valor inicial, sea 0 o el valor recuperado de localStorage.
countClicks.textContent = `Clicks: ${count}`;

// Cada click aumenta el contador, lo guarda y actualiza el texto del boton.
countClicks.addEventListener('click', () => {
    count++;
    localStorage.setItem(clicksStorageKey, count);

    countClicks.textContent = `Clicks: ${count}`;
});

// El boton reset vuelve el contador a 0 y tambien actualiza localStorage.
resetClicks.addEventListener('click', () => {
    count = 0;
    localStorage.setItem(clicksStorageKey, count);

    countClicks.textContent = `Clicks: ${count}`;
});
