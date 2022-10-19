import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'wouter';
import { alertError, alertSuccess, closeLoadingAlert, loadingAlert } from '../../helpers/alerts';
import { fetchAPI } from '../../helpers/fetch';

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

                    setUsuarios(resp.usuarios)
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

                setUsuarios(resp.usuarios)


            })

    }

    const isEncuestaAsignada = (usuario) => {

        return usuario.encuestas.some(en => en.encuesta === encuesta._id);

    }

    const enviarEncuesta = async (usuario) => {

        loadingAlert({ html:'Enviando correo.....' })


        const enviarCorreo = await fetchAPI({
            endpoint: 'encuesta/enviar',
            method: 'POST',
            data: {
                encuesta:encuesta,
                usuario: usuario
            }
        })

        const resp = await enviarCorreo.json();

        if( !resp.ok){
            closeLoadingAlert();
            alertError({ text: resp.msg});
        }

        alertSuccess({title:"correo enviado correctamente"})

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
                    <Modal.Title>Asignar Encuesta</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    


                    <Table striped bordered hover size='sm' responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usuarios.map((usuario, i) => {



                                    return <tr key={usuario._id}>
                                        <td>{i + 1}</td>
                                        <td>{usuario.nombre} </td>
                                        <td>{usuario.email}</td>

                                        {

                                            isEncuestaAsignada(usuario) ?

                                                <td>
                                                    <Button
                                                        variant="success"
                                                        size='sm'

                                                        onClick={() => enviarEncuesta(usuario)}
                                                    >
                                                        enviar email
                                                    </Button>
                                                </td>

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
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AsignarEncuesta