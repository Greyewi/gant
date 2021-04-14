import styled from "styled-components"

export const DayContainer = styled.div.attrs(props => ({...props}))`
  font-size: 9px;
  display: flex;
  height: 101px;
  user-select: none;
`

export const DayItem = styled.div.attrs(props => ({...props}))`
  font-size: 9px;
  color: transparent;
  min-width: 15px;
  max-width: 15px;
  margin: 0 -1px;
  position: relative;
  cursor: ${props => props.isCreatable ? 'move' : 'auto'};
`


