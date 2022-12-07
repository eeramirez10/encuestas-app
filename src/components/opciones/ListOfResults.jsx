import React, { useState } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './ListOfResults.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { fetchAPI } from '../../helpers/fetch';
import ListOfUsers from '../users/ListOfUsers';

import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';






const ListOfResults = ({ opciones, isComentario = false }) => {



    return (
        <>
            {
                isComentario ?

                    <Comentarios opciones={opciones} />

                    :

                    <MultiOpciones opciones={opciones} />

            }

        </>


    )
}


const MultiOpciones = ({ opciones }) => {

    const [sucursales, setSucursales] = useState([]);

    const handleOnClickPop = async (opcion) => {


        if (opcion.valor === 0) return setSucursales([])

        const resp = await fetchAPI({ endpoint: `encuesta/user/answer/${opcion._id}`, method: "GET" })

        const { usuarios } = await resp.json();

        const mexico = usuarios.filter(usuario => usuario.sucursal.toLowerCase() === "mexico")
        const monterrey = usuarios.filter(usuario => usuario.sucursal.toLowerCase() === "monterrey");
        const veracruz = usuarios.filter(usuario => usuario.sucursal.toLowerCase() === "veracruz");
        const mexicali = usuarios.filter(usuario => usuario.sucursal.toLowerCase() === "mexicali");
        const queretaro = usuarios.filter(usuario => usuario.sucursal.toLowerCase() === "queretaro");



        setSucursales([{
            name: "Mexico",
            usuarios: mexico
        },
        {
            name: 'Monterrey',
            usuarios: monterrey
        },
        {
            name: "Veracruz",
            usuarios: veracruz
        },
        {
            name: "Mexicali",
            usuarios: mexicali
        },
        {
            name: "Queretaro",
            usuarios: queretaro

        }])
    }


    const colorVariant = (porcentaje) => {

        const number = parseInt(porcentaje)

        return number < 30 ? 'danger'
            : number >= 30 && number < 50
                ? "warning"
                : number >= 50 && number < 75
                    ? "info"
                    : "success"

    }

    const porcentajeTotal = (votos) => {



        if (votos === 0) return votos;

        const porcentaje = (votos / sumRespuestas()) * 100;



        return porcentaje.toFixed(2)

    }

    const sumRespuestas = () => opciones.reduce((sum, opcion) => sum + opcion.valor, 0);

    const popover = (
        <Popover style={{ width: 400 }} >
            <Popover.Header as="h3">Usuarios</Popover.Header>
            <Popover.Body>

                <Accordion>

                    {
                        sucursales.map((sucursal, index) => {

                            return <div key={index}>
                                {
                                    sucursal.usuarios.length !== 0 &&

                                    <Accordion.Item eventKey={sucursal.name}>
                                        <Accordion.Header className='d-flex '>
                                            <div className='ms-2 me-auto'> {sucursal.name}</div>
                                            <Badge bg="primary" pill>{sucursal.usuarios.length} </Badge>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ListOfUsers usuarios={sucursal.usuarios} />
                                        </Accordion.Body>
                                    </Accordion.Item>


                                }

                            </div>



                        })

                    }


                </Accordion>

            </Popover.Body>
        </Popover>
    );





    return <ListGroup variant='flush' className='opciones'>

        {
            opciones.map((opcion, index) => (


                < div key={opcion._id}>

                    <ListGroup.Item key={opcion._id}>
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

                                <OverlayTrigger
                                    trigger="click"
                                    placement="bottom"
                                    overlay={popover}
                                    rootClose={true}
                                    onToggle={nextShow => nextShow && handleOnClickPop(opcion)}

                                >
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


const Comentarios = ({ opciones }) => {

    console.log(opciones)

    return <ListGroup variant='flush' className='opciones'>

        {opciones.map((opcion) => <ListGroup.Item key={opcion._id} >{opcion.descripcion} </ListGroup.Item>)}

    </ListGroup>


}

export default ListOfResults