import styled from "styled-components";
import posed from "react-pose";

const modalBackgroundPoses = {
  open: {
    applyAtStart: {
      display: "block",
    },
  },
  closed: {
    background: "rgba(0, 0, 0, 0)",
    applyAtEnd: {
      display: "none",
    },
  },
};

export const ModalBackground = styled(posed.div(modalBackgroundPoses))`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index:10;
`;

const modalPoses = {
  open: {
    opacity: 1,
    transition: {
      opacity: {
        type: "tween",
        duration: 200,
      },
    },
  },
  closed: {
    opacity: 0,
    transition: {
      opacity: {
        type: "tween",
        duration: 200,
      },
    },
  },
};

export const Modal = styled(posed.div(modalPoses))`
  position: fixed;
  background: white;
  height: auto;
  top: ${props => props.top + 140}px;
  left: ${props => props.left + 70}px;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
  z-index: 10;
`;
