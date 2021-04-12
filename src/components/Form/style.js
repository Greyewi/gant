import styled from "styled-components"

export const FormContainer = styled.form.attrs(props => ({onSubmit: props.onSubmit}))`
  background-color: #fff;
  width: auto;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 0;
  align-items: start;
`
export const FormTitle = styled.span`
  display: flex;
  align-items: center;
`

export const FormTitleInput = styled.input.attrs(props => ({...props}))`
  margin:0;
  border:0;
  outline: none;
  background-color: transparent;
  padding-bottom: 2px;
  font-size: 18px;
  font-weight: bold;
  width:100px;
  border-bottom: 1px solid #777;
  transition-duration: 0.3s;
  
  &:focus {
    border-bottom: 2px solid #1a73e8;
    padding-bottom: 1px;
  }
`

export const DateInput = styled.input.attrs(props => ({...props}))`
  margin:0;
  border:0;
  outline: none;
  background-color: transparent;
  padding-bottom: 2px;
  font-size: 14px;
  font-weight: bold;
  color: #126b83;
  width:72px;
  
  &:hover {
    opacity: .7;
  }
`

export const BorderSelector = styled.select.attrs(props => ({...props}))`
  background-color: #2c2c2c;
  border:0;
  color:#ddd;
  appearance: none;
  padding:10px;
  width: 170px;
  outline: none;
`

export const BorderOptionSelector = styled.option.attrs(props => ({...props}))`
  background-color: #2c2c2c;
  border:0;
  color:#ddd;
`