
const tabla = $('#tabla').DataTable({
    lengthMenu: [2, 5, 10, 15],
    pageLength: 5,
    language: {
        lengthMenu: "Mostrar _MENU_ registros",
        zeroRecords: "No se encontraron datos",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
});

/*
const cargarDatos = async () => {

este tipo de funcion esta ASOCIADA A UNA VARIABLE y no es accesible GLOBLAMENTE a menos que le asigne 
el objeto WINDOW.ONLOAD
limita el alcanse de la funcion
---------------

async function cargarDatos() {

esta funcion esta accesible de manera GLOBAL
*/
 
async function cargarDatos() {
    try {
        const response = await fetch(`${baseUrl}/entrenamientos`, {
            method: "GET",
            headers: { "x-api-key": key }
        });
        const data = await response.json();

        tabla.clear();
        data.forEach(entrenamiento => {
            tabla.row.add([
                entrenamiento.Tipo,
                `${entrenamiento.Duracion} min`,
                `${entrenamiento.Calorias} kcal`,
                `
                    <button onclick="editar('${entrenamiento.EntrenamientoId}', '${entrenamiento.Tipo}', '${entrenamiento.Duracion}', '${entrenamiento.Calorias}')">Editar</button>
                    <button onclick="eliminar('${entrenamiento.EntrenamientoId}')">Eliminar</button>
                `
            ]);
        });
        tabla.draw();
    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

document.getElementById("entrenamientoForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const duracion = document.getElementById("duracion").value;
    const calorias = document.getElementById("calorias").value;

    const datos = {
        Tipo: tipo,
        Duracion: duracion,
        Calorias: calorias
    };

    try {
        const response = await fetch(`${baseUrl}/entrenamientos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": key
            },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            Swal.fire("Éxito", "Entrenamiento registrado", "success")
            cargarDatos();
        } else {
            Swal.fire("Error", "No se pudo registrar", "error");
        }
    } catch (error) {
        console.error(error);
    }
});

const editar = (id, tipo, duracion, calorias) => {
    document.getElementById("editForm").style.display = "block";
    document.getElementById("editTipo").value = tipo;
    document.getElementById("editDuracion").value = duracion;
    document.getElementById("editCalorias").value = calorias;

    document.getElementById("editForm").onsubmit = async (e) => {
        e.preventDefault();

        const editTipo = document.getElementById("editTipo").value;
        const editDuracion = document.getElementById("editDuracion").value;
        const editCalorias = document.getElementById("editCalorias").value;

        const datos = {
            Tipo: editTipo,
            Duracion: editDuracion,
            Calorias: editCalorias
        };

        try {
            const response = await fetch(`${baseUrl}/entrenamientos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": key
                },
                body: JSON.stringify(datos)
            });

            if (response.ok) {
                Swal.fire("Éxito", "Entrenamiento actualizado", "success");
                cargarDatos();
                document.getElementById("editForm").style.display = "none";
            } else {
                Swal.fire("Error", "No se pudo actualizar", "error");
            }
        } catch (error) {
            console.error(error);
        }
    };
};


const eliminar = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/entrenamientos/${id}`, {
            method: "DELETE",
            headers: { "x-api-key": key }
        });

        if (response.ok) {
            Swal.fire("Éxito", "Entrenamiento eliminado", "success");
            cargarDatos();
        } else {
            Swal.fire("Error", "No se pudo eliminar", "error");
        }
    } catch (error) {
        console.error(error);
    }
};


window.onload = () => {
    cargarDatos();
    editar(ejemploId, ejemploTipo, ejemploDuracion, ejemploCalorias);
}


document.getElementById("cancelEdit").addEventListener("click", () => {
    // ocultar el formulario de edition
    document.getElementById("editForm").style.display = "none";

    document.getElementById("tipo").value = '';
    document.getElementById("duracion").value = '';
    document.getElementById("calorias").value = '';
});
