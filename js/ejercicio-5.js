console.log('Javascript HW Ejercicio #5');

// Seleccionamos el display de la calculadora y el contenedor de botones.
const display = document.querySelector('#display');
const buttonsContainer = document.querySelector('.buttons');

// Guardamos todo el estado de la calculadora bajo una sola key.
const calculatorStorageKey = 'exercise5CalculatorState';

// Intentamos recuperar el ultimo estado guardado.
const savedCalculatorState = JSON.parse(localStorage.getItem(calculatorStorageKey)) || {};

// Estas variables representan el estado interno de la calculadora.
let currentInput = savedCalculatorState.currentInput || "";
let previousInput = savedCalculatorState.previousInput || "";
let operation = savedCalculatorState.operation || null;

// Si habia algo escrito antes de recargar, lo mostramos en pantalla.
display.value = currentInput;

// Guardamos el estado actual para poder restaurarlo despues.
const saveCalculatorState = () => {
    const calculatorState = {
        currentInput,
        previousInput,
        operation
    };

    localStorage.setItem(calculatorStorageKey, JSON.stringify(calculatorState));
};

// Agrega numeros, punto decimal u operadores segun el boton presionado.
const appendValue = (value) => {
    if(value === "." && currentInput.includes(".")) return;

    // Si el valor es una operacion, guardamos el numero anterior y esperamos el siguiente.
    if(['+', '-', '*', '/'].includes(value)) {
        if(currentInput === "") return;
        operation = value;
        previousInput = currentInput;
        currentInput = "";
        saveCalculatorState();
        return;
    }

    currentInput += value;
    display.value = currentInput;
    saveCalculatorState();
}

// Limpia pantalla, valores internos y estado guardado.
const clearDisplay = () => {
    currentInput = "";
    previousInput = "";
    operation = null;
    display.value = "";
    saveCalculatorState();
}

// Elimina el ultimo caracter del numero actual.
const deleteLast = () => {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
    saveCalculatorState();
}

// Convierte los valores a numero, ejecuta la operacion y muestra el resultado.
const calculateResult = () => {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if(isNaN(prev) || isNaN(current)) return;

    if(operation === '+') {
        result = prev + current;
    } else if (operation === '-') {
        result = prev - current;
    } else if (operation === '*') {
        result = prev * current;
    } else if (operation === '/') {
        if(current === 0) {
            result = "Error"
        } else {
            result = prev / current;
        }
    } else {
        return;
    }

    currentInput = result.toString();
    operation = null;
    previousInput = "";
    display.value = currentInput;
    saveCalculatorState();
}

// Delegacion de eventos: un solo listener escucha todos los botones.
buttonsContainer.addEventListener('click', (event) => {
    const button = event.target;

    // Si el click no viene de un boton, ignoramos el evento.
    if (button.tagName !== 'BUTTON') return;

    // value representa numeros/operadores; action representa acciones.
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value) {
        appendValue(value);
    } else if (action === 'clear') {
        clearDisplay();
    } else if (action === 'delete') {
        deleteLast();
    } else if (action === 'calculate') {
        calculateResult();
    }
});
