const login = document.getElementById('iniciarSesionForm');

login.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
        Email: document.getElementById('correo').value,
    }

    try {
    const respuesta = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

        const result = await respuesta.json();
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            confirmButtonText: "Aceptar",
        });

        console.log(result);

    } catch (error) {
        error = await respuesta.json();
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'error', 
            confirmButtonText: "Aceptar",
        });
    }
});
