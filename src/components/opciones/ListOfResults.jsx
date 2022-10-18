import React, { useState } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './ListOfResults.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { fetchAPI } from '../../helpers/fetch';
import ListOfUsers from '../users/ListOfUsers';






const ListOfResults = ({ opciones, isComentario = false }) => {

    const [usuarios, setUsuarios] = useState([]);

    console.log(isComentario)


    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Usuarios</Popover.Header>
            <Popover.Body>
                <ListOfUsers
                    usuarios={usuarios}
                />
            </Popover.Body>
        </Popover>
    );

    const handleOnClickPop = async (opcion) => {


        if (opcion.votos === 0) return

        const resp = await fetchAPI({ endpoint: `encuesta/user/answer/${opcion._id}`, method: "GET" })

        const { usuarios } = await resp.json()

        setUsuarios(usuarios)
    }







    return (
        <>
            {
                isComentario ?

                    <Comentarios opciones={opciones} popover={popover} handleOnClickPop={handleOnClickPop} />

                    :

                    <MultiOpciones opciones={opciones} popover={popover} handleOnClickPop={handleOnClickPop} />

            }




        </>


    )
}


const MultiOpciones = ({ opciones, popover, handleOnClickPop }) => {


    const colorVariant = (porcentaje) => {

        const number = parseInt(porcentaje)
        
        return number < 30 ? 'danger' : 
            number >= 30 && number < 50 
            ? "warning":
            number >= 50 && number < 75 ? "info" :
            "success"

        // switch (true) {
        //     case number < 30:
        //         return "danger"
        //     case number > 30 && number < 50:
        //         return "warning"
        //     case number > 50 && number < 75:
        //         return "danger"
        //     case number > 75:
        //         return "succes"
        //     default:
        //         return "success"
        // }
    }

    const porcentajeTotal = (votos) => {

        if (votos === 0) return votos;

        const porcentaje = (votos / sumRespuestas()) * 100;



        return porcentaje.toFixed(2)

    }

    const sumRespuestas = () => {
        return opciones.reduce((sum, opcion) => sum + opcion.valor, 0);
    }





    return <ListGroup variant='flush' className='opciones'>

        {
            opciones.map((opcion, index) => (


                < div key={opcion._id}>

                    <ListGroup.Item
                        key={opcion._id}

                    >
                        <Row>

                            <Col md={12} className=" d-flex ">

                                <div className='me-auto'>
                                    {opcion.descripcion}
                                </div>

                                <div >
                                    <strong> Votos : {opcion.valor}</strong>
                                </div>

                            </Col>

                            <Col md={12} className="mt-1">

                                <OverlayTrigger placement="top" overlay={popover} onEntered={() => handleOnClickPop(opcion)} >

       

                                    <ProgressBar
                                        variant={
                                            colorVariant(porcentajeTotal(opcion.valor))
                                        }
                                        now={porcentajeTotal(opcion.valor)}
                                        label={`${porcentajeTotal(opcion.valor)}%`}


                                    />


                                </OverlayTrigger>
                            </Col>


                        </Row>




                    </ListGroup.Item>




                </div>


            ))
        }



    </ListGroup>


}


const Comentarios = ({ opciones, handleOnClickPop, popover }) => {

    return <ListGroup variant='flush' className='opciones'>

        {
            opciones.map((opcion, index) => (


                < div key={opcion._id}>

                    <ListGroup.Item
                        key={opcion._id}

                    >
                        <Row>  <OverlayTrigger placement="bottom" overlay={popover} onEntered={() => handleOnClickPop(opcion)} >

                            <Col md={12} className=" d-flex ">


                                <div className='me-auto'>
                                    {opcion.descripcion}
                                </div>


                            </Col>
                        </OverlayTrigger>



                        </Row>




                    </ListGroup.Item>




                </div>


            ))
        }



    </ListGroup>


}

export default ListOfResults