import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './StartEncuesta.css'
import ListOfOptions from '../../components/opciones/ListOfOptions';
import HeaderEncuesta from '../../components/encuestas/HeaderEncuesta';
import { useEncuesta } from '../../hooks/useEncuesta';
import { Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

import Loading from '../../components/UI/Loading';



const StartEncuesta = ({ params }) => {

    const { idEncuesta, idUsuario } = params;

    const {
        nextPregunta,
        fechaContestada,
        handleSubmit,
        isEncuestaContestada,
        sendRespuestas,
        handleOnBlur,
        handleOnchange,
        handleOnCLickOpcion,
        nextPreguntaStart,
        current,
        encuesta,
        length,
        activeIndex,
        pregunta,
        IstextareaEmpty,
        isLoading,
        isEncuestaAsignada
        // {nombre:"Antonio Salazar"}
    } = useEncuesta({ idEncuesta, idUsuario })




    useEffect(() => {








        if (!isEncuestaContestada && isEncuestaAsignada) {
            Swal.fire({
                title: '<strong>Informacion</strong>',
                icon: 'info',
                html: `
                    <p>
                        Lea con atencion las preguntas y respuestas, 
                        al dar siguiente imposibilitara regresar a la pregunta anterior.
                    </p>
         
                    <p>
                        El Objetivo de esta encuesta es encontrar areas de mejora en el funcionamiento de Tuvansa y en la satisfaccion de los profesionales que la componen.
                    </p>
    
                    <p>
                    <strong><u>Sus respuestas son absolutamente confidenciales y serán enviadas directamente a la Dirección General de TUVANSA</u></strong>
                    </p>
                    <p>
                        Se le pide contestar honestamente
                    </p>
                  
                    
    
    
                `,

                focusConfirm: true,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Entiendo!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                cancelButtonText:
                    '<i class="fa fa-thumbs-down"></i>',
                cancelButtonAriaLabel: 'Thumbs down',
                allowOutsideClick: false
            })


        }





    }, [isEncuestaContestada])



    if (!isEncuestaAsignada && !isLoading) {

        return <div className="alert alert-danger" role="alert">

            <h2> No tienes esta encuesta asignada </h2>

        </div>
    }



    if (isEncuestaContestada && !isLoading) {

        return (

            <>

                <div className="alert alert-warning" role="alert">

                    <h2> Esta encuesta ya fue contestada </h2>

                </div>
            </>
        )

    }






    return (

        <>


            {

                isLoading ?

                    <Loading />

                    :

                    current === (length ) ?

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
                            encuesta.preguntas.map((p, i) => {



                                return <div key={i}>

                                    {
                                        current === i && (

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
                                                            onChange={handleOnchange}

                                                        />
                                                        :

                                                        <ListOfOptions
                                                            opciones={p.opciones}
                                                            handleOnCLickOpcion={handleOnCLickOpcion}
                                                            handleOnchange={handleOnchange}
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

                            {
                                // current === (length - 1) ?

                                //     <Button
                                //         variant="success"
                                //         onClick={handleSubmit}
                                //     >
                                //         Terminar encuesta
                                //     </Button>

                                //     :

                                    <div className='d-flex'>
                                        <Button
                                            variant="primary"
                                            className='me-auto'
                                            onClick={nextPreguntaStart}

                                            disabled={activeIndex === null && IstextareaEmpty}

                                        >
                                            Siguente
                                        </Button>
                                        <div >
                                            <strong>{current + 1} de {length} preguntas</strong>
                                        </div>
                                    </div>

                            }



                        </Card.Body>




                    </Card>












            }



        </>


    )
}


const MensajeInicio = () => {

    return Swal.fire({
        title: '<strong>HTML <u>example</u></strong>',
        icon: 'info',
        html:
            'You can use <b>bold text</b>, ' +
            '<a href="//sweetalert2.github.io">links</a> ' +
            'and other HTML tags',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
    })
}

export default StartEncuesta