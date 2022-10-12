import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Form } from 'react-bootstrap';


const ListOfOptions = ({ opciones, handleOnCLickOpcion, activeIndex, handleOnchange, pregunta, handleOnBlur }) => {


    return (




        <ListGroup variant='flush' className='opciones'>
            {
                opciones.map((opcion, index) => (

                    < div key={opcion._id}>
                        {

                            opcion.type === "textarea" ?

                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Escriba su respuesta"
                                    name="descripcion"
                                    value={pregunta.opcion.descripcion}
                                    onChange={(e) => handleOnchange(e)}
                                    onBlur={ handleOnBlur}
                                />

                                :


                                <ListGroup.Item
                                    key={opcion._id}
                                    onClick={() => handleOnCLickOpcion(opcion, index)}
                                    className={`${index === activeIndex ? 'selected' : ''} `}
                                >
                                    {opcion.descripcion}
                                </ListGroup.Item>

                        }


                    </div>


                ))
            }


        </ListGroup>
    )
}

export default ListOfOptions