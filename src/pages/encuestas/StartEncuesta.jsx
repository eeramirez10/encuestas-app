import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../../helpers/fetch';
import Card from 'react-bootstrap/Card';

import Button from 'react-bootstrap/Button';
import './StartEncuesta.css'
import { useLocation } from "wouter";
import ListOfOptions from '../../components/opciones/ListOfOptions';

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

    const [location, setLocation] = useLocation();
    const { idEncuesta, idUsuario } = params;




    const [current, setCurrent] = useState(0);
    const [encuesta, setEncuesta] = useState(INITIAL_STATE)
    const [length, setLength] = useState(0)
    const [activeIndex, setActiveIndex] = useState(null)

    const [formTextarea, setFormTextarea] = useState({ descripcion: "" })
    const [preguntas, setPreguntas] = useState([])

    const [pregunta, setPregunta] = useState(pregunta_initial_state)

    const [currentUser, setCurrentUser] = useState({})


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

    }, [setEncuesta])



    const prevPregunta = () => {

        setCurrent(current === 0 ? length - 1 : current - 1)
    }

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


    }

    const sendRespuestas = async () => {


        console.log(preguntas)


        const body = await fetchAPI({ endpoint: 'encuesta/submit', method: 'POST', data: { idUsuario: currentUser._id, idEncuesta, preguntas } })

        const resp = await body.json();

        if (resp.ok) {

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

    if (current === length) {


    }

    







    return (

        <>
            <h2> {encuesta.nombre} </h2>


            {

                current === length ?

                    <Card className='my-3' >
                        <Card.Body>
                            <Card.Title>
                                <div className='d-flex'>
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
                    encuesta.preguntas.map((p, i) => (
                        <div key={i}>

                            {
                                i === current && (
                                    <Card className='my-3' >
                                        <Card.Body>
                                            <Card.Title>
                                                <div className='d-flex'>
                                                    <div className='flex-grow-1'> {p.descripcion}  </div>
                                                    <div>
                                                        {i + 1} de {length} preguntas
                                                    </div>
                                                </div>
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





                                        <Card.Body className=''>
                                            {/* <Button
                                            variant="primary"
                                            className='mx-2'
                                            onClick={prevPregunta}
                                        >
                                            Anterior
                                        </Button> */}

                                            <Button
                                                variant="primary"
                                                onClick={nextPregunta}
                                                disabled={activeIndex === null}

                                            >
                                                Siguente
                                            </Button>

                                            {/* {
                                            current !== length - 1 ?

                                                <Button
                                                    variant="primary"
                                                    onClick={nextPregunta}
                                                    disabled={activeIndex === null}
                                                >
                                                    Siguente
                                                </Button>

                                                :

                                                <Button
                                                    variant="primary"
                                                    onClick={sendRespuestas}
                                                >
                                                    Enviar respuestas
                                                </Button>

                                        } */}

                                        </Card.Body>
                                    </Card>
                                )
                            }

                        </div>





                    ))



            }



        </>


    )
}

export default StartEncuesta