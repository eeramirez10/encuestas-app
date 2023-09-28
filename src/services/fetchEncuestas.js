import { fetchAPI } from "../helpers/fetch"


export const fetchEncuestas = () => {
    return fetchAPI({ endpoint: 'busqueda/coleccion/encuestas/todo', method: 'GET'})
        .then(async (encuestas) => await encuestas.json())
        .then(resp => resp.data)
}