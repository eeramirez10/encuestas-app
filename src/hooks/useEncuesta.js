
import { useEffect, useState } from 'react'
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
            type: '',
            opciones: []
        }
    ]

}

const pregunta_initial_state = {
    _id: '',
    type: "",
    opcion: {
        descripcion: '',
        type: ""
    }
}

export const useEncuesta = ({ idEncuesta, idUsuario }) => {

    
    console.log({ idEncuesta, idUsuario })
    
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
                setLength(resp.data.preguntas.length )
            })

        if (!idUsuario === "null" || idUsuario ) {

            fetchAPI({
                endpoint: `usuarios/${idUsuario}`,
                method: 'GET'
            })
                .then(async (usuario) => {
                    const resp = await usuario.json()

                    console.log(resp)
                    setCurrentUser(resp.usuario)
                })
        }

        return () => {
            isMounted = false;
            controller.abort()
        }

    }, [setEncuesta, idEncuesta, idUsuario])


    const prevPregunta = () => {

        setCurrent(current === 0 ? length  : current - 1)
    }

    const nextPregunta = () => {

        setPreguntas([...preguntas, pregunta])

        setPregunta(pregunta_initial_state)

        setCurrent(current === length  ? 0 : current + 1);

        setActiveIndex(null)

    }

    const handleOnCLickOpcion = (opcion, index) => {



        const option = { ...opcion }



        option.valor = 1

        const Pregunta = encuesta.preguntas[current];

        setPregunta({ ...Pregunta, opcion: option });


        setActiveIndex(index)


    }

    const handleOnchange = (e) => {


        const Pregunta = encuesta.preguntas[current];

        setIsTextareaEmpty(!e.target.value)

        setPregunta({
            ...Pregunta,
            opcion: {
                ...Pregunta.opciones[0],
                [e.target.name]: e.target.value,
                type: "textarea",
                valor: 1
            }
        })


    }

    const handleOnBlur = () => {


        setActiveIndex(0)

    }

    const sendRespuestas = async () => {


        loadingAlert({})

        try {


            const body = await fetchAPI({ endpoint: 'encuesta/submit', method: 'POST', data: { idUsuario: currentUser._id, idEncuesta, preguntas } })

            const resp = await body.json();

            if (!resp.ok) {

                return alertError()
            }

            closeLoadingAlert()

            return setLocation('/encuesta/finish')

        } catch (error) {
            return alertError({text:"Hubo un error"})
        }


    }




    const isEncuestaContestada = () => {

        console.log(currentUser)

        return currentUser.encuestas?.some(encuesta => encuesta.contestada === true)
    }

    const fechaContestada = () => {
        return currentUser.encuestas.map(encuesta => encuesta.dateContestada)
    }


    return {
        nextPregunta,
        prevPregunta,
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
