import React from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const HeaderEncuesta = ({ title, descripcion }) => {
    return (
        <Card.Body style={{ paddingBottom: '0px' }} >

            <Row>
                <Col md={4} sm={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }} >

                    <img src="/img/logo-tuvansa.png" alt="..." />

                </Col>
                <Col md={4} sm={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <h3> {title} </h3>


                </Col>
                <Col md={4} sm={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="text-center">

                    <p> <strong>{descripcion}</strong>  </p>

                </Col>

            </Row>


        </Card.Body>
    )
}

export default HeaderEncuesta