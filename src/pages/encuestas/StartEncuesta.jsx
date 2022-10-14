import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './StartEncuesta.css'
import ListOfOptions from '../../components/opciones/ListOfOptions';
import HeaderEncuesta from '../../components/encuestas/HeaderEncuesta';
import { useEncuesta } from '../../hooks/useEncuesta';


const StartEncuesta = ({ params }) => {

    const {
        nextPregunta,
        fechaContestada,
        isEncuestaContestada,
        sendRespuestas,
        handleOnBlur,
        handleOnchange,
        handleOnCLickOpcion,
        current,
        encuesta,
        length,
        activeIndex,
        pregunta,
        IstextareaEmpty
    } = useEncuesta({ params})



    if (isEncuestaContestada()) {

        return (

            <>

                <div className="alert alert-warning" role="alert">

                    <h2> Esta encuesta ya fue contestada el {fechaContestada()} </h2>

                </div>
            </>
        )

    }




    return (

        <>





            {

                current === length ?

                    <Card  >
                        <Card.Body>
                            <Card.Title>
                                <div className='text-center'>
                                    <div className='flex-grow-1'> Da click en en terminar para guardar tus respuestas  </div>

                                </div>
                            </Card.Title>
                        </Card.Body>


                        <Card.Body className=''>


                            <Button
                                variant="success"
                                onClick={sendRespuestas}
                            >
                                Terminar encuesta
                            </Button>


                        </Card.Body>
                    </Card>

                    :

                    <Card  >

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

                                                <Card.Body style={{ paddingBottom:'px', paddingTop:'0px' }}>
                                                    <Card.Title >
                                                        {p.descripcion}  

                                                    </Card.Title>
                                                </Card.Body>


                                                <ListOfOptions
                                                    opciones={p.opciones}
                                                    handleOnCLickOpcion={handleOnCLickOpcion}
                                                    handleOnchange={handleOnchange}
                                                    handleOnBlur={handleOnBlur}
                                                    activeIndex={activeIndex}
                                                    pregunta={pregunta}
                                                />

                                            </>

                                        )
                                    }

                                </div>
                            ))
                        }


                        <Card.Body className=''>

                            <div className='d-flex'>
                                <Button
                                    variant="primary"
                                    className='me-auto'
                                    onClick={nextPregunta}
                                    disabled={activeIndex === null && IstextareaEmpty}

                                >
                                    Siguente
                                </Button>
                                <div >
                                    <strong>{current + 1} de {length} preguntas</strong>
                                </div>
                            </div>


                        </Card.Body>




                    </Card>












            }



        </>


    )
}

export default StartEncuesta