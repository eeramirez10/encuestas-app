import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import useWindowDimensions from '../../hooks/useWindowDimensions ';




const SideBar = () => {

    const [, setLocation] = useLocation();

    const { height, width } =  useWindowDimensions()

   

    const [show, setShow] = useState(false);
    const [expand, setExpand] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

 

    useEffect(() =>{

        if(width <= 780){

            setExpand(false)
        }else{

            setExpand(true)
        }

    },[setExpand, width])


    const handleClick = (path) => {
        setLocation(path)
        handleClose()
    }



    return (
        <>


            <Navbar key={expand} bg="dark" variant='dark' expand={expand} className="mb-3 " onToggle={handleShow} >
                <Container fluid>
                    <Navbar.Brand className='pointer' onClick={() => handleClick('/')}  >
                        Encuestas
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="start"
                        show={show}
                        onHide={handleClose}
                    >


                        <Offcanvas.Header  closeButton  >
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Rutas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link
                                    onClick={handleClose}
                                    as={Link}
                                    to="/"
                                    
                                >
                                    Encuestas
                                </Nav.Link>
                                <Nav.Link
                                    onClick={handleClose}
                                    as={Link}
                                    to="/encuesta/new"
                                >
                                    Nueva Encuesta
                                </Nav.Link>
                                {/* <NavDropdown
                                    title="Dropdown"
                                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                                >
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown> */}
                            </Nav>
                            {/* <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form> */}
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>
    );

}


// const SideBar = () => {


//     return (
//         <>
//             <div id="sidebar">
//                 <h1>React Router Contacts</h1>
//                 <div>
//                     <form id="search-form" role="search">
//                         <input
//                             id="q"
//                             aria-label="Search contacts"
//                             placeholder="Search"
//                             type="search"
//                             name="q"
//                         />
//                         <div
//                             id="search-spinner"
//                             aria-hidden
//                             hidden={true}
//                         />
//                         <div
//                             className="sr-only"
//                             aria-live="polite"
//                         ></div>
//                     </form>
//                     <div >
//                         <button >
//                             <Link  to='/encuesta/new' > New </Link>
//                         </button>


//                     </div>
//                 </div>
//                 <nav>


//                 </nav>
//             </div>



//         </>
//     )
// }

export default SideBar