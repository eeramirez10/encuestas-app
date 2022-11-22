import React, { useReducer, useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useLocation } from "wouter";

import { fetchAPI } from '../../helpers/fetch';
import { formReducer, INITIAL_STATE } from '../../reducers/formReducer';

const NewEncuesta = () => {

    const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
    const [location, setLocation] = useLocation();



    const handleOnChange = ({ target }) => {

        dispatch({
            type: 'CHANGE_INPUT',
            payload: {
                name: target.name,
                value: target.value
            }
        })



    }


    const handleSubmit = (event) => {
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


        fetchAPI({
            endpoint: 'encuesta',
            method: 'POST',
            data: state.values
        })
            .then(() => setLocation("/"))
            .catch(console.log)
    }



    return (

        <Form noValidate validated={state.validated} onSubmit={handleSubmit}>
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
                    Por favor ingresa el nombre de la encuesta
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                    type="text"
                    value={state.values.descripcion}
                    name="descripcion"
                    onChange={handleOnChange}
                    required
                />
                <Form.Control.Feedback type='invalid'>
                    Por favor ingresa la descripcion de la encuesta
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type='submit'  >
                Submit
            </Button>
        </Form>
    )
}

export default NewEncuesta