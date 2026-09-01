console.log('Javascript HW Ejercicio #7');

// Seleccionamos el input, el boton y el lugar donde se muestra la contraseña.
const input = document.querySelector('#passwordLength');
const button = document.querySelector('.generatePassword');
const result = document.querySelector('.passwordResult');

// Key para guardar la ultima contraseña generada y la longitud usada.
const passwordStorageKey = 'exercise7PasswordState';

// Recuperamos el estado anterior si el usuario ya habia generado una contraseña.
const savedPasswordState = JSON.parse(localStorage.getItem(passwordStorageKey)) || {};

// Restauramos la longitud usada anteriormente.
input.value = savedPasswordState.length || '';

// Si habia una contraseña guardada, la mostramos al cargar la pagina.
result.textContent = savedPasswordState.password
    ? `Ultima contraseña creada: ${savedPasswordState.password}`
    : '';

// Genera una contraseña aleatoria de la longitud recibida.
const createPassword = (length) => {
    let password = '';
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // crypto genera numeros aleatorios mas seguros que Math.random.
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    // Convertimos cada numero aleatorio en una posicion valida dentro de chars.
    for (let number of array) {
        password += chars[number % chars.length];
    }

    return password;
}

// Al hacer click, validamos longitud, generamos password y guardamos el resultado.
button.addEventListener('click', () => {
    const originalText = button.textContent;

    // Efecto visual mientras se genera la contraseña.
    button.textContent = 'Generando...';
    button.disabled = true;

    setTimeout(() => {
        const length = Number(input.value);

        // Cortamos la ejecucion si la longitud no cumple las reglas.
        if (!length || length < 4 || length > 12) {
            result.textContent = 'La longitud debe ser mayor de 4 caracteres, e igual o menor de 12 caracteres.';
            button.textContent = originalText;
            button.disabled = false;
            return;
        }

        const password = createPassword(length);
        result.textContent = `Nueva contraseña creada: ${password}`;

        // Guardamos la ultima longitud y contraseña para restaurarlas al recargar.
        localStorage.setItem(passwordStorageKey, JSON.stringify({
            length,
            password
        }));

        // Regresamos el boton a su estado normal.
        button.textContent = originalText;
        button.disabled = false;
    }, 250);
});
