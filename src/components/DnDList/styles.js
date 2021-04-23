import styled from "styled-components"
import Drag from './drag.svg'

export const DnDElement = styled.div`
  width:20px;
  height:20px;
  background: url("${Drag}") no-repeat;
  background-size: contain;
  cursor: grabbing;
  margin: 5px;
`

export const DnDElementContainer = styled.div`
  display: flex;
  align-items: center;
`