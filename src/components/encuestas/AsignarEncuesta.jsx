import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'wouter';
import { alertError, alertSuccess, closeLoadingAlert, loadingAlert } from '../../helpers/alerts';
import { fetchAPI } from '../../helpers/fetch';
import copy from 'copy-to-clipboard';

const AsignarEncuesta = ({ show, handleClose, encuesta }) => {

    const [usuarios, setUsuarios] = useState([]);

    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {

        setIsLoading(true)

        if (show) {

            fetchAPI({
                endpoint: 'usuarios',
                method: 'GET'
            })
                .then(async (usuarios) => {
                    const resp = await usuarios.json();

                    setUsuarios(resp.usuarios.docs)
                    setIsLoading(false)

                })

        }


    }, [show, setUsuarios])

    const handleAsignar = async (usuario, i) => {

        setIsLoading(true)


        const asignar = await fetchAPI({
            endpoint: 'encuesta/asignar',
            method: 'POST',
            data: {
                idEncuesta: encuesta._id,
                idUsuario: usuario._id
            }
        })

        const resp = await asignar.json();



        setIsLoading(false)


        fetchAPI({
            endpoint: 'usuarios',
            method: 'GET'
        })
            .then(async (usuarios) => {
                const resp = await usuarios.json();

                setUsuarios(resp.usuarios.docs)


            })

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

        copy( datos )

        alertSuccess({ title: "Copiado " })
    }

    

    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
                centered

            >
                <Modal.Header closeButton>
                    <Modal.Title>Asignar Encuesta {encuesta.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>




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
                                        <td>{i + 1}</td>
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
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AsignarEncuesta