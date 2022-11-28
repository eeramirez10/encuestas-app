
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { alertError, alertSuccess, closeLoadingAlert, loadingAlert } from '../../helpers/alerts';
import { fetchAPI } from '../../helpers/fetch';
import copy from 'copy-to-clipboard';
import Loading from '../UI/Loading';
import { Alert } from 'react-bootstrap';
import Search from '../search/Search';
import { useTable } from '../../hooks/useTable';
import Paginacion from '../pagination/Paginacion';


const AsignarEncuesta = ({ encuesta }) => {


    const { 
        rows: usuarios, 
        handleOnBusqueda, 
        handleIsLoading, 
        isLoading, 
        busqueda , 
        paginacion, 
        setPaginacion
    } = useTable('usuarios');






    const handleAsignar = async (usuario, i) => {

        handleIsLoading(true)


        const asignar = await fetchAPI({
            endpoint: 'encuesta/asignar',
            method: 'POST',
            data: {
                idEncuesta: encuesta._id,
                idUsuario: usuario._id
            }
        });

        handleIsLoading(false)

        await asignar.json();




    }

    const isEncuestaAsignada = (usuario) => {

        return (

            usuario.encuestas.length ?
                usuario.encuestas?.some(en => en.encuesta === encuesta._id) : false
        )

    }

    const isEncuestaContestada = (usuario) => {
        return (
            usuario.encuestas.length ?
                usuario.encuestas?.find(en => en.encuesta === encuesta._id)?.contestada ? "Si" : "No" : ""
        )

    }

    const generaLink = (usuario) => {

        return `https://encuestas-app-6ec15.web.app/encuesta/start/${encuesta._id}/${usuario._id}`
    }

    const enviarEncuesta = async (usuario) => {

        loadingAlert({ html: 'Enviando correo.....' })


        const enviarCorreo = await fetchAPI({
            endpoint: 'encuesta/enviar',
            method: 'POST',
            data: {
                encuesta: encuesta,
                usuario: usuario
            }
        })

        const resp = await enviarCorreo.json();

        if (!resp.ok) {
            closeLoadingAlert();
            alertError({ text: resp.msg });
        }

        alertSuccess({ title: "correo enviado correctamente" })

    }

    const handleCopiar = (usuario) => {

        let datos = `
            nombre: ${usuario.nombre}
            email: ${usuario.email}
            link: https://encuestas-app-6ec15.web.app/encuesta/start/${encuesta._id}/${usuario._id}
            encuesta: ${encuesta.nombre}
        `

        copy(datos)

        alertSuccess({ title: "Copiado " })
    }







    return (

        <>

            <Search handleOnBusqueda={handleOnBusqueda} busqueda={busqueda} />



            {

                isLoading ?

                    <Loading />

                    :

                    usuarios.length === 0 ?

                        <Alert variant="info" >
                            No hay resultados

                        </Alert>

                        :


                        <Table striped bordered hover size='sm' responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>email</th>
                                    <th>area</th>
                                    <th>sucursal</th>
                                    <th>contestada</th>
                                    <th> link </th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usuarios.map((usuario, i) => {



                                        return <tr key={usuario._id}>
                                            <td>{ paginacion.pagingCounter + i }</td>
                                            <td>{usuario.nombre} </td>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.area}</td>
                                            <td>{usuario.sucursal}</td>


                                            <td> {isEncuestaContestada(usuario)} </td>

                                            {

                                                isEncuestaAsignada(usuario) ?

                                                    <td> Si </td>

                                                    :
                                                    <td> Falta asignar </td>


                                            }



                                            {

                                                isEncuestaAsignada(usuario) ?

                                                    <>
                                                        <td>
                                                            <Button
                                                                variant="success"
                                                                size='sm'
                                                                className='mx-1'
                                                                onClick={() => enviarEncuesta(usuario)}
                                                            >
                                                                enviar
                                                            </Button>
                                                            <Button
                                                                variant="info"
                                                                size='sm'

                                                                onClick={() => handleCopiar(usuario)}
                                                            >
                                                                copiar
                                                            </Button>

                                                        </td>



                                                    </>





                                                    :


                                                    <td>
                                                        <Button
                                                            variant="primary"
                                                            size='sm'
                                                            onClick={() => handleAsignar(usuario, i)}
                                                            disabled={isLoading}

                                                        >
                                                            {isLoading ? 'Loading…' : 'Asignar'}
                                                        </Button>
                                                    </td>


                                            }


                                        </tr>

                                    })
                                }

                            </tbody>
                        </Table>


            }

            <Paginacion {...paginacion} setPaginacion={setPaginacion} />

        </>

    )
}

export default AsignarEncuesta