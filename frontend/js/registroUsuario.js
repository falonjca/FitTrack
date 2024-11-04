const formulario = document.getElementById('registroForm');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    console.log('prueba conex');

    const nombre  = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const edad = document.getElementById('edad').value;
    const sexo = document.getElementById('sexo').value;

    const usuario = {
        Nombre: nombre,
        Email: email,
        Edad: edad,
        Sexo: sexo
    }
      
    try {
        const response = await fetch('http://localhost:3000/api/usuarios/', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

            const result = await response.json();

        if (response.ok) { 
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Usuario registrado exitosamente',
                confirmButtonText: 'Aceptar',
           
        }).then(() => {
            window.location.href = 'inicioSesion.html'; 
        });

            console.log(result);
            console.log("prueba", result);

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
