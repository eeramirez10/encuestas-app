import React, { useEffect, useState } from 'react';
import ListOfEncuestas from '../../components/encuestas/ListOfEncuestas'
import Loading from '../../components/UI/Loading';
import { alertError } from '../../helpers/alerts';
import { fetchEncuestas } from '../../services/fetchEncuestas';

const Encuestas = () => {

    const [encuestas, setEncuestas] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchEncuestas()
            .then(encuestas => setEncuestas([...encuestas]))
            .catch(() => alertError({ text: "hubo un error, hablar con el admin" }))
            .finally(() => setIsLoading(false))

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