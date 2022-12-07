import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const ListOfUsers = ({ usuarios }) => {

    
    return (
        <>
            <ListGroup variant='flush' className='opciones'>

                {
                    usuarios.map(usuario => (
                        <ListGroup.Item
                            key={usuario._id}
                        >
                            {usuario.nombre}
                        </ListGroup.Item>

                    ))


                }

            </ListGroup>

        </>
    )
}

export default ListOfUsers