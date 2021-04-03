import styled from  "styled-components"

export const TaskContainer = styled.div`
  background-color: ${props => props.odd ? "#333" : "#444"};
  width: 10px;
  height: 15px;
  min-width: 10px;
`