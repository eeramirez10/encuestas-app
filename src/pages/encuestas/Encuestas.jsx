import React, { useEffect, useState } from 'react'
import ListOfEncuestas from '../../components/encuestas/ListOfEncuestas'

import { fetchAPI } from '../../helpers/fetch'

const Encuestas = () => {

    const [encuestas, setEncuestas] = useState([])

    useEffect(()=>{

        fetchAPI({
            endpoint:'busqueda/coleccion/encuestas/todo',
            method:'GET'
        })
        .then( async (encuestas) => {
            const resp = await encuestas.json()

            setEncuestas([...resp.data])
        })

    },[setEncuestas])

    console.log(encuestas)
  return (
    
    <>
        <ListOfEncuestas  encuestas={encuestas} />
    </>

    
  )
}

export default Encuestas