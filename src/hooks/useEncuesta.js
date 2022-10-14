
import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../helpers/fetch';
import { alertError, closeLoadingAlert, loadingAlert } from '../helpers/alerts';
import { useLocation } from "wouter";



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

export const useEncuesta = ({ params }) => {

    const { idEncuesta, idUsuario} = params

    const [, setLocation] = useLocation();

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

        if (idUsuario !== 'null' || !idUsuario) {

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


    return {
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
        preguntas,
        pregunta,
        IstextareaEmpty

    }
}
