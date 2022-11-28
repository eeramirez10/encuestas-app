import React from 'react'
import { useState } from 'react'
import { TableUsers } from '../../components/users/TableUsers'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import CreateUser from '../../components/users/CreateUser';

import Paginacion from '../../components/pagination/Paginacion';
import { useTable } from '../../hooks/useTable';





const Usuarios = () => {


    const [show, setShow] = useState(false);
    const { rows: usuarios, paginacion, setPaginacion } = useTable("usuarios");




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


                    <TableUsers usuarios={usuarios} pagingCounter={paginacion.pagingCounter}  />

                    <Paginacion {...paginacion} setPaginacion={setPaginacion} />



                </Card.Body>

            </Card>

            <CreateUser show={show} handleClose={handleClose} />

        </>



    )
}

export default Usuarios
