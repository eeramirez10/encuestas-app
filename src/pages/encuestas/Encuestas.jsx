import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import ListOfEncuestas from '../../components/encuestas/ListOfEncuestas'
import { alertError } from '../../helpers/alerts';

import { fetchAPI } from '../../helpers/fetch'

const Encuestas = () => {

    const [encuestas, setEncuestas] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        setIsLoading(true);

        fetchAPI({
            endpoint: 'busqueda/coleccion/encuestas/todo',
            method: 'GET'
        })
            .then(async (encuestas) => {
                const resp = await encuestas.json()

                setIsLoading(false)

                setEncuestas([...resp.data])
            }).catch( () =>{
                setIsLoading(false)
                alertError({text:"hubo un error, hablar con el admin"})
            })

    }, [setEncuestas])

    return (

        <>

            {
                isLoading ?

                    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh' }}>

                        <Spinner size='sm' animation="grow"  />
                        <Spinner size='sm' animation="grow"  />
                        <Spinner animation="grow" />

                    </div>


                    :

                    <ListOfEncuestas encuestas={encuestas} />

            }



        </>


    )
}

export default Encuestas