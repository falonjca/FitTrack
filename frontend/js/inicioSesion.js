const login = document.getElementById('iniciarSesionForm');

login.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('correo').value;

    const datos = {
        Email: email
    };

    if (
        !email.match(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        )
    ) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El correo no es válido',
            confirmButtonText: "Aceptar",
        });
        return; 
    }

    try {
        const respuesta = await fetch(`${baseUrl}/usuarios/login`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key
            },
            body: JSON.stringify(datos)
        });

        const result = await respuesta.json();

        if (respuesta.ok) {
            localStorage.setItem('UserId', result.User.UserId);
        
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Has Iniciado Sesión Correctamente',
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
