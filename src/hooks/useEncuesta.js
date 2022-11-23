
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

    const [, setLocation] = useLocation();

    const [current, setCurrent] = useState(0);
    const [encuesta, setEncuesta] = useState(INITIAL_STATE)
    const [length, setLength] = useState(0)
    const [activeIndex, setActiveIndex] = useState(null)
    const [preguntas, setPreguntas] = useState([])

    const [pregunta, setPregunta] = useState(pregunta_initial_state)

    const [currentUser, setCurrentUser] = useState({})

    const [IstextareaEmpty, setIsTextareaEmpty] = useState(true);

    const [isEncuestaContestada, setIsEncuestaContestada] = useState(true)

    const [isLoading, setIsLoading] = useState(true);

    const [isEncuestaAsignada, setIsEncuestaAsignada] = useState(false);



    useEffect(() => {

        let isMounted = true;

        setIsLoading(true)
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

        if (!idUsuario === "null" || idUsuario) {

            fetchAPI({
                endpoint: `usuarios/${idUsuario}`,
                method: 'GET'
            })
                .then(async (resp) => {


                    const { usuario } = await resp.json();

                    setIsEncuestaAsignada(usuario.encuestas?.some(user => user.encuesta === idEncuesta))

                    setIsEncuestaContestada(usuario.encuestas?.some(user => user.encuesta === idEncuesta && user.contestada))
                    setCurrentUser(usuario);

                    setIsLoading(false)

                })
        }

        return () => {
            isMounted = false;
            controller.abort()
        }

    }, [setEncuesta, idEncuesta, idUsuario])

    useEffect(() => {



        if (pregunta._id) {

            if (pregunta.type !== "comentario") {

                setPreguntas([...preguntas, pregunta])
            }



            setPregunta(pregunta_initial_state)

            setActiveIndex(null)



        }


    }, [current]);




    const handleSubmit = () => {



        sendRespuestas()
    }


    const nextPreguntaStart = () => {
        setCurrent(current + 1);
    }

    const nextPregunta = () => {

        // setPreguntas([...preguntas, pregunta])

        // setPregunta(pregunta_initial_state)


        // setActiveIndex(null)

        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    const prevPregunta = () => {

        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    const handleOnCLickOpcion = (opcion, index) => {



        const option = { ...opcion }



        option.valor = 1

        const Pregunta = encuesta.preguntas[current];

        setPregunta({ ...Pregunta, opcion: option });


        setActiveIndex(index)


    }

    const handleOnchange = (e) => {


        let Pregunta = encuesta.preguntas[current];


        setIsTextareaEmpty(!e.target.value)

        console.log(Pregunta)

        setPregunta({
            ...Pregunta,
            opcion: {
                ...Pregunta.opciones[0],
                [e.target.name]: e.target.value,
                type: "textarea",
                valor: 1
            }
        })


        if (!preguntas[current]) {


            setPreguntas([...preguntas, {
                ...Pregunta,
                opcion: {
                    ...Pregunta.opciones[0],
                    [e.target.name]: e.target.value,
                    type: "textarea",
                    valor: 1
                }
            }])

            setPregunta(pregunta_initial_state)

        }

        preguntas[current] = {

            ...Pregunta,
            opcion: {
                ...Pregunta.opciones[0],
                [e.target.name]: e.target.value,
                type: "textarea",
                valor: 1
            }

        }

        console.log(preguntas)

    }







    const sendRespuestas = async () => {

        console.log(preguntas)


        loadingAlert({});


        try {


            const body = await fetchAPI({ endpoint: 'encuesta/submit', method: 'POST', data: { idUsuario: currentUser._id, idEncuesta, preguntas } })

            const resp = await body.json();

            if (!resp.ok) {

                return alertError()
            }

            closeLoadingAlert()

            return setLocation('/encuesta/finish')

        } catch (error) {
            return alertError({ text: "Hubo un error" })
        }


    }




    // const isEncuestaContestada = () => {

    //     return currentUser.encuestas?.some(user => user.encuesta === idEncuesta && user.contestada )


    // }

    const fechaContestada = () => {

        // const [encuesta] = currentUser.encuestas.filter(user => user.encuesta === idEncuesta)

        return 'encuesta.dateContestada'
    }


    return {
        nextPregunta,
        prevPregunta,
        fechaContestada,
        isEncuestaContestada,
        sendRespuestas,

        handleOnchange,
        handleOnCLickOpcion,
        handleSubmit,
        nextPreguntaStart,
        current,
        encuesta,
        length,
        activeIndex,
        preguntas,
        pregunta,
        IstextareaEmpty,
        isLoading,
        isEncuestaAsignada

    }
}
