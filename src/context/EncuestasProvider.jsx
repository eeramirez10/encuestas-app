import { createContext, useEffect, useState } from "react";
import { fetchEncuestas } from "../services/fetchEncuestas";

export const EncuestasContext = createContext()

export const EncuestasProvider = ({ children }) => {

    const [encuestas, setEncuestas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchEncuestas()
            .then(encuestas => setEncuestas([...encuestas]))
            .catch(() => alertError({ text: "hubo un error, hablar con el admin" }))
            .finally(() => setIsLoading(false))

    }, [setEncuestas])

    return (
        <EncuestasContext.Provider value={{ encuestas, isLoading }}>

            {children}

        </EncuestasContext.Provider>
    )

}

export default Context;