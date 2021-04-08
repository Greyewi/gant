import styled from "styled-components"


export const MonthElement = styled.div`
  background-color: ${props => props.odd ? "#333" : "#444"};
  cursor: ${props => props.isResizeTask ? "col-resize" : "auto"} ;
  width: auto;
`

export const NameOfMonth = styled.div`
  color: #fff;
  display: flex;
  background-color: #000;
  width: 100%;
  justify-content: center;
  padding-bottom: 10px;
`

export const DayContainer = styled.div.attrs(props => ({'data-date': props.date}))`
  font-size: 9px;
  color: #fff;
  display: flex;
  height: 101px;
`

export const DayItem = styled.div.attrs(props => ({'data-day': props.day, ...props}))`
  font-size: 9px;
  color: #fff;
  min-width: 15px;
  max-width: 15px;
  margin: 0 -1px;
  position: relative;
`


