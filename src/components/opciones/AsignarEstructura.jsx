import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, ButtonGroup, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap'
import FormOpciones from '../forms/FormOpciones'



const AsignarEstructura = ({ show, handleClose, idEncuesta, setInputPreguntas }) => {

    const [opciones, setOpciones] = useState([{ descripcion: '', type: 'text' }])

    const [validated, setValidated] = useState(false);

    useEffect(() => {

        if (localStorage.getItem('estructuraOpciones')) {

            const structOptionsParse = JSON.parse(localStorage.getItem("estructuraOpciones"));

            const filterEncuesta = structOptionsParse.filter(op => op.id === idEncuesta)

            if (filterEncuesta.length) {
                setOpciones(filterEncuesta[0].opciones)
            }
        }
    }, [idEncuesta])


    const handleOnChange = (e, indexOpcion, propiedad) => {

        const { name, value } = e.target;

        let opcion = [...opciones];


        if (propiedad === 'opciones') {

            opcion[indexOpcion][name] = value

            setOpciones(opcion)

            return
        }

        opcion[name] = value;
        setOpciones(opcion)

    }



    const handleRemove = (indexOpcion, propiedad) => {
        let opcion = [...opciones];

        if (propiedad === 'opciones') {

            opcion.splice(indexOpcion, 1);


            setOpciones(opcion)

            return
        }

    }



    const handleAddOpcion = (indiceOpcion, type) => {

        let opcion = [...opciones];

        if (type === "textarea") {

            opcion.splice(0, indiceOpcion + 1)

        }

        if (type === "text") {

            if (opciones[0].type === "textarea") {
                opcion.splice(0, indiceOpcion + 1)
            }

        }


        opcion.push({ descripcion: '', type })

        setOpciones(opcion)
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

        if (localStorage.getItem("estructuraOpciones")) {

            const structOptionsParse = JSON.parse(localStorage.getItem("estructuraOpciones"));


            const indiceStructOptions = structOptionsParse.findIndex(op => op.id === idEncuesta);

            if (indiceStructOptions !== -1) {
                structOptionsParse[indiceStructOptions] = { id: idEncuesta, opciones };

            } else {
                structOptionsParse.push({ id: idEncuesta, opciones });
            }

            localStorage.setItem("estructuraOpciones", JSON.stringify(structOptionsParse) );

        } else {

            localStorage.setItem("estructuraOpciones", JSON.stringify([{ id: idEncuesta, opciones }]));
        }




        setInputPreguntas(pregunta => {
            return {
                ...pregunta,
                opciones: opciones
            }
        })

        handleClose()

    }




    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="xl"
            centered

        >
            <Modal.Header closeButton>
                <Modal.Title>Asignar Estructura</Modal.Title>

            </Modal.Header>
            <Modal.Body>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {
                        opciones.map((opcion, i) =>
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

                                    opciones.length !== 1 &&


                                    <Button
                                        variant="danger"
                                        className="mx-2"
                                        onClick={() => handleRemove(i, 'opciones')}

                                    >
                                        Eliminar
                                    </Button>

                                }

                                {

                                    opciones.length - 1 === i &&

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
                    }


                    <Button variant="primary" type='submit' className='mt-5'  >
                        Submit
                    </Button>


                </Form>




            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
    )
}

export default AsignarEstructura