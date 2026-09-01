console.log('Javascript HW Ejercicio #3');

// Seleccionamos el input, el boton y la lista donde se agregan los elementos.
const itemInput = document.querySelector('#itemInput');
const addTodo = document.querySelector('.addTodo');
const dynamicList = document.querySelector('.dynamicList');

// Esta key separa los datos de este ejercicio.
const dynamicListStorageKey = 'exercise3Items';

// Si hay datos guardados, los recuperamos de el array items.
let items = JSON.parse(localStorage.getItem(dynamicListStorageKey)) || [];

// Guardamos el array en localStorage convirtiendolo a JSON.
const saveItems = () => {
    localStorage.setItem(dynamicListStorageKey, JSON.stringify(items));
};

// Renderizamos la lista desde el array para que el DOM siempre tenga el estado real.
const renderItems = () => {
    dynamicList.innerHTML = '';

    items.forEach((item, index) => {
        // Creamos un li por cada elemento guardado.
        const li = document.createElement('li');
        li.textContent = item + " ";

        // Cada item tiene su propio boton para eliminarlo.
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "X";

        // Al eliminar, quitamos el item del array, guardamos y volvemos a mostrar.
        deleteButton.addEventListener('click', () => {
            items.splice(index, 1);
            saveItems();
            renderItems();
        });

        li.appendChild(deleteButton);
        dynamicList.appendChild(li);
    });
};

// Leemos el input, validamos que no este vacio y agregamos el texto al array.
const addItems = () => {
    const itemText = itemInput.value.trim();

    if(itemText === "") {
        alert('Introduzca una tarea valida.');
        return;
    }

    items.push(itemText);
    saveItems();
    renderItems();

    // Limpiamos el input para dejar listo el siguiente registro.
    itemInput.value = "";
    itemInput.focus();
};

// Permitimos agregar con click.
addTodo.addEventListener('click', addItems);

// Permitimos agregar con Enter para mejorar la experiencia.
itemInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        addItems();
    }
})

// Al entrar a la pagina, mostramos lo que ya estaba en localStorage.
renderItems();
