import Swal from 'sweetalert2';


export const loadingAlert = ({
    title = 'Espera un momento',
    html = 'guardando..'
}) =>{

    

    return Swal.fire({
        title,
        html,
        allowOutsideClick:false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading()
        },
    })
    
    
}

export const closeLoadingAlert = () => {
    return Swal.close()
}

export const alertError = ({
    text = 'Hubo un error al realizar la accion'
}) => {

    return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text
       
      })

}

export const alertSuccess = ({
    title = "Enviado correctamente",
}) => {

    return Swal.fire({
        position: 'top-end',
        icon: 'success',
        title,
        showConfirmButton: false,
        timer: 1500
      })

}