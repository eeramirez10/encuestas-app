import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useModal } from '../../hooks/useModal';


const ModalComponent = ({ children ,  title,}) => {

    const { show, handleShow } =  useModal();

    console.log(show)


    return (

        <Modal
            show={show}
            onHide={handleShow}
            fullscreen
            backdrop="static"
            keyboard={false}
            size="xl"
            centered

        >
            <Modal.Header closeButton>
                <Modal.Title>Asignar Encuesta {title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {children}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleShow} >
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
    )
}

export default ModalComponent