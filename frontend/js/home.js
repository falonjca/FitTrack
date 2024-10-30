document.addEventListener('DOMContentLoaded', () => {
    
    localStorage.getItem('UserId'); 

    console.log('UserId obtenido ', userId);

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

});

console.log("jsjsjsj");