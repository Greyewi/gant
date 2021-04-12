import styled from "styled-components"

export const DayContainer = styled.div.attrs(props => ({'data-date': props.date}))`
  font-size: 9px;
  display: flex;
  height: 101px;
`

export const DayItem = styled.div.attrs(props => ({'data-day': props.day, ...props}))`
  font-size: 9px;
  color: transparent;
  min-width: 15px;
  max-width: 15px;
  margin: 0 -1px;
  position: relative;
`


