import React, { useEffect, useRef } from "react";
import { ModalBackground, Modal } from "./style";

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Empty array ensures that effect is only run on mount and unmount
}

export default function ModalContainer({ isOpen, toggle, children }) {
  const ref = useRef();

  useOnClickOutside(ref, () => toggle(false));

  return (
    <ModalBackground initialPose="closed" pose={isOpen ? "open" : "closed"}>
      <Modal ref={ref}>{children}</Modal>
    </ModalBackground>
  );
}
