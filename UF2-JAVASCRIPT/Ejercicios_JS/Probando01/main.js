// Referencias a los elementos
const nombreEstudiante = document.getElementById("nombreEstudiante");
const matriculaEstudiante = document.getElementById("matriculaEstudiante");
const btnAgregar = document.getElementById("agregarMateria");
const btnCambiar = document.getElementById("cambiarAlumno");
const materiasContainer = document.getElementById("materiasContainer");
const historialAlumnos = document.getElementById("historialAlumnos");

let alumnos = [];

// Función para calcular el promedio
function calcularPromedio() {
    let materias = document.querySelectorAll(".materia");
    let sumaNotas = 0;
    let cantidadNotas = 0;

    materias.forEach(materia => {
        let nota = parseFloat(materia.children[1].value);
        if (!isNaN(nota)) {
            sumaNotas += nota;
            cantidadNotas++;
        }
    });

    return cantidadNotas > 0 ? (sumaNotas / cantidadNotas).toFixed(2) : "-";
}

// Función para guardar el alumno y cambiar de estudiante
btnCambiar.addEventListener("click", function() {
    let nombre = nombreEstudiante.value.trim();
    let matricula = matriculaEstudiante.value.trim();
    
    if (nombre === "" || matricula === "") {
        alert("Ingrese nombre y matrícula del estudiante.");
        return;
    }

    let promedio = calcularPromedio();
    let materias = [];

    document.querySelectorAll(".materia").forEach(materia => {
        let materiaNombre = materia.children[0].value.trim();
        let nota = parseFloat(materia.children[1].value);

        if (materiaNombre !== "" && !isNaN(nota)) {
            materias.push(`${materiaNombre}: ${nota}`);
        }
    });

    if (materias.length === 0) {
        alert("Ingrese al menos una materia antes de cambiar de alumno.");
        return;
    }

    // Guardar datos del alumno en la lista
    alumnos.push({ nombre, matricula, materias, promedio });

    // Agregar al historial de alumnos
    let li = document.createElement("li");
    li.innerHTML = `<strong>${nombre} (Matrícula: ${matricula})</strong> - Promedio: ${promedio} <br> Materias: ${materias.join(", ")}`;
    historialAlumnos.appendChild(li);

    // Reiniciar los campos para un nuevo alumno
    nombreEstudiante.value = "";
    matriculaEstudiante.value = "";
    materiasContainer.innerHTML = `<div class="materia">
        <input type="text" class="materiaNombre" placeholder="Nombre de la materia" required>
        <input type="number" class="materiaNota" min="0" max="10" placeholder="Nota" required>
    </div>`;
});

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

    let inputNota = document.createElement("input");
    inputNota.type = "number";
    inputNota.classList.add("materiaNota");
    inputNota.min = "0";
    inputNota.max = "10";
    inputNota.placeholder = "Nota";
    inputNota.required = true;

    div.appendChild(inputMateria);
    div.appendChild(inputNota);
    materiasContainer.appendChild(div);
});

