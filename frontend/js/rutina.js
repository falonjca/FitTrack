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



}catch (error) {
    console.error('Error al cargar los datos:', error);
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
                title: 'Rutina Creada Exitosamente',
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

// Deshabilitar el botón de agregar ejercicio después de haber agregado el primero
let ejercicioAgregado = false;

boton.addEventListener('click', () => {
    if (ejercicioAgregado) {
        // Si ya se agregó un ejercicio, no se hace nada más.
        return;
    }

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

    // Elimina el botón de "Agregar Ejercicio" después de mostrar el formulario
    boton.style.display = 'none';

    ejerciciosSubFormu.appendChild(ejercicioDiv);

    // Marca que ya se ha agregado un ejercicio
    ejercicioAgregado = true;
});


