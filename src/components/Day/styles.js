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
export const TempTask = styled.div `
  display: ${props => props.isDateInsideInterval ? "flex" : "none"};
  height: 60px;
  width: 100%;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  border-left: ${props => props.isStartInterval? "2px solid white" : 0};
  border-right: ${props => props.isEndInterval? "2px solid white" : 0};
  background-color: #e7ba78;
`

export const DayTaskContainer = styled.div `
  display: ${props => props.isDateInsideInterval ? "flex" : "none"};
  height: 60px;
  color: white;
  width: 100%;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  border-left: ${props => props.isStartInterval ? "2px solid white" : 0};
  border-right: ${props => props.isEndInterval ? "2px solid white" : 0};
  background-color: #e8a135;
`
export const TaskNameInput = styled.input.attrs(props => ({...props}))`
  position: absolute;
  background: transparent;
  color: #fff;
  z-index: 20;  
  border: 0;
  outline: none;

`