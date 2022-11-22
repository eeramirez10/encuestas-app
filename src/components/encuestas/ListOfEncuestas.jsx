import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { useLocation } from 'wouter';
import AsignarEncuesta from './AsignarEncuesta';
import { Col, Row } from 'react-bootstrap';
import ModalComponent from '../modals/ModalComponent';
import { useModal } from '../../hooks/useModal';



const ListOfEncuestas = ({ encuestas }) => {

    const { handleShow } = useModal();

    const [, setLocation] = useLocation();

    const [encuesta, setEncuesta] = useState({})


    const handleEncuesta = (encuesta) => {

        setEncuesta(encuesta)
    }



    const handleClick = (path) => {
        setLocation(path)
    }

    if (!Array.isArray(encuestas) || !encuestas.length) {

        return (
            <h2> No hay encuestas </h2>
        )
    }


    return (
        <>

            <Row xs={1} md={3} xl={4} className="g-4" >

                {encuestas.map((encuesta) =>
                    <Col key={encuesta._id} >
                        <Card
                            border={'secondary'}
                            className="mb-2"
                        >
                            <Card.Header>{encuesta.nombre} </Card.Header>
                            <Card.Body>
                                {/* <Card.Title> {encuesta.nombre} </Card.Title> */}
                                <Card.Text>
                                    {encuesta.descripcion}
                                </Card.Text>

                            </Card.Body>
                            <Card.Body>


                                <Button
                                    variant="warning"
                                    className='my-2'
                                    onClick={() => handleClick(`/encuesta/add/${encuesta._id}`)}
                                >
                                    Agregar preguntas
                                </Button>


                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Acciones
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        <Dropdown.Item onClick={() => handleClick(`/encuesta/resultados/${encuesta._id}`)} >
                                            Resultados
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleEncuesta(encuesta)
                                            handleShow();
                                        }}
                                        >Asignar</Dropdown.Item>


                                        <Dropdown.Item onClick={() => handleClick(`/encuesta/${encuesta._id}`)} >Ver</Dropdown.Item>

                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={() => handleClick(`/encuesta/edit/${encuesta._id}`)} >Editar</Dropdown.Item>
                                        <Dropdown.Item >Eliminar</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Body>
                        </Card>
                    </Col>
                )}


            </Row>

            <ModalComponent
                title={encuesta.nombre}
                children={<AsignarEncuesta encuesta={encuesta} />}
            />





        </>






    )
}

export default ListOfEncuestas