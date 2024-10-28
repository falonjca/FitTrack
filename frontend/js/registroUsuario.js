const formulario = document.getElementById('registroForm');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = {
        Nombre: document.getElementById('nombre').value,
        Email: document.getElementById('email').value,
        Edad: document.getElementById('edad').value,
        Sexo: document.getElementById('sexo').value
    };

    try {
        const respuesta = await fetch('http://localhost:3000/api/usuarios/', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

       
            const data = await respuesta.json();
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Usuario registrado exitosamente',
                confirmButtonText: 'Aceptar',
            });

            console.log(data);

        } catch (error){
            error = await respuesta.json();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'error', 
                confirmButtonText: "Aceptar",
    
        });
    }
});
