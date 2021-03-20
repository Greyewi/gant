import styled from "styled-components"


export const MonthElement = styled.div`
  background-color: ${props => props.odd ? "#333" : "#444"};
  width: 300px;
  height: 300px;
`

export const NameOfMonth = styled.div`
  color: #fff;
  position: relative;
  top: -25px;
`