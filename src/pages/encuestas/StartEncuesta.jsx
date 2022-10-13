import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../../helpers/fetch';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import './StartEncuesta.css'
import { useLocation } from "wouter";
import ListOfOptions from '../../components/opciones/ListOfOptions';
import { alertError, closeLoadingAlert, loadingAlert } from '../../helpers/alerts';

const INITIAL_STATE = {
    descripcion: '',
    nombre: '',
    date: '',
    preguntas: [
        {
            descripcion: '',
            opciones: []
        }
    ]

}

const pregunta_initial_state = {
    _id: '',
    opcion: {
        descripcion: '',
        type: ""
    }
}

const StartEncuesta = ({ params }) => {

    const [, setLocation] = useLocation();
    const { idEncuesta, idUsuario } = params;




    const [current, setCurrent] = useState(0);
    const [encuesta, setEncuesta] = useState(INITIAL_STATE)
    const [length, setLength] = useState(null)
    const [activeIndex, setActiveIndex] = useState(null)
    const [preguntas, setPreguntas] = useState([])

    const [pregunta, setPregunta] = useState(pregunta_initial_state)

    const [currentUser, setCurrentUser] = useState({})

    const [IstextareaEmpty, setIsTextareaEmpty] = useState(true)



    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController()

        fetchAPI({
            endpoint: `encuesta/${idEncuesta}`,
            method: 'GET',
            signal: controller.signal

        })
            .then(async (encuestas) => {
                const resp = await encuestas.json()

                isMounted && setEncuesta(resp.data);
                setLength(resp.data.preguntas.length)
            })

        if (idUsuario !== 'null') {

            fetchAPI({
                endpoint: `usuarios/${idUsuario}`,
                method: 'GET'
            })
                .then(async (usuario) => {
                    const resp = await usuario.json()
                    setCurrentUser(resp.usuario)
                })
        }

        return () => {
            isMounted = false;
            controller.abort()
        }

    }, [setEncuesta, idEncuesta, idUsuario])



    // const prevPregunta = () => {

    //     setCurrent(current === 0 ? length - 1 : current - 1)
    // }

    const nextPregunta = () => {

        setPreguntas([...preguntas, pregunta])

        setPregunta(pregunta_initial_state)

        setCurrent(current === length ? 0 : current + 1);

        setActiveIndex(null)

    }

    const handleOnCLickOpcion = (opcion, index) => {



        const option = { ...opcion }

        console.log(option)

        option.valor = 1

        const idPregunta = encuesta.preguntas[current]._id;

        setPregunta({ _id: idPregunta, opcion: option });


        setActiveIndex(index)


    }

    const handleOnchange = (e) => {


        const Pregunta = encuesta.preguntas[current];

        setIsTextareaEmpty(!e.target.value)

        setPregunta({
            _id: Pregunta._id,
            opcion: {
                ...Pregunta.opciones[0],
                [e.target.name]: e.target.value,
                type: "textarea"
            }
        })


    }

    const handleOnBlur = () => {

        console.log('onblur')
        setActiveIndex(0)

    }

    const sendRespuestas = async () => {


        loadingAlert({})


        const body = await fetchAPI({ endpoint: 'encuesta/submit', method: 'POST', data: { idUsuario: currentUser._id, idEncuesta, preguntas } })

        const resp = await body.json();

        if (!resp.ok) {

            return alertError()
        }

        if (resp.ok) {

            closeLoadingAlert()

            return setLocation('/encuesta/finish')
        }

    }




    const isEncuestaContestada = () => {

        return currentUser.encuestas?.some(encuesta => encuesta.contestada === true)
    }

    const fechaContestada = () => {
        return currentUser.encuestas.map(encuesta => encuesta.dateContestada)
    }



    if (isEncuestaContestada()) {

        return (

            <>

                <div className="alert alert-warning" role="alert">

                    <h2> Esta encuesta ya fue contestada el {fechaContestada()} </h2>

                </div>
            </>
        )

    }


    console.log(IstextareaEmpty)







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

                        <Card.Body  >

                            <Row>
                                <Col md={6} sm={12} >

                                    <div className="text-center mt-4">

                                        <img
                                            src="/img/logo-tuvansa.png" alt="..." />
                                    </div>
                                </Col>
                                <Col md={6} sm={12} className="text-center mt-4">

                                    <h3> {encuesta.nombre} </h3>
                                    <p> <strong>{encuesta.descripcion}</strong>  </p>

                                </Col>

                            </Row>


                        </Card.Body>

                        <hr />

                        {
                            encuesta.preguntas.map((p, i) => (
                                <div key={i}>

                                    {
                                        i === current && (

                                            <>


                                                <Card.Body>
                                                    <Card.Title>
                                                        <div> {p.descripcion}  </div>

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