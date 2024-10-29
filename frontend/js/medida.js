const medidasForm = document.getElementById('medidaForm');

medidasForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('UserId');

    const grasa = document.getElementById('grasa').value;
    const musculo = document.getElementById('musculo').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const fecha = document.getElementById('fecha').value; 

    const timestamp = new Date(fecha).toISOString(); 

    const datosM = {
        UserId: userId,
        Timestamp: timestamp,
        Grasa: grasa,
        Musculo: musculo,
        Altura: altura,
        Peso: peso
    }

    try {
        const response = await fetch('http://localhost:3000/api/medidas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosM)
        });
        const result = await response.json();
        
        if (response.ok) { 
            Swal.fire({
                icon: 'success',
                title: 'Medida Registrada Exitosamente',
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
