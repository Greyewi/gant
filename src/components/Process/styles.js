import styled from "styled-components"
import Plus from '../../shared/images/add.svg'

export const LineElement = styled.div.attrs(props => ({...props}))`
  display: flex;
  margin: 20px 0;
  font-size: 16px;
  padding: 2px;
`

export const ProcessRow = styled.div.attrs(props => ({...props}))`
  display: flex;
  flex-direction: column;
`

export const ProcessElement = styled.input.attrs(props => ({...props}))`
  font-size: 15px;
  color:#2f2b2b;
  height:100px;
  width:100px;
  display: flex;
  align-items: center;
  margin: 0 10px;
  border:0;
  background-color: transparent;
  outline: none;
  text-decoration: underline;
`

export const ProcessLine = styled.div`
  display:flex;
  align-items: flex-end;
  height:100px;
`

export const AddNewProcess = styled.div`
  display: block;
  width:100px;
  position:relative;
  top:10px;
  height:100px;
  fill: #2f2b2b;
  cursor: pointer;
  background-image: url(${Plus});
`
