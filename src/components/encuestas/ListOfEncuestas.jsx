import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'wouter'

const ListOfEncuestas = ({ encuestas }) => {
    return (
        <>

            {
                encuestas.map((encuesta) =>

                    <Card
                        bg={'primary'}
                        key={encuesta._id}
                        text={'white'}
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>{encuesta.nombre} </Card.Header>
                        <Card.Body>
                            {/* <Card.Title> {encuesta.nombre} </Card.Title> */}
                            <Card.Text>
                                {encuesta.descripcion}
                            </Card.Text>

                            {
                                encuesta.preguntas.length === 0
                                    ?
                                    <Button variant="warning" >

                                        <Link to={`/encuesta/add/${encuesta._id}`}>
                                            Agregar preguntas
                                        </Link>

                                    </Button>

                                    :
                                    <>
                                        <Button variant="warning" >

                                            <Link to={`/encuesta/add/${encuesta._id}`}>
                                                Agregar preguntas
                                            </Link>

                                        </Button>
                                        <Button variant="primary" className='m-2'>Editar</Button>
                                        <Button variant="danger">Eliminar</Button>

                                        <Button  variant="success">
                                            <Link to={`/encuesta/start/${encuesta._id}/null`} > Iniciar Encuesta </Link>
                                            
                                        </Button>

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