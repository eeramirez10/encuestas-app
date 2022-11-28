import { useEffect, useState } from "react";
import { fetchAPI } from "../helpers/fetch";


export const useTable = (table) => {

    const [paginacion, setPaginacion] = useState({
        hasNextPage: true,
        hasPrevPage: false,
        limit: 10,
        nextPage: 2,
        page: 1,
        pagingCounter: 1,
        prevPage: null,
        totalDocs: 142,
        totalPages: 15
    })

    const [rows, setRows] = useState([]);

    const [isLoading, setIsloading] = useState(false);

    const [busqueda, setBusqueda] = useState('');


    useEffect(() => {

        setIsloading(true)

        fetchAPI({ endpoint: table , method: "GET", params:{page:paginacion.page, search: busqueda} })
            .then(async (resp) => {
                const body = await resp.json();

                
                setIsloading(false);

                if (!body.ok) return console.log('Hubo un error');

                const { docs, ...rest} = body.data;

               

                setRows(docs);


                setPaginacion(rest)
            })
    }, [setRows,table, paginacion.page, busqueda]);

    const handleOnBusqueda = (e) => {

        setBusqueda(e.target.value);
    }

    const handleIsLoading = (value) =>{

        setIsloading(value)
    }




    return {
        rows,
        paginacion, 
        setPaginacion,
        handleOnBusqueda,
        handleIsLoading,
        busqueda,
        isLoading

    }


}