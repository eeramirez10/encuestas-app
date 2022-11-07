import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../../helpers/fetch';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormPregunta from '../../components/forms/FormPregunta';
import Card from 'react-bootstrap/Card';
import FormOpciones from '../../components/forms/FormOpciones';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { alertConfirm, alertSuccess } from '../../helpers/alerts';
import { useLocation } from 'wouter';
import AsignarEstructura from '../../components/opciones/AsignarEstructura';


const AddPreguntas = ({ params }) => {

    const { idEncuesta } = params;




    const [, setLocation] = useLocation();

    const [encuesta, setEncuesta] = useState({});

    const [validated, setValidated] = useState(false);


    const [inputPreguntas, setInputPreguntas] = useState({
        descripcion: '',
        type: "",
        opciones: [
            { descripcion: '', type: 'text' }
        ]
    })

    const [numeroPregunta, setNumeroPregunta] = useState(0);

    const [show, setShow] = useState(false);

    useEffect(() => {

        if (localStorage.getItem('estructuraOpciones')) {

            const structOptionsParse = JSON.parse(localStorage.getItem("estructuraOpciones"));

            const filterEncuesta = structOptionsParse.filter(op => op.id === idEncuesta)

            if (filterEncuesta.length) {
                setInputPreguntas(pregunta => ({
                    ...pregunta,
                    opciones: filterEncuesta[0].opciones
                }))
            }



        }


        fetchAPI({ endpoint: `encuesta/${idEncuesta}`, method: 'GET' })
            .then(async (encuesta) => {
                const resp = await encuesta.json();

                setEncuesta({ ...resp.data })



                setNumeroPregunta(resp.data.preguntas.length)
            })

    }, [setEncuesta, idEncuesta]);



    const handleClose = () => {
        setShow(false)

    };
    const handleShow = () => {
        setShow(true)

    };


    const handleOnChange = (e, indexOpcion, propiedad) => {

        const { name, value } = e.target;

        const pregunta = { ...inputPreguntas };


        if (propiedad === 'opciones') {

            pregunta[propiedad][indexOpcion][name] = value


            setInputPreguntas(pregunta);

            return
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


    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formIsValid = form.checkValidity()

        if (!formIsValid) {
            event.stopPropagation();
        }

        setValidated(true)


        if (!formIsValid) return

        const preguntas = await fetchAPI({
            endpoint: 'preguntas', data: {
                descripcion: inputPreguntas.descripcion,
                opciones: inputPreguntas.opciones,
                idEncuesta
            }, method: 'POST'
        })

        const resp = await preguntas.json();

        if (resp.ok) {

            await alertSuccess({ title: "Guardado correctamente" })

            const result = await alertConfirm()

            if (result.isConfirmed) {

                setNumeroPregunta(prev => prev + 1)
                setValidated(false)


                if (localStorage.getItem('estructuraOpciones')) {

                    const structOptionsParse = JSON.parse(localStorage.getItem("estructuraOpciones"));

                    const filterEncuesta = structOptionsParse.filter(op => op.id === idEncuesta)

                    if(filterEncuesta.length){
                        return setInputPreguntas({
                            descripcion: '',
                            opciones: filterEncuesta[0].opciones
                        })
                    }


                }

                return setInputPreguntas({
                    descripcion: '',
                    opciones: [
                        { descripcion: '', type: 'text' }
                    ]
                })
            }

            setLocation('/');



        }

    }



    return (

        <>

            <div className='d-flex my-3'>
                <h2 className="me-auto" >{encuesta?.nombre} </h2>
                <Button onClick={() => handleShow()} > Asignar estructura  </Button>
            </div>



            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Card>

                    <Card.Body>

                        <FormPregunta
                            i={numeroPregunta}
                            value={inputPreguntas.descripcion}
                            name="descripcion"
                            handleOnChange={handleOnChange}
                        />

                        {
                            inputPreguntas.opciones.map((opcion, i) => {

                                return (
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

                                                    {/* <Button
                                                                variant="success"
                                                                onClick={() => handleAddOpcion(indicePregunta)}

                                                            >
                                                                Agregar
                                                            </Button> */}

                                                </ButtonGroup>


                                            </>



                                        }



                                    </div>
                                )


                            })
                        }



                        {/* {
                                    inputPreguntas.length !== 1 &&

                                    <Button
                                        variant="danger"
                                        className="mx-2"
                                        onClick={() => handleRemove(indicePregunta)}
                                    >
                                        Eliminar
                                    </Button>

                                } */}

                        {/* {
                                    inputPreguntas.length - 1 === indicePregunta &&


                                    <Button
                                        variant="success"
                                        onClick={handleAdd}
                                    >
                                        Agregar
                                    </Button>
                                } */}



                    </Card.Body>




                </Card>

                <Button variant="primary" type='submit' className='mt-5'  >
                    Submit
                </Button>
            </Form>

            <AsignarEstructura
                show={show}
                handleClose={handleClose}
                idEncuesta={idEncuesta}
                setInputPreguntas={setInputPreguntas}
            />

        </>

    )
}

export default AddPreguntas