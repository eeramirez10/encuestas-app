import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';



const ListOfOptions = ({ 
    opciones, 
    handleOnCLickOpcion,
    activeIndex, 
    handleOnchange, 
    pregunta, 
    handleOnBlur 
}) => {

    return (

        <ListGroup variant='flush' className='opciones'>
            {
                opciones.map((opcion, index) => {

                    

                   return < div key={opcion._id}>
                        {
                            



                                <ListGroup.Item
                                    key={opcion._id}
                                    onClick={() => handleOnCLickOpcion(opcion, index)}
                                    className={`${index === activeIndex ? 'selected' : ''} `}
                                >
                                    {opcion.descripcion}
                                </ListGroup.Item>

                        }


                    </div>


                })
            }


        </ListGroup>
    )
}

export default ListOfOptions