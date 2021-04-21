import styled from "styled-components"

export const DayItem = styled.div.attrs(props => ({...props}))`
  font-size: 9px;
  color: transparent;
  min-width: 15px;
  max-width: 15px;
  margin: 0 -1px;
  position: relative;
  cursor: ${props => props.isCreatable ? 'move' : 'auto'};
  border-right: 1px dashed rgba(255,255,255, 0.02);
`

