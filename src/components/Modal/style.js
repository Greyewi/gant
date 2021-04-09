import styled from "styled-components"

export const ModalContainer = styled.section.attrs(props => ({onClick: props.onClick}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalClose = styled.span.attrs(props => ({onClick: props.onClick}))`
  position: absolute;
  cursor: pointer;
  top: 5px;
  right: 5px;
`

export const ModalElement = styled.div.attrs(props => ({onClick: props.onClick}))`
  background-color: #fff;
  min-height: 200px;
  width: 225px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0;
  border: 0;
`