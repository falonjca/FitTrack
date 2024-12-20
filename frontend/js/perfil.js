document.addEventListener('DOMContentLoaded', async () => {

    const userId = localStorage.getItem('UserId');

    const perfil = document.getElementById('perfil'); 
    const editarPerfilA = document.getElementById('editarPerfil'); 
    const editarPerfilB = document.getElementById('editProfile'); 
    const guardarDatos = document.getElementById('guardarPerfil'); 
    const cancelarEdicion = document.getElementById('cancelarEdicion'); 

    function mostrarE(muestra, oculta) {
        oculta.style.display = 'none'; 
        muestra.style.display = 'block';
    }

    function iniciarEstadoVista() {
        editarPerfilB.style.display = 'none'; 
        perfil.style.display = 'block'; 
    }

    async function loadUserData() {
        try {
            const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`);
            if (response.ok) {

                const usuario = await response.json();

                console.log(usuario);

                document.getElementById('nombre').textContent = usuario.Nombre;
                document.getElementById('email').textContent = usuario.Email;
                document.getElementById('edad').textContent = usuario.Edad;
                document.getElementById('sexo').textContent = usuario.Sexo;

                document.getElementById('nombre2').value = usuario.Nombre;
                document.getElementById('email2').value = usuario.Email;
                document.getElementById('edad2').value = usuario.Edad;
                document.getElementById('sexo2').value = usuario.Sexo;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron obtener los datos del usuario',
                    confirmButtonText: "Aceptar",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al intentar cargar los datos',
                confirmButtonText: "Aceptar",
            });
        }
    }

    async function actualizarPerfil() {

        const actualizoDatos = {
            Nombre: document.getElementById('nombre2').value,
            Edad: document.getElementById('edad2').value,
            Sexo: document.getElementById('sexo2').value
        };

        try {
            const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(actualizoDatos)
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Perfil Actualizado Exitosamente',
                    confirmButtonText: "Aceptar"
                });

                document.getElementById('nombre').textContent = actualizoDatos.Nombre;
                document.getElementById('edad').textContent = actualizoDatos.Edad;
                document.getElementById('sexo').textContent = actualizoDatos.Sexo;

                mostrarE(perfil, editarPerfilB); 

            } else {
                const result = await response.json();

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
    }

    editarPerfilA.addEventListener('click', () => {
        mostrarE(editarPerfilB, perfil); 
    });

    guardarDatos.addEventListener('click', actualizarPerfil); 

    cancelarEdicion.addEventListener('click', () => {
        mostrarE(perfil, editarPerfilB); 
    });

    
    iniciarEstadoVista();
    await loadUserData();
});

function cerrarSesion() {
    localStorage.removeItem('UserId');
    window.location.href = 'landingPage.html';
}
