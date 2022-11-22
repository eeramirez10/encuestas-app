
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const Search = ({handleOnBusqueda, busqueda}) => {

   

    return (
        <Form className='my-3' >

            <Form.Group as={Col} >

                <Form.Control
                    type="text"
                    placeholder="Buscar"
                    name='busqueda'
                    onChange={handleOnBusqueda}
                    value={busqueda}
                />
            </Form.Group>


        </Form>
    )
}

export default Search