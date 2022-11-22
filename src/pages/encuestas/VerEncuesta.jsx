import React from 'react'
import { useEncuesta } from '../../hooks/useEncuesta';
import './StartEncuesta.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListOfOptions from '../../components/opciones/ListOfOptions';
import HeaderEncuesta from '../../components/encuestas/HeaderEncuesta';
import { Form } from 'react-bootstrap';

const VerEncuesta = ({ params }) => {



    const { idEncuesta } = params;

    const { encuesta, current, nextPregunta, pregunta, handleOnchange, handleOnCLickOpcion, handleOnBlur, activeIndex, length, prevPregunta } = useEncuesta({ idEncuesta, idUsuario: null });




    return (
        <>

            <Card  >

                <HeaderEncuesta
                    title={encuesta.nombre}
                    descripcion={encuesta.descripcion}
                />



                <hr />


                {
                    encuesta.preguntas.map((p, i) => {

                        return <div key={i}>

                            {
                                i === current && (

                                    <>

                                        <Card.Body style={{ paddingBottom: 'px', paddingTop: '0px' }}>
                                            <Card.Title >
                                                {p.descripcion}

                                            </Card.Title>
                                        </Card.Body>

                                        {

                                            p.type === "comentario" ?


                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Escriba su respuesta"
                                                    name="descripcion"
                                                    value={pregunta.opcion.descripcion}
                                                    onChange={(e) => handleOnchange(e)}



                                                />
                                                :

                                                <ListOfOptions
                                                    opciones={p.opciones}
                                                    handleOnCLickOpcion={handleOnCLickOpcion}
                                                    handleOnchange={handleOnchange}
                                                    handleOnBlur={handleOnBlur}
                                                    activeIndex={activeIndex}
                                                    pregunta={pregunta}
                                                />
                                        }





                                    </>

                                )
                            }

                        </div>
                    })
                }


                <Card.Body className=''>

                    <div className='d-flex'>
                        <Button
                            variant="primary"
                            className='me-auto'
                            onClick={prevPregunta}

                        >
                            Anterior
                        </Button>
                        <Button
                            variant="primary"
                            className='me-auto'
                            onClick={nextPregunta}

                        >
                            Siguente
                        </Button>
                        <div >
                            <strong>{current + 1} de {length} preguntas</strong>
                        </div>
                    </div>


                </Card.Body>




            </Card>

        </>
    )
}

export default VerEncuesta