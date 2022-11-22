import React, { useEffect, useState } from 'react';


import ListOfEncuestas from '../../components/encuestas/ListOfEncuestas'
import Loading from '../../components/UI/Loading';
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

                   <Loading />


                    :

                    <ListOfEncuestas encuestas={encuestas} />

            }



        </>


    )
}

export default Encuestas