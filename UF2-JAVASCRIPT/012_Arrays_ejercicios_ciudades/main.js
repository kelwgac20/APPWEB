let ciudades = [];

function agregarCiudad() {
    const ciudadInput = document.getElementById("ciudadInput");
    const ciudad = ciudadInput.value.trim();

    if (ciudad && ciudades.length < 4) {
        ciudades.push(ciudad);
        ciudadInput.value = "";
        mostrarCiudades();
    } else if (ciudades.length >= 4) {
        alert("Solo puedes agregar hasta 4 ciudades.");
    } else {
        alert("Introduce un nombre válido.");
    }
}

function mostrarCiudades() {
    const listaCiudades = document.getElementById("listaCiudades");
    listaCiudades.innerHTML = ""; // Limpiar lista antes de mostrar

    ciudades.forEach((ciudad, index) => {
        const item = document.createElement("li");
        item.textContent = `${index + 1}. ${ciudad}`;
        listaCiudades.appendChild(item);
    });
}

function eliminarCiudad() {
    const indice = parseInt(document.getElementById("indiceEliminar").value);

    if (!isNaN(indice) && indice >= 1 && indice <= ciudades.length) {
        ciudades.splice(indice - 1, 1);
        mostrarCiudades();
    } else {
        alert("Introduce un número válido dentro del rango.");
    }
}
