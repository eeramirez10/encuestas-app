import React, { useEffect,  useState } from 'react'
import { fetchAPI } from '../../helpers/fetch';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormPregunta from '../../components/forms/FormPregunta';
import Card from 'react-bootstrap/Card';
import FormOpciones from '../../components/forms/FormOpciones';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const AddPreguntas = ({ params }) => {
    const { idEncuesta } = params

    const [encuesta, setEncuesta] = useState({});

    const [validated, setValidated] = useState(false);

    const [inputPreguntas, setInputPreguntas] = useState([{
        descripcion: '',
        opciones: [
            { descripcion: '', type:'text' }
        ]
    }])

    useEffect(() => {

        fetchAPI({ endpoint: `encuesta/${idEncuesta}`, method: 'GET' })
            .then(async (encuesta) => {
                const resp = await encuesta.json();

                setEncuesta({ ...resp.data })
            })

    }, [setEncuesta, idEncuesta]);



    const handleOnChange = (e, indexPregunta, indexOpcion, propiedad) => {

        const { name, value } = e.target;

        const list = [...inputPreguntas];


        if (propiedad === 'opciones') {

            list[indexPregunta][propiedad][indexOpcion][name] = value


            setInputPreguntas(list);

            return
        }

        list[indexPregunta][name] = value;
        setInputPreguntas(list);

    }

    const handleRemove = (indexPregunta, indexOpcion, propiedad) => {
        const list = [...inputPreguntas];
        if (propiedad === 'opciones') {

            list[indexPregunta][propiedad].splice(indexOpcion, 1);


            setInputPreguntas(list)

            return
        }
        list.splice(indexPregunta, 1);
        setInputPreguntas(list)
    }

    const handleAdd = () => {
        setInputPreguntas([...inputPreguntas, { descripcion: '',type:"multiOpcion", opciones: [{ descripcion: '', type:'text' }] }]);
    };

    const handleAddOpcion = (IndexP,indiceOpcion, type) => {

        let list = [...inputPreguntas]


        if(type === "textarea"){

            list[IndexP].opciones.splice(0,indiceOpcion + 1)
            list[IndexP].type = "comentario"
        }

        if(type === "text"){

            if( list[IndexP].opciones[0].type === "textarea"){
                list[IndexP].opciones.splice(0,indiceOpcion + 1)
            }

            list[IndexP].type = "multiOpcioi"

        }

        

        list[IndexP].opciones.push({ descripcion: '', type })

        setInputPreguntas(list)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formIsValid = form.checkValidity()

        if (!formIsValid) {
            event.stopPropagation();
        }

        setValidated(true)


        if (!formIsValid) return

        console.log(inputPreguntas)

        for (let pregunta of inputPreguntas) {


            console.log({
                descripcion: pregunta.descripcion,
                opciones: pregunta.opciones,
                idEncuesta
            })

            const preguntas = await fetchAPI({
                endpoint: 'preguntas', data: {
                    descripcion: pregunta.descripcion,
                    opciones: pregunta.opciones,
                    idEncuesta
                }, method: 'POST'
            })

            const resp = await preguntas.json();

            console.log(resp)

        }


        //    const pregunta = await  fetchAPI({ endpoint:'preguntas', data:{ descriocion:'' }, method:'POST' })


        // fetchAPI({
        //     endpoint:'encuesta',
        //     method:'POST',
        //     data: state.values
        // })
        // .then( () =>{}  )
        // .catch(console.log)
    }



    return (

        <>

            <h2>{encuesta?.nombre} </h2>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                {
                    inputPreguntas.map((pregunta, indicePregunta) => {

                        return <Card
                            key={indicePregunta}
                        >

                            <Card.Body>

                                <FormPregunta
                                    i={indicePregunta}
                                    value={pregunta.descripcion}
                                    name="descripcion"
                                    handleOnChange={handleOnChange}
                                />

                                {
                                    pregunta.opciones.map((opcion, i) => {

                                        return (
                                            <div
                                                key={i}
                                                className='mx-5 mb-2'>
                                                <FormOpciones

                                                    i={i}
                                                    indicePregunta={indicePregunta}
                                                    value={opcion.descripcion}
                                                    name='descripcion'
                                                    handleOnChange={handleOnChange}
                                                    type={opcion.type}
                                                />

                                                {

                                                    inputPreguntas[indicePregunta].opciones.length !== 1 &&


                                                    <Button
                                                        variant="danger"
                                                        className="mx-2"
                                                        onClick={() => handleRemove(indicePregunta, i, 'opciones')}

                                                    >
                                                        Eliminar
                                                    </Button>

                                                }

                                                {

                                                    inputPreguntas[indicePregunta].opciones.length - 1 === i &&

                                                    <>

                                                        <ButtonGroup>

                                                            <DropdownButton
                                                                variant='success'
                                                                as={ButtonGroup}
                                                                title="Agregar"

                                                            >
                                                                <Dropdown.Item
                                                                    onClick={() => handleAddOpcion(indicePregunta,i, 'text')}
                                                                >
                                                                    Input
                                                                </Dropdown.Item>

                                                                <Dropdown.Item
                                                                    onClick={() => handleAddOpcion(indicePregunta,i, 'textarea')}
                                                                >
                                                                    TextArea
                                                                </Dropdown.Item>
                                                            </DropdownButton>

                                                            {/* <Button
                                                                variant="success"
                                                                onClick={() => handleAddOpcion(indicePregunta)}

                                                            >
                                                                Agregar
                                                            </Button> */}

                                                        </ButtonGroup>


                                                    </>



                                                }



                                            </div>
                                        )


                                    })
                                }



                                {
                                    inputPreguntas.length !== 1 &&

                                    <Button
                                        variant="danger"
                                        className="mx-2"
                                        onClick={() => handleRemove(indicePregunta)}
                                    >
                                        Eliminar
                                    </Button>

                                }

                                {
                                    inputPreguntas.length - 1 === indicePregunta &&


                                    <Button
                                        variant="success"
                                        onClick={handleAdd}
                                    >
                                        Agregar
                                    </Button>
                                }



                            </Card.Body>




                        </Card>

                    })
                }



                {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                        type="text"
                        value={state.values.descripcion}
                        name="descripcion"
                        onChange={handleOnChange}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>
                        Por favor ingresa la descripcion de la encuesta
                    </Form.Control.Feedback>
                </Form.Group> */}

                <Button variant="primary" type='submit' className='mt-5'  >
                    Submit
                </Button>
            </Form>

        </>

    )
}

export default AddPreguntas