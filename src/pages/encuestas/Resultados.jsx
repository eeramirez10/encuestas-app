import React from 'react'
import { Button, Card } from 'react-bootstrap';
import HeaderEncuesta from '../../components/encuestas/HeaderEncuesta';
import ListOfResults from '../../components/opciones/ListOfResults';
import { useEncuesta } from '../../hooks/useEncuesta';

const Resultados = ({ params }) => {



    const { encuesta, current, nextPregunta, prevPregunta, length, } = useEncuesta({ params })


    console.log(encuesta)

    return (
        <Card style={{ width:'100%' }} >

            <HeaderEncuesta
                title={encuesta.nombre}
                descripcion={encuesta.descripcion}
            />

            <hr />

            {
                encuesta.preguntas.map((p, i) => (
                    <div key={i}>

                        {
                            i === current && (

                                <>

                                    <Card.Body style={{ paddingBottom: 'px', paddingTop: '0px' }}>
                                        <Card.Title >
                                            {p.descripcion}

                                        </Card.Title>
                                    </Card.Body>

                                    


                                    <ListOfResults
                                        opciones={p.opciones}
                                        isComentario = {  p.type === "comentario" }

                                    />

                                </>

                            )
                        }

                    </div>
                ))
            }


            <Card.Body className=''>

                <div className='d-flex'>
            
                    <div className='me-auto'>

                        <Button
                            variant="primary"
                            className='me-auto'
                            onClick={prevPregunta}
                        >
                            Anterior
                        </Button>

                        <Button
                            variant="primary"
                            
                            onClick={nextPregunta}

                        >
                            Siguente
                        </Button>

                    </div>
                    <div >
                        <strong>{current + 1} de {length} preguntas</strong>
                    </div>
                </div>


            </Card.Body>




        </Card>

    )
}

export default Resultados