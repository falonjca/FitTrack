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
        const response = await fetch(`${baseUrl}/usuarios`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key
            },
            body: JSON.stringify(usuario)
        });

            const result = await response.json();

        if (response.ok) { 
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Usuario Registrado',
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
       console.error(error);
    }
});
