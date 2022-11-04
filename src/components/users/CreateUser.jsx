import React from 'react'
import { useReducer } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { formReducer } from '../../reducers/formReducer';
import { fetchAPI } from '../../helpers/fetch';
import { alertError, alertSuccess, closeLoadingAlert, loadingAlert } from '../../helpers/alerts';



const INITIAL_STATE = {
    values: {
        nombre: "",
        email: "",
        sucursal: "",
        area: ""
    },
    validated: false
}

const CreateUser = ({ show, handleClose }) => {

    const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

    const handleOnSubmit = async (event) => {

        console.log('entro')
        event.preventDefault();

        const form = event.currentTarget;
        const formIsValid = form.checkValidity()

        if (!formIsValid) {
            event.stopPropagation();
        }

        dispatch({
            type: "CHANGE_VALIDATED"
        })



        if (!formIsValid) return

        loadingAlert({ title: "guardando ..." })


        try {
            const createUser = await fetchAPI({ endpoint: "usuarios", method: "POST", data: state.values });

            const resp = await createUser.json();
            closeLoadingAlert()
            if (!resp.ok) {

                return alertError({ text: "Error" });
            }

            dispatch({
                type: "CLEANUP",
                payload: INITIAL_STATE
            })

            alertSuccess({ title: "Usuario Guardado correctamente" })

        } catch (error) {
            console.log(error)
            closeLoadingAlert()
            alertError("Hubo un error, hable con el administrador")
        }



    }

    const handleOnChange = ({ target }) => {

        dispatch({
            type: 'CHANGE_INPUT',
            payload: {
                name: target.name,
                value: target.value
            }
        })



    }

    const handleOnExit = () => {


        dispatch({
            type: "CLEANUP",
            payload: INITIAL_STATE
        })
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
                centered
                onExit={handleOnExit}

            >
                <Modal.Header closeButton > Crear Usuario </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={state.validated} onSubmit={handleOnSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={state.values.nombre}
                                name="nombre"
                                onChange={handleOnChange}

                            />
                            <Form.Control.Feedback type='invalid'>
                                Por favor ingresa el nombre del usuario
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={state.values.email}
                                name="email"
                                onChange={handleOnChange}

                            />
                            <Form.Control.Feedback type='invalid'>
                                Por favor ingresa el email
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Area</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={state.values.area}
                                name="area"
                                onChange={handleOnChange}

                            />
                            <Form.Control.Feedback type='invalid'>
                                Por favor ingresa el area
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Sucursal</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={state.values.sucursal}
                                name="sucursal"
                                onChange={handleOnChange}

                            />
                            <Form.Control.Feedback type='invalid'>
                                Por favor ingresa el nombre de la encuesta
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Button variant="primary" type='submit'  >
                            Submit
                        </Button>

                    </Form>



                </Modal.Body>


            </Modal>
        </>
    )
}

export default CreateUser