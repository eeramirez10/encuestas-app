import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useLocation } from 'wouter';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import AsignarEncuesta from './AsignarEncuesta';


const ListOfEncuestas = ({ encuestas }) => {
    const [ , setLocation] = useLocation();

    const [show, setShow] = useState(false);
    const [encuesta, setEncuesta] = useState({})

    const handleClose = () => {
        setShow(false)

    };
    const handleShow = (encuesta) =>{ 
        setShow(true)
        setEncuesta(encuesta)
    };

    const handleClick = (path) => {
        setLocation(path)
    }


    return (
        <>

            {
                encuestas.map((encuesta) =>

                    <Card
                        border={'primary'}
                        key={encuesta._id}

                        style={{ width: '20rem' }}
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

                            {
                                encuesta.preguntas.length === 0
                                    ?



                                    <Button
                                        variant="warning"
                                        onClick={() => handleClick(`/encuesta/add/${encuesta._id}`)}
                                    >
                                        Agregar preguntas
                                    </Button>



                                    :
                                    <>
                                        <ButtonToolbar  aria-label="Toolbar with Button groups">
                                            <ButtonGroup size="sm" className="mb-2">

                                                <Button
                                                    variant="warning"
                                                    onClick={() => handleClick(`/encuesta/add/${encuesta._id}`)}
                                                >
                                                    Agregar preguntas
                                                </Button>


                                                <Button
                                                    variant="success"
                                                    onClick={() => handleClick(`/encuesta/start/${encuesta._id}/null`)}
                                                >
                                                    Iniciar Encuesta

                                                </Button>


                                            </ButtonGroup>

                                        </ButtonToolbar>

                                        <ButtonToolbar aria-label="Toolbar with Button groups">
                                            <ButtonGroup size="sm" className="mb-2">
                                                <Button variant="primary" >Editar</Button>
                                                <Button variant="danger">Eliminar</Button>
                                            </ButtonGroup>

                                        </ButtonToolbar>

                                        <ButtonGroup size="sm" className="mb-2">
                                            <Button
                                                variant="success"
                                                onClick={()=> handleShow(encuesta)}
                                            >
                                                Asignar Encuesta

                                            </Button>

                                        </ButtonGroup>



                                    </>



                            }



                        </Card.Body>
                    </Card>

                )

               
                   

            }

            <AsignarEncuesta 
                show={show} 
                handleClose={ handleClose} 
                handleShow ={ handleShow} 
                encuesta={ encuesta}
            />

            

        </>

       




    )
}

export default ListOfEncuestas