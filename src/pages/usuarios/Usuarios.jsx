import React from 'react'
import { useEffect, useState } from 'react'
import { TableUsers } from '../../components/users/TableUsers'
import { fetchAPI } from '../../helpers/fetch'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import CreateUser from '../../components/users/CreateUser';

import Paginacion from '../../components/pagination/Paginacion';





const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([])
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchAPI({ endpoint: "usuarios", method: "GET" })
            .then(async (resp) => {
                const body = await resp.json();

                console.log(body)

                if (!body.ok) return console.log('Hubo un error')

                setUsuarios(body.usuarios.docs)

            })
    }, [setUsuarios])

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => {
        setShow(true)
    }


    return (
        <>
            <Card>


                <Card.Body>


                    <Card.Title className='d-flex'>
                        <div className="p-2 flex-grow-1">Usuarios</div>
                        <div className="p-2">
                            <Button
                                onClick={handleShow}
                            >
                                Nuevo
                            </Button>
                        </div>

                    </Card.Title>


                    <TableUsers usuarios={usuarios} />

                    <Paginacion />

                </Card.Body>

            </Card>

            <CreateUser show={show} handleClose={handleClose} />

        </>



    )
}

export default Usuarios
