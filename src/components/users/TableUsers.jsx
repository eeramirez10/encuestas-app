import Table from 'react-bootstrap/Table';

export const TableUsers = ({
    usuarios,
    pagingCounter
}) => {


    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>email</th>
                    <th>Sucursal</th>
                    <th> Area </th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario, index) => (

                    <tr  key={usuario._id}>
                        <td>{ pagingCounter + index }</td>
                        <td>{ usuario.nombre }</td>
                        <td>{ usuario.email}</td>
                        <td>{ usuario.sucursal}</td>
                        <td>{ usuario.area}</td>

                    </tr>


                ))}


            </tbody>
        </Table>
    )
}
