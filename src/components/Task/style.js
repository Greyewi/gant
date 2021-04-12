import styled, {keyframes} from  "styled-components"

export const TaskContainer = styled.div`
  background-color: ${props => props.odd ? "#333" : "#444"};
  width: 10px;
  height: 15px;
  min-width: 10px;
  transition-duration: 0.3s;
`

const scale = keyframes`
  from {
    width: 50%;
  }
  to {
    width: 100%;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0.1;
  }

  to {
    opacity: 1;
  }
`;

export const TaskElement = styled.div.attrs(props => ({...props}))`
  background-color: ${props => props.color || '#E09B33'};
  width: 100%;
  height: 50px;
  border-top: 2px ${props => props.border} #fff;
  border-bottom: 2px ${props => props.border} #fff;
  border-left: ${props => props.isStart ? `2px ${props.border} #fff` : 0};
  border-right: ${props => props.isEnd ? `2px ${props.border} #fff` : 0};
  border-top-left-radius: ${props => props.isStart ? '5px' : 0};
  border-bottom-left-radius: ${props => props.isStart ? '5px' : 0};
  border-top-right-radius: ${props => props.isEnd ? '5px' : 0};
  border-bottom-right-radius: ${props => props.isEnd ? '5px' : 0};
  min-width: 10px;
  margin: 10px 0; 
`