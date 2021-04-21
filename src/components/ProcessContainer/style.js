import styled from  "styled-components"

export const ProcessContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-bottom: 50px;
`

export const ProcessLine = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100px;

`

export const ProcessName = styled.input.attrs(props => ({...props}))`
  display: flex;
  align-items: center;
  height: 100px;
  width: 80px;
  border: 0;
  background-color: transparent;
  outline: none;
  color: white;
  margin-right: 10px;
`