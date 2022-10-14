import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../../helpers/fetch';
import { useEncuesta } from '../../hooks/useEncuesta';

const Resultados = ({ params }) => {



    const { encuesta} = useEncuesta({params})

 

    console.log(encuesta)


    return (
        <div>Resultados</div>
    )
}

export default Resultados