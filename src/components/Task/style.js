import styled from "styled-components";

export const TaskContainer = styled.div`
  background-color: ${(props) => (props.odd ? "#333" : "#444")};
  width: 10px;
  height: 15px;
  min-width: 10px;
`;

export const TaskNameInput = styled.input.attrs((props) => ({ ...props }))`
  position: absolute;
  z-index: 9;
  background: transparent;
  color: #fff;
  border: 0;
  text-shadow: 1px 1px 1px #333;
  outline: none;
  max-width: ${(props) => (props.countDates - 2) * 10}px;
  display: ${(props) => (props.isEditableTask ? "none" : "inline")};
`;

export const TaskElement = styled.div.attrs((props) => ({ ...props }))`
  background-color: ${(props) => props.isEditedInterval ? 'transparent' : props.fill || 'transparent'};
  width: 100%;
  height: 50px;
  border-top: 2px ${(props) => props.border} #fff;
  border-bottom: 2px ${(props) => props.border} #fff;
  border-left: ${(props) => (props.isStart ? `2px ${props.border} #fff` : 0)};
  border-right: ${(props) => (props.isEnd ? `2px ${props.border} #fff` : 0)};
  border-top-left-radius: ${(props) => (props.isStart ? "5px" : 0)};
  border-bottom-left-radius: ${(props) => (props.isStart ? "5px" : 0)};
  border-top-right-radius: ${(props) => (props.isEnd ? "5px" : 0)};
  border-bottom-right-radius: ${(props) => (props.isEnd ? "5px" : 0)};
  min-width: 10px;
  margin: 10px 0 10px ${(props) => (props.isEnd ? "-4px" : 0)};
  display: flex;
  align-items: center;
  ${(props) => (props.isEnd || props.isStart ? "cursor: ew-resize" : "")};
`;
