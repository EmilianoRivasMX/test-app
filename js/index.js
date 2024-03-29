// Cursos
function leerCursos() {
    // Si no hay datos, no muestres la tabla
    if (sessionStorage.getItem("cursos") === null || JSON.parse(sessionStorage.getItem("cursos")).length === 0 ){
        document.getElementById("tabla").style.display = "none";
        return;
    }

    // Obtener la tabla con id "cuerpoTabla"
    var tabla = document.getElementById("cuerpoTabla");

    // Obtener la lista de cursos del sessionStorage
    var cursos = JSON.parse(sessionStorage.getItem("cursos"));

    filas = "";

    // Recorrer la lista de cursos e insertarlos en la tabla
    cursos.forEach((curso, i) => {
        filas += `
            <tr>
                <td>${curso.id}</td>
                <td>${curso.nombre_curso}</td>
                <td>${curso.instructor}</td>
                <td>${curso.horario}</td>
                <td>${curso.nivel_del_curso}</td>
                <td>${curso.fecha_inicio}</td>
                <td><a class="delete-button" onclick="eliminarCurso(${i})"><i class="fa-solid fa-trash"></i></a></td>
                <td><a class="edit-button" onclick="editarCurso(${i})"><i class="fa-solid fa-pen-to-square"></i></a></td>
            </tr>
        `;
    });

    // Insertar las filas en la tabla
    tabla.innerHTML = filas;
}

function crearCurso() {
    // Obtener los valores de los campos del formulario
    var nombreCurso = document.getElementById("nombre_curso").value;
    var instructor = document.getElementById("instructor").value;
    var horario = document.getElementById("horario").value;
    var nivel = document.getElementById("nivel").value;
    var fechaInicio = document.getElementById("fecha_inicio").value;

    // Obtener la lista de cursos del sessionStorage o inicializarla si es null
    var cursos = JSON.parse(sessionStorage.getItem("cursos")) || [];

    // Crear un objeto con los valores del formulario
    var curso = {
        "id": cursos.length + 1,
        "nombre_curso": nombreCurso,
        "instructor": instructor,
        "horario": horario,
        "nivel_del_curso": nivel,
        "fecha_inicio": fechaInicio
    };

    // Agregar el curso a la lista de cursos
    cursos.push(curso);

    // Almacenar la lista actualizada en el sessionStorage
    sessionStorage.setItem("cursos", JSON.stringify(cursos));

    // Recargar la tabla
    leerCursos();
}

function editarCurso(id) {
    // Obtener la lista de cursos del sessionStorage
    var cursos = JSON.parse(sessionStorage.getItem("cursos"));

    // Obtener los valores del curso a editar
    var curso = cursos[id];

    // Almacenar el curso en sessionStorage para editar posteriormente
    sessionStorage.setItem("curso_editar", JSON.stringify(curso));

    // Redirigir a la página de edición
    window.location.href = "nuevoCurso.html";
}

function eliminarCurso(id) {
    // Pregunta si el usuario está seguro de eliminar el curso
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar este curso?");

    // Elimina el curso de la lista de cursos y actualiza el sessionStorage
    if (confirmacion) {
        var cursos = JSON.parse(sessionStorage.getItem("cursos"));
        cursos.splice(id, 1);
        sessionStorage.setItem("cursos", JSON.stringify(cursos));
        leerCursos();
    }
}


// Inscripciones
function leerInscripciones() {
    if (sessionStorage.getItem("inscripciones") === null || JSON.parse(sessionStorage.getItem("inscripciones")).length === 0) {
        document.getElementById("tabla").style.display = "none";
        return;
    }

    var tabla = document.getElementById("cuerpoTabla");

    var inscripciones = JSON.parse(sessionStorage.getItem("inscripciones"));

    filas = "";

    inscripciones.forEach((inscripcion, i) => {
        filas += `
            <tr>
                <td>${inscripcion.id}</td>
                <td>${inscripcion.curso}</td>
                <td>${inscripcion.instructor}</td>
                <td>${inscripcion.nivel}</td>
                <td>${inscripcion.horario}</td>
                <td><a class="delete-button" onclick="eliminarInscripcion(${i})"><i class="fa-solid fa-trash"></i></a></td>
                <td><a class="edit-button" onclick="editarInscripcion(${i})"><i class="fa-solid fa-pen-to-square"></i></a></td>
            </tr>
        `;
    });

    tabla.innerHTML = filas;
}

function crearInscripcion() {
    var curso = document.getElementById("curso").value;
    var instructor = document.getElementById("instructor").value;
    var nivel = document.getElementById("nivel").value;
    var horario = document.getElementById("horario").value;

    var inscripciones = JSON.parse(sessionStorage.getItem("inscripciones")) || [];

    var inscripcion = {
        "id": inscripciones.length + 1,
        "curso": curso,
        "instructor": instructor,
        "nivel": nivel,
        "horario": horario,
    };

    inscripciones.push(inscripcion);

    sessionStorage.setItem("inscripciones", JSON.stringify(inscripciones));

    leerInscripciones();
}

function editarInscripcion(id) {
    var inscripciones = JSON.parse(sessionStorage.getItem("inscripciones"));
    var inscripcion = inscripciones[id];
    sessionStorage.setItem("inscripcion_editar", JSON.stringify(inscripcion));

    window.location.href = "nuevaInscripcion.html"; 

    // Llenar con los datos de la inscripción a editar
    // document.getElementById("curso").value = inscripcion.curso;
    // document.getElementById("instructor").value = inscripcion.instructor;
    // document.getElementById("nivel").value = inscripcion.nivel;
    // document.getElementById("horario").value = inscripcion.horario;
}

function eliminarInscripcion(id) {
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar esta inscripción?");
    if (confirmacion) {
        var inscripciones = JSON.parse(sessionStorage.getItem("inscripciones"));
        inscripciones.splice(id, 1);
        sessionStorage.setItem("inscripciones", JSON.stringify(inscripciones));
        leerInscripciones();
    }
}
