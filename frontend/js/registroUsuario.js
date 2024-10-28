const formulario = document.getElementById('registroForm');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Capturar los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const edad = document.getElementById('edad').value;
    const sexo = document.getElementById('sexo').value;

    // Crear objeto con los datos
    const usuarioData = {
        Nombre: nombre,
        Email: email,
        Edad: edad,
        Sexo: sexo
    };

    try {
        const response = await fetch('http://localhost:3000/api/usuarios/', {
            //mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioData)
        });

        if (response.ok) {
            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Usuario registrado exitosamente',
                confirmButtonText: 'Aceptar',
            });
        } else {
            const errorData = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error en el registro',
                text: errorData.error,
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error en la conexión',
            text: error.message,
        });
    }
});
