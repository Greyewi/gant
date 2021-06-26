import React, {useEffect, useRef, useState} from "react"
import { ModalBackground, Modal } from "./style";
import {getCoords} from '../../utils'
import ReactDOM from 'react-dom'

const modalContainer = document.createElement('div')
modalContainer.id = 'modal'
document.body.append(modalContainer)

const modalEl = document.createElement('div')

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {

      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    modalContainer.appendChild(modalEl)

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Empty array ensures that effect is only run on mount and unmount
}

export default function ModalContainer({ openTaskId, toggle, children }) {
  const ref = useRef();
  const [coords, setCoords] = useState({})

  useEffect(() => {
    const element = document.getElementById(openTaskId)
    setCoords(getCoords(element))

  }, [openTaskId])

  useOnClickOutside(ref, () => {
    toggle()
    modalContainer.removeChild(modalEl)
  });

  return ReactDOM.createPortal(
    <ModalBackground initialPose="closed" pose={openTaskId ? "open" : "closed"}>
      <Modal top={coords.top} left={coords.left} ref={ref}>{children}</Modal>
    </ModalBackground>, modalEl);
}
