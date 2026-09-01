console.log('Javascript HW Ejercicio #8');

// Seleccionamos el textarea y los contadores que se actualizan en pantalla.
const textoInput = document.querySelector('#textoInput');
const contadorPalabras = document.querySelector('#contadorPalabras');
const contadorCaracteres = document.querySelector('#contadorCaracteres');

// Key exclusiva para recordar el texto escrito.
const textAnalyzerStorageKey = 'exercise8Text';

// Recalcula palabras y caracteres a partir del valor actual del textarea.
const updateCounters = () => {
    const texto = textoInput.value;

    // Quitamos espacios, tabs y saltos de linea antes de contar caracteres.
    const caracteresSinEspacios = texto.replace(/\s/g, '');
    contadorCaracteres.textContent = caracteresSinEspacios.length;

    // trim evita contar espacios al inicio/final; split separa por uno o mas espacios.
    const palabras = texto.trim().split(/\s+/);

    // Si el texto esta vacio, evitamos que split cuente una palabra fantasma.
    if(texto.trim() === '') {
        contadorPalabras.textContent = 0;
    } else {
        contadorPalabras.textContent = palabras.length;
    }
};

// Restauramos el texto guardado y actualizamos contadores al cargar.
textoInput.value = localStorage.getItem(textAnalyzerStorageKey) || '';
updateCounters();

// En cada escritura guardamos el texto y refrescamos los contadores.
textoInput.addEventListener('input', () => {
    localStorage.setItem(textAnalyzerStorageKey, textoInput.value);
    updateCounters();
});
