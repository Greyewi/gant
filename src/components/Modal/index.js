import React,{useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import {ModalContainer, ModalClose, ModalElement} from './style'

const modalElement = document.getElementById('modal')
const el = document.createElement('div')
el.classList.add('model-ch')

const Modal = ({children, defaultOpen = false}) => {
  const [isOpen, setIsOpenModal] = useState(defaultOpen)

  useEffect(() => {
    modalElement.appendChild(el)
    return () => {
      modalElement.removeChild(el)
      el.remove()
    }
  },[])

  useEffect(() => {
    if(isOpen) {
      modalElement.appendChild(el)
    } else {
      modalElement.removeChild(el)
      el.remove()
    }
  },[isOpen])

  return(
    <>
      {isOpen && ReactDOM.createPortal(
        <ModalContainer onClick={() => setIsOpenModal(false)}>
            <ModalElement onClick={e => e.stopPropagation()}>
              <ModalClose onClick={() => setIsOpenModal(false)}>X</ModalClose>
              {children}
            </ModalElement>
        </ModalContainer>,
        el
      )}
    </>
  )
}

export default Modal