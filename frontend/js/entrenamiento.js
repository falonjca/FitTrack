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
        const response = await fetch('http://localhost:3000/api/entrenamientos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
