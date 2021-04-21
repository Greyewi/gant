import styled from "styled-components"

export const DayContainer = styled.div.attrs(props => ({'data-date': props.date}))`
  font-size: 9px;
  color: transparent;
  display: flex;
  justify-content: space-between;
  height: 101px;
  user-select: none;
`
export const TaskContainerElement = styled.div`
  text-align: left;
  min-height: 15px;
  background-color: ${props => ({'data-color': props.color})};
  padding: 5px 15px;
  color: #fff;
  position: relative;
  cursor: pointer;
  border-radius: 15px;
  width: 500px;
`