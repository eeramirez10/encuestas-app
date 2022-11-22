import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

            <Spinner size='sm' animation="grow" />
            <Spinner size='sm' animation="grow" />
            <Spinner animation="grow" />

        </div>
    )
}

export default Loading