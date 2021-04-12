import styled from "styled-components"
import Drag from '../../shared/images/drag.svg'

export const DnDElement = styled.div`
  width:20px;
  height:20px;
  background: url("${Drag}") no-repeat;
  background-size: contain;
`

export const DnDElementContainer = styled.div`
  display: flex;
  align-items: center;
`