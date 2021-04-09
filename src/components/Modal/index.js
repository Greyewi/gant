import React,{useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import {ModalContainer, ModalClose, ModalElement} from './style'

const modalElement = document.getElementById('modal')
const el = document.createElement('div')
el.classList.add('model-ch')

const Modal = ({children, isOpen = false, onCloseModal}) => {

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
        <ModalContainer onClick={onCloseModal}>
            <ModalElement onClick={e => e.stopPropagation()}>
              <ModalClose onClick={onCloseModal}>X</ModalClose>
              {children}
            </ModalElement>
        </ModalContainer>,
        el
      )}
    </>
  )
}

export default Modal