
// Crea datos aleatorios para la tabla
let datos = [{
    "id": 1,
    "nombre_curso": "Karate",
    "instructor": "Bruce Lee",
    "horario": "9:00 - 11:00",
    "nivel_del_curso": "Intermediate",
    "fecha_inicio": "Oct 10 2022",
}, {
    "id": 2,
    "nombre_curso": "Karate",
    "instructor": "Chuck Norris",
    "horario": "13:00 - 15:00",
    "nivel_del_curso": "Advanced",
    "fecha_inicio": "Oct 15 2022",
}, {
    "id": 3,
    "nombre_curso": "Karate",
    "instructor": "Jet Li",
    "horario": "16:00 - 18:00",
    "nivel_del_curso": "Beginner",
    "fecha_inicio": "Oct 20 2022",
}, {
    "id": 4,
    "nombre_curso": "Karate",
    "instructor": "Jackie Chan",
    "horario": "10:00 - 12:00",
    "nivel_del_curso": "Intermediate",
    "fecha_inicio": "Oct 25 2022",
}];

// let datos = []

function leerCursos() {
    // Si no hay datos no muestres la tabla
    if (datos.length === 0) {
        document.getElementById("tabla").style.display = "none";
        return;
    }

    // Alamcenar la lista de instructores en el sessionStorage
    sessionStorage.setItem("instructores", JSON.stringify(datos));
    
    // Obtener la tabla con id "cursos"
    var tabla = document.getElementById("cuerpoTabla");

    // Obtener la lista de instructores del sessionStorage
    var instructoresData = JSON.parse(sessionStorage.getItem("instructores"));

    filas = ""

    // Recorrer la lista de usuarios e instertarlos en la tabla
    instructoresData.map((instructor, i) => {
        filas += `
            <tr>
                <td>${instructor.id}</td>
                <td>${instructor.nombre_curso}</td>
                <td>${instructor.instructor}</td>
                <td>${instructor.horario}</td>
                <td>${instructor.nivel_del_curso}</td>
                <td>${instructor.fecha_inicio}</td>
                <td><a class="delete-button" onclick="eliminarCurso(${i})"><i class="fa-solid fa-trash"></i></a></td>
                <td><a class="edit-button" onclick="editarCurso(${i})"><i class="fa-solid fa-pen-to-square"></i></a></td>
            </tr>
        `
    })

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

    // Crear un objeto con los valores del formulario
    var curso = {
        "id": datos.length + 1,
        "nombre_curso": nombreCurso,
        "instructor": instructor,
        "horario": horario,
        "nivel_del_curso": nivel,
        "fecha_inicio": fechaInicio
    }
    
    // Redirigir a la página principal
    window.location.href = "cursos.html";

    // Agregar el curso a la lista de cursos
    datos.push(curso);

    // Recargar la tabla
    leerCursos();
}

function editarCurso(id) {
    // Obtener los valores del curso a editar
    var curso = datos[id];
    console.log(curso)
    // Redirigir a la página de edición
    window.location.href = "editarCurso.html";

    // Insertar los valores del curso en el formulario
    document.getElementById("id").value
    document.getElementById("nombre_curso").value = curso.nombre_curso;
    document.getElementById("instructor").value = curso.instructor;
    document.getElementById("horario").value = curso.horario;
    document.getElementById("nivel").value = curso.nivel_del_curso;
    document.getElementById("fecha_inicio").value = curso.fecha_inicio;
}

function eliminarCurso(id) {
    // Pregunta si el usuario está seguro de eliminar el curso
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar este curso?");
    
    // Elimina la fila de la tabla y del sessionStorage
    if (confirmacion) {
        datos.splice(id, 1); 
        leerCursos();
    }
}
