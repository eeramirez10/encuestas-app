import React from 'react'
import { Form } from 'react-bootstrap';


const FormPregunta = ({i,value, name, handleOnChange}) => {
    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">


            <Form.Label>Pregunta {i + 1}  </Form.Label>
            <Form.Control
                required
                type="text"
                value={value}
                name={name}
                onChange={(e) => handleOnChange(e, i, 'pregunta')}
                size="sm"

            />
            <Form.Control.Feedback type='invalid'>
                Por favor ingresa la pregunta
            </Form.Control.Feedback>


        </Form.Group>
    )
}

export default FormPregunta