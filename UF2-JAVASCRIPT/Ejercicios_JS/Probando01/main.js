// Referencias a los elementos
const nombreEstudiante = document.getElementById("nombreEstudiante");
const matriculaEstudiante = document.getElementById("matriculaEstudiante");
const infoEstudiante = document.getElementById("infoEstudiante");
const btnAgregar = document.getElementById("agregarMateria");
const materiasContainer = document.getElementById("materiasContainer");
const listaMaterias = document.getElementById("listaMaterias");
const resultado = document.getElementById("resultado");

// Función para actualizar la lista y el promedio
function actualizarDatos() {
    // Mostrar nombre y matrícula
    if (nombreEstudiante.value.trim() !== "" && matriculaEstudiante.value.trim() !== "") {
        infoEstudiante.textContent = `Estudiante: ${nombreEstudiante.value} | Matrícula: ${matriculaEstudiante.value}`;
    } else {
        infoEstudiante.textContent = "";
    }

    // Actualizar materias y promedio
    let materias = document.querySelectorAll(".materia");
    listaMaterias.innerHTML = "";

    let sumaNotas = 0;
    let cantidadNotas = 0;

    materias.forEach(materia => {
        let nombre = materia.children[0].value.trim();
        let nota = parseFloat(materia.children[1].value);

        if (nombre !== "" && !isNaN(nota)) {
            let li = document.createElement("li");
            li.textContent = `${nombre}: ${nota}`;
            listaMaterias.appendChild(li);
            sumaNotas += nota;
            cantidadNotas++;
        }
    });

    let promedio = cantidadNotas > 0 ? (sumaNotas / cantidadNotas).toFixed(2) : "-";
    resultado.textContent = `Promedio: ${promedio}`;
}

// Evento para agregar materias dinámicamente con validación
btnAgregar.addEventListener("click", function() {
    let ultimaMateria = document.querySelectorAll(".materia");
    let nombreUltimaMateria = ultimaMateria.length > 0 ? ultimaMateria[ultimaMateria.length - 1].children[0].value.trim() : "";

    if (nombreUltimaMateria === "") {
        alert("Por favor, agregar una materia antes de añadir otra.");
        return;
    }

    let div = document.createElement("div");
    div.classList.add("materia");

    let inputMateria = document.createElement("input");
    inputMateria.type = "text";
    inputMateria.classList.add("materiaNombre");
    inputMateria.placeholder = "Nombre de la materia";
    inputMateria.required = true;
    inputMateria.addEventListener("input", actualizarDatos);

    let inputNota = document.createElement("input");
    inputNota.type = "number";
    inputNota.classList.add("materiaNota");
    inputNota.min = "0";
    inputNota.max = "10";
    inputNota.placeholder = "Nota";
    inputNota.required = true;
    inputNota.addEventListener("input", actualizarDatos);

    div.appendChild(inputMateria);
    div.appendChild(inputNota);
    materiasContainer.appendChild(div);
});

// Evento para actualizar datos en tiempo real
document.addEventListener("input", actualizarDatos);
