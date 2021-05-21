import styled from  "styled-components"

export const TaskContainer = styled.div`
  background-color: ${props => props.odd ? "#333" : "#444"};
  width: 10px;
  height: 15px;
  min-width: 10px;
`
export const TaskElement = styled.div `
  height: 60px;
  color: white;
  width: 100%;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  border-left: ${props => props.isStart ? "2px solid white" : 0};
  border-right: ${props => props.isEnd ? "2px solid white" : 0};
  background-color: #e8a135;
  display: flex;
  align-items: center;
`

export const TaskInput = styled.input.attrs((props) => ({ ...props }))`
  position: absolute;
  z-index: 9;
  background: transparent;
  color: #fff;
  border: 0;
  outline: none;
  max-width: ${(props) => (props.countDates - 3) * 10}px;
  
`
