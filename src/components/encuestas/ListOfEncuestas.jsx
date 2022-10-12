import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useLocation } from 'wouter';

const ListOfEncuestas = ({ encuestas, params }) => {
    const [location, setLocation] = useLocation();

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

                                    <Button>

                                    </Button>

                                    // <Link  to={`/encuesta/add/${encuesta._id}`}>
                                    //     Agregar preguntas
                                    // </Link>



                                    :
                                    <>

                                        <ButtonGroup size="sm" className="mb-2">

                                            <Button
                                                variant="warning"
                                                onClick={() => handleClick(`/encuesta/add/${encuesta._id}`)}
                                            >
                                                Agregar preguntas
                                            </Button>
                                            <Button variant="primary" >Editar</Button>
                                            <Button variant="danger">Eliminar</Button>

                                            <Button
                                                variant="success"
                                                onClick={() => handleClick(`/encuesta/start/${encuesta._id}/null`)}
                                            >
                                                Iniciar Encuesta

                                            </Button>


                                        </ButtonGroup>
                                    


                                    </>



                            }



                        </Card.Body>
                    </Card>

                )


            }

        </>




    )
}

export default ListOfEncuestas