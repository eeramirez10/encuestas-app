import React from 'react'
import { Form } from 'react-bootstrap';


const FormOpciones = ({
    i,
    value,
    name,
    handleOnChange,
    type
}) => {
    return (
        <Form.Group key={i} className="mb-3 " controlId="formBasicEmail">


            <Form.Label>Opcion {i + 1}  </Form.Label>
            {
                type === 'textarea' ?

                    <Form.Control as="textarea" rows={3} />

                    :
                    <>

                        <Form.Control
                            required
                            type="text"
                            value={value}
                            name={name}
                            onChange={(e) => handleOnChange(e, i, 'opciones')}
                            size="sm"


                        />

                        <Form.Control.Feedback type='invalid'>
                            Por favor ingresa la opcion
                        </Form.Control.Feedback>

                    </>





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

            }

            {
                inputPreguntas.length - 1 === indicePregunta &&


                <Button
                    variant="success"
                    onClick={handleAdd}
                >
                    Agregar
                </Button>
            } */}


        </Form.Group>
    )
}

export default FormOpciones