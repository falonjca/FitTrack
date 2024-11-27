const entrenamientoForm = document.getElementById('entrenamientoForm');

entrenamientoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');

    const tipo = document.getElementById('tipo').value;
    const duracion = document.getElementById('duracion').value;
    const calorias = document.getElementById('calorias').value;

    const entrenamiento = {
        UserId: userId,
        Tipo: tipo,
        Duracion: duracion,
        Calorias: calorias
    }

    try {
        const response = await fetch(`${baseUrl}/entrenamientos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key
            },
            body: JSON.stringify(entrenamiento)
        });
        const result = await response.json();
        
        if (response.ok) { 
            Swal.fire({
                icon: 'success',
                title: 'Entrenamiento Registrado Exitosamente',
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
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error en la conexión',
            confirmButtonText: "Aceptar",
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const tabla = $('#tabla').DataTable(); // Asegúrate de que estás utilizando jQuery para DataTables.

    async function cargarDatosTabla() {
        try {
            const response = await fetch(`${baseUrl}/entrenamientos`, {
                headers: {
                    'x-api-key': key
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar datos');
            }

            const data = await response.json();

            // Limpiar la tabla antes de agregar nuevas filas
            tabla.clear();

            // Agregar cada fila a la tabla
            data.forEach(fila => {
                tabla.row.add([
                    fila.Tipo,
                    fila.Duracion,
                    fila.Calorias,
                    `
                    <button onclick="editar(${fila.id})">Editar</button>
                    <button onclick="eliminar(${fila.id})">Eliminar</button>
                    `
                ]);
            });

            // Actualizar la tabla para que muestre los nuevos datos
            tabla.draw();
        } catch (error) {
            console.error('Error al cargar los datos de la tabla:', error);
        }
    }

    // Llamar a la función para cargar datos al iniciar
    cargarDatosTabla();
});
