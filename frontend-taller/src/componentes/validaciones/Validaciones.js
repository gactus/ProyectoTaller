import Swal from "sweetalert2";
const notificaAccion = (mensaje, icono)=>{
    Swal.fire({title: "<strong>Atención</strong>",
        html: mensaje,
        icon: icono,
        timer: 3000,
    });
}