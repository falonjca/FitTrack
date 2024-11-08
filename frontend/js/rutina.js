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
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error en la conexión',
            confirmButtonText: "Aceptar",
        });
    }
});

const boton = document.getElementById('boton');

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
        
        <button type="button" class="eliminar">Eliminar Ejercicio</button>
    `;

    ejercicioDiv.querySelector('.eliminar').addEventListener('click', () => {
        ejerciciosSubFormu.removeChild(ejercicioDiv);
    });

    ejerciciosSubFormu.appendChild(ejercicioDiv);
});

