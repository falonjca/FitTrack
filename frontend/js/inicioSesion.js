const login = document.getElementById('iniciarSesionForm');

login.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('correo').value;

    const datos = {
        Email: email
    };

    if (
        !email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
        const respuesta = await fetch('http://localhost:3000/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const result = await respuesta.json();

        if (respuesta.ok) {
            localStorage.setItem('UserId', result.User.UserId);
        
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
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
