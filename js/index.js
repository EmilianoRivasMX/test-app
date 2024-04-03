// Funciones para gestión de cursos
function leerCursos() {
    // Obtener la lista de cursos del sessionStorage, o una lista vacía si no hay datos
    var cursos = JSON.parse(sessionStorage.getItem("cursos")) || [];
    
    // Si no hay cursos, ocultar la tabla y salir de la función
    if (cursos.length === 0) {
        document.getElementById("tabla").style.display = "none";
        return;
    }

    // Obtener el elemento de la tabla donde se mostrarán los cursos
    var tabla = document.getElementById("cuerpoTabla");

    // Inicializar una variable para almacenar las filas de la tabla
    var filas = "";

    // Iterar sobre la lista de cursos para generar las filas de la tabla
    cursos.forEach((curso, i) => {
        filas += `<tr>
            <td>${curso.id}</td>
            <td>${curso.nombre_curso}</td>
            <td>${curso.instructor}</td>
            <td>${curso.horario}</td>
            <td>${curso.nivel_del_curso}</td>
            <td>${curso.fecha_inicio}</td>
            <td><a class="delete-button" onclick="eliminarCurso(${i})"><i class="fa-solid fa-trash"></i></a></td>
            <td><a class="edit-button" onclick="editarCurso(${i})"><i class="fa-solid fa-pen-to-square"></i></a></td>
        </tr>`;
    });

    // Insertar las filas en la tabla
    tabla.innerHTML = filas;
}

function crearCurso() {
    // Obtener la lista de cursos del sessionStorage, o una lista vacía si no hay datos
    var cursos = JSON.parse(sessionStorage.getItem("cursos")) || [];

    // Obtener los valores de los campos del formulario
    var nombreCurso = document.getElementById("nombre_curso").value;
    var instructor = document.getElementById("instructor").value;
    var horario = document.getElementById("horario").value;
    var nivel = document.getElementById("nivel").value;
    var fechaInicio = document.getElementById("fecha_inicio").value;

    // Crear un objeto con los datos del nuevo curso
    var curso = {
        "id": cursos.length + 1,
        "nombre_curso": nombreCurso,
        "instructor": instructor,
        "horario": horario,
        "nivel_del_curso": nivel,
        "fecha_inicio": fechaInicio
    };

    // Agregar el nuevo curso a la lista de cursos
    cursos.push(curso);

    // Almacenar la lista actualizada en el sessionStorage
    sessionStorage.setItem("cursos", JSON.stringify(cursos));

    // Recargar la tabla de cursos
    leerCursos();
}

function editarCurso(id) {
    // Obtener la lista de cursos del sessionStorage
    var cursos = JSON.parse(sessionStorage.getItem("cursos"));

    // Obtener el curso que se quiere editar
    var curso = cursos[id];

    // Almacenar el curso a editar en el sessionStorage
    sessionStorage.setItem("curso_editar", JSON.stringify(curso));

    // Redirigir a la página de edición de cursos
    window.location.href = "nuevoCurso.html";
}

function actualizarCurso() {
    // Obtener el curso a editar del sessionStorage
    var curso_editar = JSON.parse(sessionStorage.getItem("curso_editar"));

    // Obtener los nuevos valores de los campos del formulario
    var nombreCurso = document.getElementById("nombre_curso").value;
    var instructor = document.getElementById("instructor").value;
    var horario = document.getElementById("horario").value;
    var nivel = document.getElementById("nivel").value;
    var fechaInicio = document.getElementById("fecha_inicio").value;

    // Actualizar los datos del curso
    curso_editar.nombre_curso = nombreCurso;
    curso_editar.instructor = instructor;
    curso_editar.horario = horario;
    curso_editar.nivel_del_curso = nivel;
    curso_editar.fecha_inicio = fechaInicio;

    // Obtener la lista de cursos del sessionStorage
    var cursos = JSON.parse(sessionStorage.getItem("cursos"));

    // Actualizar el curso en la lista de cursos
    cursos[curso_editar.id - 1] = curso_editar;

    // Almacenar la lista actualizada en el sessionStorage
    sessionStorage.setItem("cursos", JSON.stringify(cursos));

    // Limpiar el curso a editar del sessionStorage
    sessionStorage.removeItem("curso_editar");

    // Recargar la tabla de cursos
    leerCursos();
}

function eliminarCurso(id) {
    // Preguntar al usuario si está seguro de eliminar el curso
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar este curso?");

    // Si el usuario confirma la eliminación, proceder
    if (confirmacion) {
        // Obtener la lista de cursos del sessionStorage
        var cursos = JSON.parse(sessionStorage.getItem("cursos"));

        // Eliminar el curso de la lista de cursos
        cursos.splice(id, 1);

        // Actualizar la lista de cursos en el sessionStorage
        sessionStorage.setItem("cursos", JSON.stringify(cursos));

        // Recargar la tabla de cursos
        leerCursos();
    }
}

// Funciones para gestión de inscripciones
function leerInscripciones() {
    // Obtener la lista de inscripciones del sessionStorage, o una lista vacía si no hay datos
    var inscripciones = JSON.parse(sessionStorage.getItem("inscripciones")) || [];

    // Si no hay inscripciones, ocultar la tabla y salir de la función
    if (inscripciones.length === 0) {
        document.getElementById("tabla").style.display = "none";
        return;
    }

    // Obtener el elemento de la tabla donde se mostrarán las inscripciones
    var tabla = document.getElementById("cuerpoTabla");

    // Inicializar una variable para almacenar las filas de la tabla
    var filas = "";

    // Iterar sobre la lista de inscripciones para generar las filas de la tabla
    inscripciones.forEach((inscripcion, i) => {
        filas += `<tr>
            <td>${inscripcion.id}</td>
            <td>${inscripcion.nombre}</td>
            <td>${inscripcion.correo}</td>
            <td>${inscripcion.curso}</td>
            <td>${inscripcion.instructor}</td>
            <td>${inscripcion.nivel}</td>
            <td>${inscripcion.horario}</td>
            <td><a class="delete-button" onclick="eliminarInscripcion(${i})"><i class="fa-solid fa-trash"></i></a></td>
        </tr>`;
    });

    // Insertar las filas en la tabla
    tabla.innerHTML = filas;
}

function crearInscripcion() {
    // Obtener la lista de inscripciones del sessionStorage, o una lista vacía si no hay datos
    var inscripciones = JSON.parse(sessionStorage.getItem("inscripciones")) || [];

    // Obtener los valores de los campos del formulario
    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var curso = document.getElementById("curso").value;
    var instructor = document.getElementById("instructor").value;
    var nivel = document.getElementById("nivel").value;
    var horario = document.getElementById("horario").value;
    var tarjeta = document.getElementById("tarjeta").value;

    // Crear un objeto con los datos de la nueva inscripción
    var inscripcion = {
        "id": inscripciones.length + 1,
        "nombre": nombre,
        "correo": correo,
        "curso": curso,
        "instructor": instructor,
        "nivel": nivel,
        "horario": horario,
        "tarjeta": tarjeta
    };

    // Agregar la nueva inscripción a la lista de inscripciones
    inscripciones.push(inscripcion);

    // Almacenar la lista actualizada en el sessionStorage
    sessionStorage.setItem("inscripciones", JSON.stringify(inscripciones));

    // Recargar la tabla de inscripciones
    leerInscripciones();
}

function eliminarInscripcion(id) {
    // Preguntar al usuario si está seguro de eliminar la inscripción
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar esta inscripción?");

    // Si el usuario confirma la eliminación, proceder
    if (confirmacion) {
        // Obtener la lista de inscripciones del sessionStorage
        var inscripciones = JSON.parse(sessionStorage.getItem("inscripciones"));

        // Eliminar la inscripción de la lista de inscripciones
        inscripciones.splice(id, 1);

        // Actualizar la lista de inscripciones en el sessionStorage
        sessionStorage.setItem("inscripciones", JSON.stringify(inscripciones));

        // Recargar la tabla de inscripciones
        leerInscripciones();
    }
}