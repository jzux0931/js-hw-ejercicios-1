console.log('Javascript HW Ejercicio #1');

// Seleccionamos el boton que dispara el cambio de color.
const changeColorBtn = document.querySelector('.changeColor');

// Creamos un color HSL random para mantener colores vivos y variados.
const getRandomColors = () => {
    const hue = Math.floor(Math.random() * 360);    
    const saturation = Math.floor(Math.random() * 15) + 85;     
    const lightness = Math.floor(Math.random() * 15) + 45; 
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Cuando el usuario hace click, generamos un nuevo color y lo aplicamos al body.
changeColorBtn.addEventListener('click', () => {
   document.body.style.backgroundColor = getRandomColors();     
});
