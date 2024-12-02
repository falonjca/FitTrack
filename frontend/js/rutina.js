let tabla;
$(document).ready(function() {
    tabla = $('#tabla').DataTable(configTabla);
    cargarDatos();
});

async function cargarDatos() {
    try {
        const response = await fetch(`${baseUrl}/rutinas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key
            }
        });
        const data = await response.json();

        tabla.clear();
        data.forEach(rutina => {
            rutina.Ejercicios.forEach(ejercicio => {
                tabla.row.add([
                    rutina.Nombre, 
                    rutina.Descripcion, 
                    ejercicio.Nombre, 
                    ejercicio.Repeticiones, 
                    ejercicio.Series, 
                    `
                        <button onclick="editar('${rutina.RutinaId}', '${rutina.Nombre}', '${rutina.Descripcion}', {
                            Nombre: '${ejercicio.Nombre}',
                            Repeticiones: ${ejercicio.Repeticiones},
                            Series: ${ejercicio.Series}
                        })">Editar</button>
                        <button onclick="eliminar('${rutina.RutinaId}')">Eliminar</button>
                    `
                ]);
            });
        });
        
tabla.draw();

    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

const formu = document.getElementById('crearRutinaForm');

formu.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('UserId');

    if (!userId) {
        Swal.fire({
            title: 'Error',
            text: 'No se encontró el ID del usuario',
            icon: 'error'
        }).then(() => {
            window.location.href = '/login.html';
        });
        return;
    }

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    
    const obtenerEjercicios = (div) => ({
        Nombre: div.querySelector('.nombreE').value,
        Repeticiones: div.querySelector('.repeticiones').value,
        Series: div.querySelector('.series').value,
    });

    const divs = document.querySelectorAll('.ejercicio');

    const rutinas = {
        UserId: userId,
        Nombre: nombre,
        Descripcion: descripcion,
        Ejercicios: Array.from(divs).map(obtenerEjercicios)
    };

    try {
        const response = await fetch(`${baseUrl}/rutinas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key
            },
            body: JSON.stringify(rutinas)
        });

        const result = await response.json();
        
        if (response.ok) { 
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Rutina Registrada Exitosamente',
                confirmButtonText: "Aceptar",
            }).then(() => {
                window.location.href = 'home.html'; 
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: result.error,
                confirmButtonText: "Aceptar",
            });
        }
    } catch (error) {
        console.error(error);
    }
});

const boton = document.getElementById('boton');

let ejercicioAgregado = false;

boton.addEventListener('click', () => {

    const ejerciciosSubFormu = document.getElementById('ejerciciosF');
    
    const ejercicioDiv = document.createElement('div');
    ejercicioDiv.classList.add('ejercicio');

    ejercicioDiv.innerHTML = `
        <label>Nombre del Ejercicio:</label>
        <input type="text" class="nombreE" required>
        
        <label>Repeticiones:</label>
        <input type="number" class="repeticiones" required>
        
        <label>Series:</label>
        <input type="number" class="series" required>
    `;

    boton.style.display = 'none';

    ejerciciosSubFormu.appendChild(ejercicioDiv);

    ejercicioAgregado = true;
});

const editar = (id, nombre, descripcion, ejercicio) => {
    const editForm = document.getElementById("editForm");
    editForm.style.display = "block";

    document.getElementById("editRutina").value = nombre;
    document.getElementById("editDescripcion").value = descripcion;
    document.getElementById("editEjercicio").value = ejercicio.Nombre;
    document.getElementById("editRepeticiones").value = ejercicio.Repeticiones;
    document.getElementById("editSeries").value = ejercicio.Series;

    editForm.onsubmit = async (e) => {
        e.preventDefault();

        const updatedRutina = {
            Nombre: document.getElementById("editRutina").value,
            Descripcion: document.getElementById("editDescripcion").value,
            Ejercicios: [
                {
                    Nombre: document.getElementById("editEjercicio").value,
                    Repeticiones: parseInt(document.getElementById("editRepeticiones").value),
                    Series: parseInt(document.getElementById("editSeries").value),
                },
            ],
        };

        try {
        
            const response = await fetch(`${baseUrl}/rutinas/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": key,
                },
                body: JSON.stringify(updatedRutina),
            });

            if (response.ok) {
                Swal.fire("Éxito", "Rutina actualizada correctamente", "success").then(() => {
                    cargarDatos(); 
                    editForm.style.display = "none"; 
                });
            } else {
                Swal.fire("Error", "No se pudo actualizar", "error");
            }
        } catch (error) {
            console.error(error);
        }
    };
};

document.getElementById("cancelEdit").addEventListener("click", () => {

    document.getElementById("editForm").style.display = "none";

});

window.onload = () => {
    cargarDatos();
    editar(id, nombre, descripcion, ejercicio);

}

const eliminar = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/rutinas/${id}`, {
            method: "DELETE",
            headers: { "x-api-key": key }
        });

        if (response.ok) {
            Swal.fire("Éxito", "Rutina eliminada", "success");
            cargarDatos();
        } else {
            Swal.fire("Error", "No se pudo eliminar", "error");
        }
    } catch (error) {
        console.error(error);
    }
};

