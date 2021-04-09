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

export const FormTitle = styled.h1`
  margin:0;
`