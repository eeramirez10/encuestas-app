import { useContext } from "react"

import ModalContext from '../context/ModalContext'


export const useModal = () => {
    const { show,handleShow } = useContext(ModalContext);


    
  return {
    show, 
    handleShow
  }
}
