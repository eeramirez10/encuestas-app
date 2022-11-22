import { createContext, useState } from "react";

const Context = createContext({});

export const ModalContextProvider = ({children}) =>{

        const [show, setShow] = useState(false);

        const handleShow = () =>{

            setShow(!show)
        }

        return <Context.Provider value={{show, handleShow}} >
            {children}
        </Context.Provider>

}

export default Context;