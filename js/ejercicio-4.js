console.log('Javascript HW Ejercicio #4');

// Array base de usuarios disponibles para filtrar.
const users = [
    { name: 'Alice Smith', position: 'Full Stack Developer'},
    { name: 'Bob Jones', position: 'UI Designer'},
    { name: 'Ashley Brock', position: 'CTO'},
    { name: 'Beatrice Diaz', position: 'Manager'},
    { name: 'Jose Marquez', position: 'Frontend Developer'},
    { name: 'Shawn South', position: 'Backend Developer'},
    { name: 'Trent Brown', position: 'Ux Designer'},
    { name: 'Jesus Gonzalez', position: 'Backend Developer'},
    { name: 'Erick Garcia', position: 'QA Tester'},
    { name: 'Daniel Mahomes', position: 'Full Stack Developer'},
    { name: 'Laura Martinez', position: 'Frontend Developer'},
    { name: 'Carlos Ramirez', position: 'Backend Developer'},
    { name: 'Sofia Hernandez', position: 'UX Designer'},
    { name: 'Michael Torres', position: 'Project Manager'},
    { name: 'Valeria Lopez', position: 'QA Tester'},
    { name: 'Andrew Castillo', position: 'DevOps Engineer'},
    { name: 'Camila Flores', position: 'Product Owner'},
    { name: 'Diego Morales', position: 'Data Analyst'},
    { name: 'Nataly Ruiz', position: 'UI Designer'},
    { name: 'Fernando Vega', position: 'Scrum Master'},
];

// Seleccionamos el input de busqueda, la lista donde mostraremos resultados y el tipo de busqueda.
const searchBar = document.querySelector('#searchBar');
const searchType = document.querySelector('#searchType');
const resultsList = document.querySelector('.results');

// Recibe un array filtrado y lo muestra en el DOM.
const displayResults = (filteredUsers) => {
    resultsList.innerHTML = '';

    // Si no hay coincidencias, mostramos un mensaje en vez de dejar la lista vacia.
    if(filteredUsers.length === 0) {
        resultsList.innerHTML = '<li>No results found</li>';
        return;
    }

    // Por cada usuario filtrado, creamos un li con nombre y posicion.
    filteredUsers.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.position}`;
        resultsList.appendChild(li);
    });
}

// Normalizamos texto para que la busqueda no dependa de mayusculas ni espacios extra.
const normalizeText = (text) => {
    return text.toLowerCase().trim();
};

// Decide si un usuario coincide con la busqueda segun el tipo seleccionado.
const userMatchesQuery = (user, query, type) => {
    // Dividimos el nombre completo en nombre y apellido para poder buscar por separado.
    const [firstName, lastName] = normalizeText(user.name).split(' ');
    const position = normalizeText(user.position);

    // Si el usuario eligio "Nombre", buscamos solo en el primer nombre.
    if (type === 'firstName') {
        return firstName.includes(query);
    }

    // Si eligio "Apellido", buscamos solo en el apellido.
    if (type === 'lastName') {
        return lastName.includes(query);
    }

    // Si eligio "Posicion", buscamos solo en el rol/puesto del usuario.
    if (type === 'position') {
        return position.includes(query);
    }

    // Si eligio "Todo", buscamos en nombre completo y posicion.
    return normalizeText(user.name).includes(query) ||
           position.includes(query);
};

// Coordina toda la busqueda: lee el input, filtra usuarios y actualiza el DOM.
const handleSearch = () => {
    const query = normalizeText(searchBar.value);

    // Filtramos usando el texto escrito y la opcion seleccionada en el select.
    const matchedUsers = users.filter(user => {
        return userMatchesQuery(user, query, searchType.value);
    });

    displayResults(matchedUsers);
};

// El input actualiza resultados mientras el usuario escribe.
searchBar.addEventListener('input', handleSearch);

// El select vuelve a filtrar cuando el usuario cambia el tipo de busqueda.
searchType.addEventListener('change', handleSearch);

// Al cargar la pagina, mostramos todos los usuarios por defecto.
displayResults(users);
