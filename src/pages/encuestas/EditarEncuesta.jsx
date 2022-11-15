import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import FormOpciones from '../../components/forms/FormOpciones';
import FormPregunta from '../../components/forms/FormPregunta';
import { alertError, alertSuccess } from '../../helpers/alerts';
import { fetchAPI } from '../../helpers/fetch';


const EditarEncuesta = ({ params }) => {
    const { idEncuesta } = params;

    const [validated, setValidated] = useState(false);
    const [encuesta, setEncuesta] = useState({
        _id: "",
        descripcion: "",
        nombre: "",
        preguntas: [{
            descripcion: "",
            opciones: [{
                descripcion: "",
                type: ""
            }]
        }],

    });

    const [current, setCurrent] = useState(0);

    const [inputPreguntas, setInputPreguntas] = useState({
        descripcion: '',
        type: "",
        opciones: [
            { descripcion: '', type: 'text' }
        ]
    });


    useEffect(() => {

        fetchAPI({ endpoint: `encuesta/${idEncuesta}`, method: 'GET' })
            .then(async (encuesta) => {
                const resp = await encuesta.json();

                setEncuesta({ ...resp.data })

                setInputPreguntas(resp.data.preguntas[0])

            })

    }, [idEncuesta]);

    useEffect(() => {
        console.log(current)
        setInputPreguntas(encuesta.preguntas[current])

    }, [current])

    const handleOnChange = (e, indexOpcion, propiedad) => {

        const { name, value } = e.target;

        const pregunta = { ...inputPreguntas };

        if (propiedad === 'opciones') {

            pregunta[propiedad][indexOpcion][name] = value

            return setInputPreguntas(pregunta);
        }

        pregunta[name] = value;
        setInputPreguntas(pregunta);

    }

    const handleRemove = (indexOpcion, propiedad) => {
        const pregunta = { ...inputPreguntas };
        if (propiedad === 'opciones') {

            pregunta[propiedad].splice(indexOpcion, 1);

            setInputPreguntas(pregunta)

            return
        }
        // list.splice(indexPregunta, 1);
        // setInputPreguntas(list)
    }

    const handleAddOpcion = (indiceOpcion, type) => {

        let pregunta = { ...inputPreguntas };


        if (type === "textarea") {

            pregunta.opciones.splice(0, indiceOpcion + 1)
            pregunta.type = "comentario"
        }

        if (type === "text") {

            if (pregunta.opciones[0].type === "textarea") {
                pregunta.opciones.splice(0, indiceOpcion + 1)
            }

            pregunta.type = "multiOpcion"

        }

        pregunta.opciones.push({ descripcion: '', type })

        setInputPreguntas(pregunta)
    }

    const handleNext = () => {

        setCurrent(current => current === encuesta.preguntas.length - 1 ? 0 : current + 1)

    }

    const handlePrev = () => {
        setCurrent(current => current === 0 ? encuesta.preguntas.length - 1 : current - 1)
    }



    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formIsValid = form.checkValidity()

        if (!formIsValid) {
            event.stopPropagation();
        }

        setValidated(true)


        if (!formIsValid) return


        try {


            const resp = await fetchAPI({ endpoint: 'preguntas', method: 'PUT', data: inputPreguntas });

            const body = await resp.json()

            if(!body.ok) return alertError({text:"hubo un error"});

            alertSuccess({title:"Actualizado correctamente"})

        } catch (error) {

            console.log(error);

            alertError({ text:"hubo un error"})

        }


    }


    return (
        <>
            <div className='d-flex my-3'>
                <h2 className="me-auto" >EDITAR Encuesta {encuesta?.nombre} </h2>

                <strong>{current + 1} de {encuesta.preguntas.length} preguntas</strong>

            </div>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div>
                    <Card>
                        <Card.Body>
                            <FormPregunta
                                i={current}
                                value={inputPreguntas.descripcion}
                                name="descripcion"
                                handleOnChange={handleOnChange}
                            />

                            {
                                inputPreguntas.opciones.map((opcion, i) =>
                                    <div
                                        key={i}
                                        className='mx-5 mb-2'>
                                        <FormOpciones

                                            i={i}
                                            value={opcion.descripcion}
                                            name='descripcion'
                                            handleOnChange={handleOnChange}
                                            type={opcion.type}
                                        />

                                        {

                                            inputPreguntas.opciones.length !== 1 &&


                                            <Button
                                                variant="danger"
                                                className="mx-2"
                                                onClick={() => handleRemove(i, 'opciones')}

                                            >
                                                Eliminar
                                            </Button>

                                        }

                                        {

                                            inputPreguntas.opciones.length - 1 === i &&

                                            <>

                                                <ButtonGroup>

                                                    <DropdownButton
                                                        variant='success'
                                                        as={ButtonGroup}
                                                        title="Agregar"

                                                    >
                                                        <Dropdown.Item
                                                            onClick={() => handleAddOpcion(i, 'text')}
                                                        >
                                                            Input
                                                        </Dropdown.Item>

                                                        <Dropdown.Item
                                                            onClick={() => handleAddOpcion(i, 'textarea')}
                                                        >
                                                            TextArea
                                                        </Dropdown.Item>
                                                    </DropdownButton>


                                                </ButtonGroup>


                                            </>



                                        }
                                    </div>

                                )
                            }


                        </Card.Body>
                        <Card.Body>

                            <div className='d-flex'>

                                <div className='me-auto d-flex '>

                                    <Button variant="warning" type='submit'   >
                                        Guardar
                                    </Button>

                                </div>
                                <div >

                                    <Button
                                        variant="primary"
                                        className='mx-1'
                                        onClick={handlePrev}
                                        size="sm"
                                    >
                                        Anterior
                                    </Button>

                                    <Button
                                        variant="primary"
                                        onClick={handleNext}
                                        size="sm"
                                    >
                                        Siguente
                                    </Button>
                                </div>
                            </div>

                        </Card.Body>


                    </Card>



                </div>




            </Form>




        </>
    )
}

export default EditarEncuesta