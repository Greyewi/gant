import styled from "styled-components"


export const MonthElement = styled.div`
  background-color: ${props => props.odd ? "#333" : "#444"};
  width: 300px;
  height: 330px;
  min-width: 300px;
  
`

export const NameOfMonth = styled.div`
  color: #fff;
  display: flex;
  background-color: #000;
  width: 100%;
  justify-content: center;
  padding-bottom: 10px;
`

export const DayContainer = styled.div`
  font-size: 9px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  height: 301px;
`
