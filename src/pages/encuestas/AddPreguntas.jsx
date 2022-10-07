import React, { useEffect, useReducer, useState } from 'react'
import { fetchAPI } from '../../helpers/fetch';
import { formReducer } from '../../reducers/formReducer';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormPregunta from '../../components/forms/FormPregunta';
import Card from 'react-bootstrap/Card';
import FormOpciones from '../../components/forms/FormOpciones';


const AddPreguntas = ({ params }) => {
    const { idEncuesta } = params

    const [encuesta, setEncuesta] = useState({});

    const [validated, setValidated] = useState(false);

    const [inputPreguntas, setInputPreguntas] = useState([{
        descripcion: '',
        opciones: [
            { descripcion: '' }
        ]
    }])

    useEffect(() => {

        fetchAPI({ endpoint: `encuesta/${idEncuesta}`, method: 'GET' })
            .then(async (encuesta) => {
                const resp = await encuesta.json();

                setEncuesta({ ...resp.data })
            })

    }, [setEncuesta]);

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
        setInputPreguntas([...inputPreguntas, { descripcion: '', opciones: [{ descripcion: '' }] }]);
    };

    const handleAddOpcion = (IndexP) => {

        let list = [...inputPreguntas]

        list[IndexP].opciones.push({ descripcion: '' })

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

        for (let pregunta of inputPreguntas ){


            console.log({
                descripcion:pregunta.descripcion,
                opciones: pregunta.opciones,
                idEncuesta
            })

            const preguntas = await  fetchAPI({ endpoint:'preguntas', data:{
                descripcion:pregunta.descripcion,
                opciones: pregunta.opciones,
                idEncuesta
            }, method:'POST' })

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

            <Form noValidate validated={validated}  onSubmit={handleSubmit}>

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

                                                    <Button
                                                        variant="success"
                                                        onClick={() => handleAddOpcion(indicePregunta)}

                                                    >
                                                        Agregar
                                                    </Button>


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