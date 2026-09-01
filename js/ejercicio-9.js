console.log('Javascript HW Ejercicio #9');

// Seleccionamos los elementos principales de la lista de tareas persistente.
const taskInput = document.querySelector('#taskInput');
const addTask = document.querySelector('.addTask');
const taskList = document.querySelector('.taskList');
const clearCompletedTasks = document.querySelector('.clearCompletedTasks');

// Key especifica para guardar las tareas.
const tasksStorageKey = 'exercise9Tasks';

// El DOM se renderiza a partir de el array tasks.
let tasks = JSON.parse(localStorage.getItem(tasksStorageKey) || localStorage.getItem('tasks')) || [];

// Guardamos el array completo convirtiendolo a JSON.
const saveTasks = () => {
    localStorage.setItem(tasksStorageKey, JSON.stringify(tasks));
};

// Limpia y vuelve a mostrar la lista completa desde el array tasks.
const renderTasks = () => {
    taskList.innerHTML = '';

    tasks.forEach((task) => {
        // Cada tarea se representa con un li.
        const li = document.createElement('li');

        // El checkbox refleja y controla el estado completed.
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        // Cuando cambia el checkbox, actualizamos el objeto y guardamos.
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            saveTasks();
        });

        // El span muestra el texto de la tarea.
        const span = document.createElement('span');
        span.textContent = task.text;

        li.appendChild(checkbox);
        li.appendChild(span);
        taskList.appendChild(li);
    });
};

// Crea una tarea nueva desde el input y la agrega al array.
const addItems = () => {
    const itemText = taskInput.value.trim();

    // Evitamos guardar tareas vacias.
    if (itemText === '') {
        alert('Introduzca una tarea valida.');
        return;
    }

    // Cada tarea guarda id, texto y si esta completada o no.
    const newTask = {
        id: Date.now(),
        text: itemText,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    // Limpiamos el input para agregar otra tarea rapidamente.
    taskInput.value = '';
    taskInput.focus();
};

// Agrega tareas con click.
addTask.addEventListener('click', addItems);

// Agrega tareas con Enter.
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addItems();
    }
});

// Elimina todas las tareas que tengan completed en true.
clearCompletedTasks.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

// Al cargar la pagina, renderizamos lo que exista en localStorage.
renderTasks();
